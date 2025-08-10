import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactFormEmail from '@/emails/contact-form-email';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API);
const adminEmail = process.env.ADMIN_EMAIL;

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!adminEmail) {
        console.error('ADMIN_EMAIL environment variable is not set.');
        return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    if (!process.env.RESEND_API) {
        console.error('RESEND_API environment variable is not set.');
        return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: [adminEmail],
      subject: `New Portfolio Message: ${subject}`,
      react: React.createElement(ContactFormEmail, {
        name,
        email,
        message,
      }),
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ message: 'Error sending email', error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.', error }, { status: 500 });
  }
}
