import { NextResponse } from 'next/server';
import { getResend } from '@/lib/resend';
import { contactFormSchema } from '@/lib/validations';
import ContactInquiryEmail from '@/emails/contact-inquiry';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await getResend().emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['indotobaccospecial@gmail.com'],
      subject: `New Inquiry from ${data.name}`,
      react: ContactInquiryEmail({ data }),
    });

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
