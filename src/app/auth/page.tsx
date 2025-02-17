'use client';
// TODO: delete page. just for testing auth.
import { SignOut } from '@slices/auth/components/SignOutButton';

import Button from '@/components/buttons/Button';
import PageLayout from '@/components/layout/PageLayout';
import ButtonLink from '@/components/links/ButtonLink';
import PageHeading from '@/components/PageHeading';

// Example function to send an email
async function sendEmail() {
  await fetch('/api/mail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: process.env.SMTP_USER,
      subject: 'Test Email',
      text: 'This is a test email sent from Next.js using Nodemailer.',
    }),
  });
}

export default function AuthPage() {
  return (
    <PageLayout>
      <main className='layout'>
        <section>
          <PageHeading
            preTitle='Get ready for'
            title='Authentication!'
            variant='green'
          />
          <Button onClick={sendEmail}>Send mail</Button>
          <SignOut />
          <ButtonLink href='/auth/sign-in'>Sign in</ButtonLink>
        </section>
      </main>
    </PageLayout>
  );
}
