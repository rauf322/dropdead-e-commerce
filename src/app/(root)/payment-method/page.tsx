import { auth } from '@/../auth';
import CheckoutSteps from '@/components/shared/checkout-steps';
import { getUserById } from '@/lib/actions/user.actions';
import { Metadata } from 'next';
import PaymentMethodForm from './payment-method-form';

export const metadata: Metadata = {
  title: 'Select payment method',
};

export default async function PaymentMethodPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('User not found');

  const user = await getUserById(userId);

  return (
    <div>
      <CheckoutSteps current={2} />
      <PaymentMethodForm prefetchedPaymentMethod={user.paymentMethod ? user.paymentMethod : null} />
    </div>
  );
}
