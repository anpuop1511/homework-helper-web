const crypto = require('crypto');
const { Resend } = require('resend');
const admin = require('firebase-admin');

const resend = new Resend(process.env.RESEND_API_KEY);
const fromAddress =
  process.env.RESEND_FROM || 'Homework Helper <news@hwhelper.tech>';
const adminToken = process.env.NEWSLETTER_ADMIN_TOKEN || '';
const unsubscribeSecret = process.env.NEWSLETTER_UNSUB_SECRET || '';
const newsletterBaseUrl =
  process.env.NEWSLETTER_BASE_URL || 'https://www.hwhelper.tech/api/newsletter';

function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.',
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

function getDb() {
  initializeFirebaseAdmin();
  return admin.firestore();
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function assertValidEmail(value) {
  const email = normalizeEmail(value);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('A valid email is required.');
  }
  return email;
}

function subscriberDocId(email) {
  return crypto.createHash('sha256').update(email).digest('hex');
}

function createSignature(email) {
  if (!unsubscribeSecret) {
    throw new Error('NEWSLETTER_UNSUB_SECRET is missing.');
  }

  return crypto
    .createHmac('sha256', unsubscribeSecret)
    .update(email)
    .digest('hex');
}

function safeEqualHex(a, b) {
  if (!a || !b) return false;
  const left = Buffer.from(a, 'hex');
  const right = Buffer.from(b, 'hex');
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function buildUnsubscribeUrl(email) {
  const url = new URL(newsletterBaseUrl);
  url.searchParams.set('action', 'unsubscribe');
  url.searchParams.set('email', email);
  url.searchParams.set('sig', createSignature(email));
  return url.toString();
}

async function setSubscriptionStatus({ email, status, source = 'api' }) {
  const normalized = assertValidEmail(email);
  const db = getDb();
  const ref = db.collection('newsletter_subscribers').doc(subscriberDocId(normalized));
  const existing = await ref.get();

  await ref.set(
    {
      email: normalized,
      status,
      source,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      ...(existing.exists
        ? {}
        : { createdAt: admin.firestore.FieldValue.serverTimestamp() }),
      ...(status === 'unsubscribed'
        ? { unsubscribedAt: admin.firestore.FieldValue.serverTimestamp() }
        : { unsubscribedAt: null }),
    },
    { merge: true },
  );

  return normalized;
}

async function unsubscribeByLink({ email, sig }) {
  const normalized = assertValidEmail(email);
  const expected = createSignature(normalized);

  if (!safeEqualHex(sig, expected)) {
    throw new Error('Invalid unsubscribe signature.');
  }

  await setSubscriptionStatus({
    email: normalized,
    status: 'unsubscribed',
    source: 'unsubscribe-link',
  });

  return normalized;
}

async function getSubscribedEmails() {
  const db = getDb();
  const snapshot = await db
    .collection('newsletter_subscribers')
    .where('status', '==', 'subscribed')
    .get();

  return snapshot.docs
    .map((doc) => doc.data()?.email)
    .filter((email) => typeof email === 'string' && email.length > 0);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function appendUnsubscribeFooter(html, unsubscribeUrl) {
  const footer = `
    <hr style="margin:24px 0;border:none;border-top:1px solid #d7deef" />
    <p style="margin:0;font-size:12px;line-height:1.6;color:#6b7489">
      You are receiving this because you subscribed to Homework Helper updates.
      <a href="${escapeHtml(unsubscribeUrl)}" style="color:#2442b5">Unsubscribe</a>
    </p>
  `;

  if (String(html).toLowerCase().includes('</body>')) {
    return String(html).replace(/<\/body>/i, `${footer}</body>`);
  }

  return `${html}${footer}`;
}

function readAdminToken(req) {
  const headerToken = req.headers['x-newsletter-admin-token'];
  if (typeof headerToken === 'string' && headerToken.trim()) {
    return headerToken.trim();
  }

  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }

  return '';
}

function assertAdmin(req) {
  if (!adminToken) {
    throw new Error('NEWSLETTER_ADMIN_TOKEN is missing.');
  }

  const token = readAdminToken(req);
  if (!token || token !== adminToken) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    throw error;
  }
}

async function sendCampaign({ subject, html, text, recipients }) {
  if (!subject || !String(subject).trim()) {
    throw new Error('Newsletter subject is required.');
  }

  if (!html || !String(html).trim()) {
    throw new Error('Newsletter html is required.');
  }

  const allSubscribed = await getSubscribedEmails();
  const normalizedRecipients = Array.isArray(recipients)
    ? recipients.map((email) => normalizeEmail(email)).filter(Boolean)
    : null;

  const sendList = normalizedRecipients
    ? allSubscribed.filter((email) => normalizedRecipients.includes(email))
    : allSubscribed;

  let sent = 0;
  const failed = [];

  for (const email of sendList) {
    try {
      const unsubscribeUrl = buildUnsubscribeUrl(email);

      await resend.emails.send({
        from: fromAddress,
        to: [email],
        subject: String(subject).trim(),
        html: appendUnsubscribeFooter(html, unsubscribeUrl),
        text: text ? String(text) : undefined,
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
        tags: [{ name: 'category', value: 'newsletter' }],
      });

      sent += 1;
    } catch (error) {
      failed.push({
        email,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    attempted: sendList.length,
    sent,
    failed,
  };
}

function htmlMessage(res, statusCode, title, message) {
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message);

  res.status(statusCode).setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 32px; background: #f6f8ff; color: #0f172a; }
      .card { max-width: 620px; margin: 0 auto; padding: 24px; border-radius: 16px; background: #fff; border: 1px solid #d7deef; }
      h1 { margin-top: 0; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${safeTitle}</h1>
      <p>${safeMessage}</p>
    </div>
  </body>
</html>`);
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-newsletter-admin-token',
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const action = String(req.query?.action || '').trim();
      if (action !== 'unsubscribe') {
        res.status(400).json({ error: 'unsupported-get-action' });
        return;
      }

      const email = String(req.query?.email || '').trim();
      const sig = String(req.query?.sig || '').trim();
      await unsubscribeByLink({ email, sig });
      htmlMessage(
        res,
        200,
        'You are unsubscribed',
        'You have been unsubscribed from Homework Helper newsletters.',
      );
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'method-not-allowed' });
      return;
    }

    const action = String(req.body?.action || '').trim();

    if (action === 'subscribe') {
      const email = await setSubscriptionStatus({
        email: req.body?.email,
        status: 'subscribed',
        source: req.body?.source || 'api',
      });
      res.json({ ok: true, status: 'subscribed', email });
      return;
    }

    if (action === 'unsubscribe') {
      const email = await setSubscriptionStatus({
        email: req.body?.email,
        status: 'unsubscribed',
        source: req.body?.source || 'api',
      });
      res.json({ ok: true, status: 'unsubscribed', email });
      return;
    }

    if (action === 'send') {
      assertAdmin(req);
      const result = await sendCampaign({
        subject: req.body?.subject,
        html: req.body?.html,
        text: req.body?.text,
        recipients: req.body?.recipients,
      });
      res.json({ ok: true, ...result });
      return;
    }

    res.status(400).json({ error: 'unsupported-action' });
  } catch (error) {
    console.error('[newsletter] failed:', error);

    const statusCode =
      error && typeof error === 'object' && 'statusCode' in error
        ? Number(error.statusCode) || 500
        : 500;

    if (req.method === 'GET') {
      htmlMessage(
        res,
        statusCode,
        'Unsubscribe failed',
        error instanceof Error ? error.message : String(error),
      );
      return;
    }

    res.status(statusCode).json({
      error: 'newsletter-failed',
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
