'use server';

import { signInFormShema } from '../validators';
import { signIn, signOut } from '@/../auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { AuthError } from 'next-auth';

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const parsedData = signInFormShema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!parsedData.success) {
      return {
        success: false,
        message: 'Invalid input',
      };
    }

    await signIn('credentials', {
      ...parsedData.data,
      redirectTo: '/',
    });

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    return {
      success: false,
      message: 'An error occurred',
    };
  }
}
export async function signOutUser() {
  console.log('signOutUser called');
  await signOut();
  console.log('signOut completed');
}
