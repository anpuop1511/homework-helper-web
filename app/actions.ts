"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinWaitlist(formData: FormData) {
  const email = formData.get('email') as string;
  
  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' };
  }

  try {
    // When using Resend's free tier without verifying a custom domain, 
    // you can only send emails TO yourself (the email you signed up with).
    // This sends YOU a notification that someone joined the waitlist!
    await resend.emails.send({
      from: 'Waitlist <onboarding@resend.dev>',
      to: 'anpuop1511@gmail.com', // Sends the notification directly to your inbox
      subject: '🎉 New iOS Waitlist Signup!',
      html: `
        <h2>New Waitlist Signup</h2>
        <p>A new user wants the iOS app!</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <p><i>Sent from your Homework Helper Next.js Website</i></p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to join the waitlist. Please try again later.' };
  }
}
