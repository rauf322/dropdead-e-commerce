import { Card, CardContent } from '@/components/ui/card'

import { ORDER_CHECKOUT_KEYS, SUMMARY_TITLE } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

import type { CartItemsCheckout } from '@/types'

import PlaceOrderForm from './place-order'

export default function Summary({ cart }: { cart: CartItemsCheckout }) {
  return (
    <div className='md:col-span-1'>
      <Card>
        <CardContent className='p-4 gap-4 space-y-4'>
          {ORDER_CHECKOUT_KEYS.map((title, index) => (
            <div
              className='flex justify-between'
              key={SUMMARY_TITLE[index]}
            >
              <div>{SUMMARY_TITLE[index]}</div>
              <div>{formatCurrency(cart[title])}</div>
            </div>
          ))}
          <PlaceOrderForm />
        </CardContent>
      </Card>
    </div>
  )
}
