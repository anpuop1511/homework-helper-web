"use server";

import { Resend } from 'resend';

export async function joinWaitlist(formData: FormData) {
  const email = formData.get('email') as string;
  
  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { error: 'Server Error: The RESEND_API_KEY is missing from Vercel.' };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Waitlist <onboarding@resend.dev>',
      to: 'anpuop1511@gmail.com',
      subject: '🎉 New iOS Waitlist Signup!',
      html: `
        <h2>New Waitlist Signup</h2>
        <p>A new user wants the iOS app!</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <p><i>Sent from your Homework Helper Next.js Website</i></p>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { error: `Resend Error: ${error.message}` };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Catch Error:', error);
    return { error: `Action Error: ${error.message || 'Unknown error'}` };
  }
}
