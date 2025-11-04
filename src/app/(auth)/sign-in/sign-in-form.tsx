'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { signInWithCredentials } from '@/lib/actions/user.actions'
import { signInDefaultValues } from '@/lib/constants'

import type { ActionResponse } from '@/types'

const initialState = {
  success: false,
  message: ''
}
const CredentialsSignInForm = () => {
  const [data, action, isPending] = useActionState<ActionResponse, FormData>(
    signInWithCredentials,
    initialState
  )

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <form action={action}>
      <FieldGroup>
        <input
          type='hidden'
          name='callbackUrl'
          value={callbackUrl}
        />
        <div className='space-y-3'>
          <Field>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              id='email'
              name='email'
              type='email'
              required
              autoComplete='email'
              defaultValue={signInDefaultValues.email}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Input
              id='password'
              name='password'
              type='password'
              required
              autoComplete='password'
              defaultValue={signInDefaultValues.password}
            />
          </Field>
          <div className='mt-5 mb-5'>
            <Button
              disabled={isPending}
              className='w-full'
              variant='default'
            >
              {isPending ? 'Sign In...' : 'Sign In'}
            </Button>
          </div>
          {data && !data.success && (
            <div className='text-center text-destructive'>{data.message}</div>
          )}
          <div className='text-sm text-center text-muted-foreground font-bold'>
            Don&apos;t have an account? <Link href='/sign-up'>Sign up</Link>
          </div>
        </div>
      </FieldGroup>
    </form>
  )
}

export default CredentialsSignInForm
