import { Card, CardContent } from '@/components/ui/card'

import { formatCurrency } from '@/lib/utils'

export default function Summary<G extends Record<string, unknown>, T extends readonly (keyof G)[]>({
  cart,
  orderKeys,
  titles,
  title,
  amount,
  action
}: {
  title?: string
  amount?: string
  cart: Partial<G>
  orderKeys?: T
  titles?: string[]
  action?: React.ReactNode
}) {
  return (
    <div className='md:col-span-1'>
      <Card>
        <CardContent className='p-4 gap-4 space-y-4'>
          {(title || amount) && (
            <div className='pb-3 text-xl'>
              <h1>
                {title}
                {amount ? `: ${amount}` : ''}
              </h1>
            </div>
          )}
          {orderKeys &&
            titles &&
            orderKeys.map((key, index) => (
              <div
                className='flex justify-between'
                key={titles[index]}
              >
                <div>{titles[index]}</div>
                <div>{formatCurrency(cart[key] as string | number)}</div>
              </div>
            ))}
        </CardContent>
        {action && <div className='px-2'>{action}</div>}
      </Card>
    </div>
  )
}
