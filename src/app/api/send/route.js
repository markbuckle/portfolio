// import { EmailTemplate } from '../../../components/email-template';
import { NextResponse } from 'next/server';
// import { Next } from 'react-bootstrap/esm/PageItem';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: ['markbuckle92@gmail.com'],
      subject: 'Hello world',
      react: <>
            <p>Email Body</p>
            </>,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}