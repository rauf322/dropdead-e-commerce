import NextAuth from 'next-auth';
import { prisma } from './db/prisma';
import { compareSync } from 'bcrypt-ts-edge';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { signInFormShema } from '@/lib/validators';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/sign-in',
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = signInFormShema.safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user || !user.password) return null;

        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.name = token.name;
      if (token && session.user) {
        if (token.id) session.user.id = token.id;
        if (token.role) session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;

        if (user.name == 'NO_NAME') {
          token.name = user.email!.split('@')[0];

          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookiesObject = await cookies();
          const sessionCartId = cookiesObject.get('sessionCartId')?.value;

          if (sessionCartId) {
            // Try to find session cart and link it to user
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId },
            });
            if (sessionCart) {
              // Convert session cart to user cart
              await prisma.cart.update({
                where: { id: sessionCart.id },
                data: { userId: user.id },
              });
            } else {
              // Create new cart for user
              await prisma.cart.create({
                data: {
                  userId: user.id,
                  sessionCartId: sessionCartId,
                  items: [],
                  itemsPrice: 0,
                  totalPrice: 0,
                  shippingPrice: 0,
                  taxPrice: 0,
                },
              });
            }
          }
        }
      }
      return token;
    },
  },
});
