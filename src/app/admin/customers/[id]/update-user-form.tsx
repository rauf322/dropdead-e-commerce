'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { type ControllerRenderProps, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { updateCustomer } from '@/lib/actions/user.actions'
import { USER_ROLES } from '@/lib/constants'
import { updateUserSchema } from '@/lib/validators'

export default function UpdateUserForm({ user }: { user: z.infer<typeof updateUserSchema> }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user
  })
  async function onSubmit(values: z.infer<typeof updateUserSchema>) {
    try {
      const res = await updateCustomer({
        ...values,
        id: user.id
      })
      if (!res.success) {
        return toast.error(res.message)
      }
      toast.success(res.message)
      form.reset()
      router.push('/admin/customers')
    } catch (error) {
      toast.error(`Failed to update user.${error}`)
    }
  }
  return (
    <Form {...form}>
      <form
        method='POST'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <FormField
            control={form.control}
            name='email'
            render={({
              field
            }: {
              field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'email'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder='Enter user email'
                    {...field}
                  />
                </FormControl>
                <div className='h-9 mt-2' />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name='name'
            render={({
              field
            }: {
              field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'name'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter user email'
                    {...field}
                  />
                </FormControl>
                <div className='h-9 mt-2' />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name='role'
            render={({
              field
            }: {
              field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'role'>
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {USER_ROLES.map(role => (
                      <SelectItem
                        key={role}
                        value={role}
                      >
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className='h-9 mt-2' />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type='submit'
          disabled={form.formState.isSubmitting}
          className='w-full mt-4'
        >
          {form.formState.isSubmitting ? 'Updating...' : 'Update User'}
        </Button>
      </form>
    </Form>
  )
}
