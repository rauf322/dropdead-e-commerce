'use server'

import { auth, signIn, signOut } from '@/../auth'
import { hashSync } from 'bcrypt-ts-edge'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import z from 'zod'

import { formatError, mockDelay } from '@/lib/utils'

import type { ActionResponse, ShippingAddress } from '@/types'

import { prisma } from '@/db/prisma'

import {
  paymentMethodSchema,
  shippingAddressSchema,
  signInFormShema,
  signUpFormShema
} from '../validators'

export async function signInWithCredentials(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    await mockDelay(700)
    const user = signInFormShema.safeParse({
      email: formData.get('email'),
      password: formData.get('password')
    })

    if (!user.success) {
      return {
        success: false,
        message: 'Incorrect email or password'
      }
    }
    await signIn('credentials', user.data)

    return { success: true, message: 'Signed in successfully' }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }

    return {
      success: false,
      message: 'Invalid email or password'
    }
  }
}
export async function signOutUser() {
  console.log('signOutUser called')
  await signOut()
  console.log('signOut completed')
}

export async function signUpUser(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const user = signUpFormShema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    })
    if (!user.success) {
      return {
        success: false,
        message: 'Invalid sign up data'
      }
    }
    const plainPassword = user.data.password

    user.data.password = hashSync(user.data.password, 10)
    await prisma.user.create({
      data: {
        name: user.data.name,
        email: user.data.email,
        password: user.data.password
      }
    })

    await signIn('credentials', {
      email: user.data.email,
      password: plainPassword
    })

    return {
      success: true,
      message: 'User registered and signed in successfully'
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }

    return { success: false, message: await formatError(error) }
  }
}
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId }
  })
  if (!user) throw new Error(`User not Found`)
  return user
}

//Update user Address

export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth()
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id }
    })
    if (!currentUser) throw Error('User not found')

    const address = shippingAddressSchema.parse(data)
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address }
    })

    return {
      success: true,
      message: 'User address updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error)
    }
  }
}

//Update user Payment method

export async function updateUserPaymentMethod(data: z.infer<typeof paymentMethodSchema>) {
  try {
    const session = await auth()
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id }
    })
    if (!currentUser) throw new Error('User not found')
    const paymentMethod = paymentMethodSchema.parse(data)

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type }
    })
    return {
      success: true,
      message: 'User payment method updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error)
    }
  }
}

//Update the user profile

export async function updateProfile(user: { name: string; email: string }) {
  try {
    const session = await auth()
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id
      }
    })
    if (!currentUser) throw new Error(`User not found`)

    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: user.name
      }
    })

    return {
      success: true,
      message: 'User profile updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error)
    }
  }
}
