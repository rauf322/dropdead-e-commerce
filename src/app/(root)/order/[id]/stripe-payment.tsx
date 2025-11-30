export default function StripePayment({
  priceInCents,
  orderId,
  clientSecret
}: {
  priceInCents: number
  orderId: string
  clientSecret: string
}) {
  return <div>Stripe Form</div>
}
