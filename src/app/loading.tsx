'use client';

import { Progress } from '@radix-ui/react-progress';
import { useState, useEffect } from 'react';

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

  return (
    <div className='flex h-screen items-center justify-center'>
      <Progress value={progress} className='w-[60%]' />
    </div>
  );
}

export default Loading;
