import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import type { User } from '@/types'

export default function PaymentMethod({ paymentMethod }: { paymentMethod: User['paymentMethod'] }) {
  return (
    <Card>
      <CardContent className='p-4 gap-4'>
        <h2 className='text-xl pb-4'>Payment Method</h2>
        <p>{paymentMethod}</p>
        <div className='mt-3'>
          <Link href='/payment-method'>
            <Button variant='outline'>Edit</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
