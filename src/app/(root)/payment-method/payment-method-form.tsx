'use client';

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { updateUserPaymentMethod } from '@/lib/actions/user.actions';
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/constants';
import { paymentMethodSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { Loader, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export default function PaymentMethodForm({ prefetchedPaymentMethod }: { prefetchedPaymentMethod: string | null }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: prefetchedPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof paymentMethodSchema>) {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      router.push('/place-order');
    });
  }

  return (
    <>
      <div className='max-w-md mx-auto space-y-4'>
        <h1 className='h2-bold mt-4'>Payment Method</h1>
        <p className='text-sm text-muted-foreground'>Please select payment method</p>
        <Form {...form}>
          <form method='post' onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='flex flex-col md:flex-row gap-5'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} className='flex flex-col space-y-2'>
                        {PAYMENT_METHODS.map((method) => (
                          <FormItem key={method} className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value={method} checked={method === prefetchedPaymentMethod} />
                            </FormControl>
                            <FormLabel className='font-normal'>{method}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className='flex gap-2'>
              <Button type='submit' disabled={isPending}>
                {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <ArrowRight className='w-4 h-4' />} Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
