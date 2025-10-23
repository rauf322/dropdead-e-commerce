'use client';

import { Progress } from '@/app/components/ui/progress';
import { useEffect, useState } from 'react';

function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev == 80) clearInterval(interval);
        return prev + 20;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);
  //TODO REMOVE THIS PROGRESS BAR TO ANOTHER ONE LATER
  return (
    <div className='flex h-screen items-center justify-center'>
      <Progress value={progress} className='w-[60%]' />
    </div>
  );
}

export default Loading;
