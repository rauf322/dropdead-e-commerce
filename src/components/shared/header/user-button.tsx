import { auth } from '@/../auth';
import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import SignOutItem from './sing-out-item';

const UserButton = async () => {
  const session = await auth();
  if (!session) {
    return (
      <Button asChild>
        <Link href='/sign-in'>
          <UserIcon className='ml-2' /> Sign In
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? '';
  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex items-center'>
            <Button
              variant='ghost'
              className='relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-secondary text-secondary-foreground'
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 ' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <div className='flex-sm font-bold leading-none'>
                {session.user?.name}
              </div>
              <div className='flex-sm font-foreground leading-none'>
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <SignOutItem />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
