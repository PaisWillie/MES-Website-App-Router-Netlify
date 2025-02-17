import Button from '@/components/buttons/Button';

import SignOutComponent from '@/slices/auth/components/SignOut';

// Maybe add more props later if we want to let them style it differently.
interface SignOutProps {
  text?: React.ReactNode;
  className?: string;
}

// A button that handles signing someone out. Redirects to sign-in page after.
export function SignOut({ text, className }: SignOutProps) {
  return (
    <form action={SignOutComponent}>
      <Button type='submit' className={className}>
        {text || 'Sign Out'}
      </Button>
    </form>
  );
}
