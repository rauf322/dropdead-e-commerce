'use client';
import { ShippingAddress } from '@/types';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { ControllerRenderProps, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { shippingAddressSchema } from '@/lib/validators';
import { z } from 'zod';
import { shippingAddressDefaultValues } from '@/lib/constants';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader } from 'lucide-react';
import { updateUserAddress } from '@/lib/actions/user.actions';

export default function ShippingAddressForm({ address }: { address: ShippingAddress }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (values: z.infer<typeof shippingAddressSchema>) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      router.push('/payment-method');
    });
  };

  const [isPending, startTransition] = useTransition();

  return (
    <div className='max-w-md mx-auto space-y-4'>
      <h1 className='h2-bold mt-4'>Shipping Address</h1>
      <p className='text-sm text-muted-foreground'>Please enter the address to ship to</p>
      <Form {...form}>
        <form method='post' onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'fullName'> }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter full name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='streetAddress'
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'streetAddress'> }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Address' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <FormField
                control={form.control}
                name='city'
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'city'> }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter City' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='postalCode'
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'postalCode'> }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter postal code' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='country'
                render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'country'> }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter country' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='flex gap-2'>
            <Button type='submit' disabled={isPending}>
              {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <ArrowRight className='w-4 h-4' />} Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
