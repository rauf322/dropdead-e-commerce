'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { signUpUser } from '@/lib/actions/user.actions'
import { signUpDefaultValues } from '@/lib/constants'

const CredentialsSignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: ''
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const SignUpButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button
        disabled={pending}
        className='w-full'
        variant='default'
      >
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    )
  }

  return (
    <form action={action}>
      <input
        type='hidden'
        name='callbackUrl'
        value={callbackUrl}
      />
      <div className='space-y-2'>
        <div className='mt-5'>
          <Label
            htmlFor='password'
            className='mb-2'
          >
            Name
          </Label>
          <Input
            id='name'
            name='name'
            type='name'
            autoComplete='name'
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label
            htmlFor='email'
            className='mb-2'
          >
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div className='mt-5'>
          <Label
            htmlFor='password'
            className='mb-2'
          >
            Password
          </Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            defaultValue={signUpDefaultValues.password}
          />
        </div>
        <div className='mt-5'>
          <Label
            htmlFor='confirmPassword'
            className='mb-2'
          >
            Confirm Password
          </Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            autoComplete='confirmPassword'
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
        <div className='mt-5 mb-5'>
          <SignUpButton />
        </div>
        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}
        <div className='text-sm text-center text-muted-foreground font-bold'>
          Already have an account? <Link href='/sign-in'>Sign In</Link>
        </div>
      </div>
    </form>
  )
}

export default CredentialsSignUpForm
