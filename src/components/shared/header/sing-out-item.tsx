'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';

const SignOutItem = () => {
  return (
    <DropdownMenuItem className='p-0 mb-1' onSelect={(e) => e.preventDefault()}>
      <form action={signOutUser} className='w-full'>
        <Button
          type='submit'
          className='w-full py-4 px-2 h-4 justify-start'
          variant='ghost'
        >
          Sign Out
        </Button>
      </form>
    </DropdownMenuItem>
  );
};

export default SignOutItem;
