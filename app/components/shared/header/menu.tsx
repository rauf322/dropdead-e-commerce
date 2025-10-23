import { Button } from '@/components/ui/button';
import ModeToggle from './mode-toggle';
import Link from 'next/link';
import { EllipsisVertical, ShoppingBag, UserIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Menu = () => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <ModeToggle />
        <Button asChild variant='ghost'>
          <Link href='/cart'>
            <ShoppingBag className='ml-2' />
          </Link>
        </Button>
        <Button asChild>
          <Link href='/sign-in'>
            <UserIcon className='ml-2' /> Sign In
          </Link>
        </Button>
      </nav>
      <nav className='flex md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className='flex flex-col items-center'>
            <SheetTitle className='mt-6'>Menu</SheetTitle>

            <ModeToggle />
            <Button asChild variant='ghost'>
              <Link href='/cart'>
                <ShoppingBag />
              </Link>
            </Button>

            <Button asChild>
              <Link href='/sign-in'>
                <UserIcon className='ml-2' /> Sign In
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
