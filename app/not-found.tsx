import Link from 'next/link';
import { Button } from '@/app/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-bold'>404</h1>
      <p className='text-muted-foreground'>Page not found</p>
      <Button asChild>
        <Link href='/'>Go to Home</Link>
      </Button>
    </div>
  );
}
