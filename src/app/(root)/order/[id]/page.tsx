import { getOrderById } from '@/lib/actions/order.action';
import { ShippingAddress } from '@/types';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Details',
};

export default async function OrderDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) notFound();

  return <div></div>;
}
