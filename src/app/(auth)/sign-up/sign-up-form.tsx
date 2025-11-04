'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { signUpUser } from '@/lib/actions/user.actions'
import { signUpDefaultValues } from '@/lib/constants'

import type { ActionResponse } from '@/types'

const CredentialsSignUpForm = () => {
  const [data, action, isPending] = useActionState<ActionResponse, FormData>(signUpUser, {
    success: false,
    message: ''
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <form action={action}>
      <input
        type='hidden'
        name='callbackUrl'
        value={callbackUrl}
      />
      <div className='space-y-5'>
        <Field>
          <FieldLabel htmlFor='password'>Name</FieldLabel>
          <Input
            id='name'
            name='name'
            type='name'
            autoComplete='name'
            defaultValue={signUpDefaultValues.name}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            defaultValue={signUpDefaultValues.email}
          />
        </Field>
        <Field className='mt-5'>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            defaultValue={signUpDefaultValues.password}
          />
        </Field>
        <Field className='mt-5'>
          <FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            autoComplete='confirmPassword'
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </Field>
        <div className='mt-5 mb-5'>
          <Button
            disabled={isPending}
            className='w-full'
            variant='default'
          >
            {isPending ? 'Submitting...' : 'Sign Up'}
          </Button>
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
