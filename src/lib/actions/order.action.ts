'use server'

import { auth } from '@/../auth'
import { revalidatePath } from 'next/cache'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

import type { CartItem, Order, PaymentResult } from '@/types'

import { prisma } from '@/db/prisma'

import { PAGE_SIZE } from '../constants'
import { paypal } from '../paypal'
import { convertToPlainObject, formatError } from '../utils'
import { insertOrderSchema } from '../validators'
import { getMyCart } from './cart.action'
import { getUserById } from './user.actions'

export async function createOrder() {
  try {
    const session = await auth()
    if (!session) throw new Error('User not authenticated')
    const cart = await getMyCart()
    const userId = session?.user?.id
    if (!userId) throw new Error('User not found')
    const user = await getUserById(userId)
    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: 'Cart is empty',
        redirectTo: '/cart'
      }
    }
    if (!user.address) {
      return {
        success: false,
        message: 'No shippuing address found',
        redirectTo: '/shipping-address'
      }
    }
    if (!user.paymentMethod) {
      return {
        success: false,
        message: 'No payment method',
        redirectTo: '/payment-method'
      }
    }
    //Create order object
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      totalPrice: cart.totalPrice,
      taxPrice: cart.taxPrice,
      status: 'PENDING',
      shippingPrice: cart.shippingPrice
    })
    //Create transaction
    const insertedOrderId = await prisma.$transaction(async tx => {
      const insertedOrder = await tx.order.create({ data: order })

      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: insertedOrder.id
          }
        })
      }
      //Clear cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0
        }
      })
      return insertedOrder.id
    })
    if (!insertedOrderId) throw new Error('Order creation failed')
    return {
      success: true,
      message: 'Order created successfully',
      redirectTo: `/order/${insertedOrderId}`
    }
  } catch (error) {
    if (isRedirectError(error)) throw error
    return { success: false, message: formatError(error) }
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId
    },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } }
    }
  })

  return convertToPlainObject(data) as Order | null
}

// Create new paypal order

export async function createPayPalOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId
      }
    })
    if (order) {
      // Create paypal order
      const paypalOrder = await paypal.createOrder(Number(order.totalPrice))

      //Update order with paypal order id
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentResult: {
            id: paypalOrder.id,
            email_address: '',
            status: '',
            pricePaid: 0
          }
        }
      })
      return {
        success: true,
        message: `Item order created successfully`,
        data: paypalOrder.id
      }
    } else {
      throw new Error('Order not found')
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

//Approve paypal order and update order to pay

export async function approvePayPalOrder(orderId: string, data: { orderID: string }) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId
      }
    })
    if (!order) throw new Error('Order not found')

    const captureData = await paypal.capturePayment(data.orderID)
    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResult)?.id ||
      captureData.status !== 'COMPLETED'
    ) {
      throw new Error('Payment not completed')
    }

    // Extract price paid from PayPal response
    const pricePaid = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value

    // Update order to paid
    await updateOrderToPaid(orderId, {
      id: captureData.id,
      status: captureData.status,
      email_address: captureData.payer?.email_address || '',
      pricePaid: pricePaid ? String(pricePaid) : '0'
    })
    revalidatePath(`/order/${orderId}`)
    return {
      success: true,
      message: 'Payment approved successfully'
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

//Update order to paid
//

async function updateOrderToPaid(orderId: string, paymentResult?: PaymentResult) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId
    },
    include: {
      orderitems: true
    }
  })
  if (!order) throw new Error('Order not found')

  if (order.isPaid) throw new Error('Order is already paid')

  //Transacton to update order and accoount for product stock

  await prisma.$transaction(async tx => {
    // Iterate over products and update stock
    for (const item of order.orderitems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.qty } }
      })
    }
    // Set the order to paid
    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult
      }
    })
  })
  //Get updated order after the tx

  const updatedOrder = await prisma.order.findFirst({
    where: {
      id: orderId
    },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } }
    }
  })
  if (!updatedOrder) throw new Error('Order not found after update')
}
export async function getMyOrders({ limit = PAGE_SIZE, page }: { limit?: number; page: number }) {
  const session = await auth()
  if (!session) throw new Error('User not authenticated')

  const data = await prisma.order.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit
  })
  const dataCount = await prisma.order.count({
    where: { userId: session.user.id! }
  })
  return {
    data,
    totalPage: Math.ceil(dataCount / limit)
  }
}
