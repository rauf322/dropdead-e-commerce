import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import type { ShippingAddress } from '@/types'

export default function AddressField({ userAddress }: { userAddress: ShippingAddress }) {
  return (
    <Card>
      <CardContent className='p-4 gap-4'>
        <h2 className='text-xl pb-4'>Shipping Address</h2>
        <p>{userAddress.fullName}</p>
        <p>
          {userAddress.streetAddress}, {userAddress.city} {userAddress.postalCode},{' '}
          {userAddress.country}{' '}
        </p>
        <div className='mt-3'>
          <Link href='/shipping-address'>
            <Button variant='outline'>Edit</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
