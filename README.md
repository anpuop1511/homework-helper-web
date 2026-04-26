This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## API Endpoints

- `POST /api/send-auth-email`: Sends verification, password reset, and account deletion emails through Resend.
- `GET|POST /api/newsletter`: Newsletter subscribe, unsubscribe, and campaign send flow.

## Environment Variables

Set these in Vercel Project Settings -> Environment Variables.

### Required for existing auth email flow

- `RESEND_API_KEY`
- `RESEND_FROM` (example: `Homework Helper <no-reply@hwhelper.tech>`)
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (paste with `\n` escaped newlines)
- `AUTH_HANDLER_URL` (recommended: `https://www.hwhelper.tech/app`)

### Required for newsletter flow

- `NEWSLETTER_ADMIN_TOKEN` (long random string used to authorize `action=send`)
- `NEWSLETTER_UNSUB_SECRET` (long random string used to sign unsubscribe URLs)
- `NEWSLETTER_BASE_URL` (recommended: `https://www.hwhelper.tech/api/newsletter`)

## Newsletter API Usage

### Subscribe

`POST /api/newsletter`

```json
{
	"action": "subscribe",
	"email": "student@example.com"
}
```

### Unsubscribe by API

`POST /api/newsletter`

```json
{
	"action": "unsubscribe",
	"email": "student@example.com"
}
```

### Send a campaign

`POST /api/newsletter` with header `x-newsletter-admin-token: <NEWSLETTER_ADMIN_TOKEN>`

```json
{
	"action": "send",
	"subject": "Homework Helper Weekly",
	"html": "<h1>New features this week</h1><p>We shipped updates.</p>",
	"text": "New features this week: We shipped updates."
}
```

The send action:
- Targets only subscribers where Firestore `newsletter_subscribers.status == "subscribed"`.
- Appends an unsubscribe link footer to each recipient.
- Adds `List-Unsubscribe` headers to improve mailbox unsubscribe UX.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
