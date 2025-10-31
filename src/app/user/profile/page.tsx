import ProfileForm from './profile-form'
import { auth } from '@/../auth'
import { type Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'Customer Profile'
}
export default async function Profile() {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <div className='max-w-md mx-auto space-y-4'>
        <h2 className='h2-bold'>Profile</h2>
        {session?.user?.name}
        <ProfileForm />
      </div>
    </SessionProvider>
  )
}
