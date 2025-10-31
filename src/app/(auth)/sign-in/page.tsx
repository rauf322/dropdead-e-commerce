import CredentialsSignInForm from './credentials-signin-form'
import { auth } from '@/../auth'
import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sign In'
}

const SignInPage = async (props: { searchParams: Promise<{ callbackUrl?: string }> }) => {
  const { callbackUrl } = await props.searchParams

  const session = await auth()

  if (session) {
    return redirect(callbackUrl || '/')
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='w-full max-w-md mx-4'>
        <CardHeader>
          <Link href='/'>
            <Image
              src='/images/logo.png'
              alt={`${APP_NAME} logo`}
              height={100}
              width={100}
              className='mx-auto'
            />
          </Link>
          <CardTitle className='text-center'>Sign In</CardTitle>
          <CardDescription className='text-center mt-3'>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default SignInPage
