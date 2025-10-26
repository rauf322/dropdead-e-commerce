import NextAuth from 'next-auth';
import type { Adapter } from '@auth/core/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db/prisma';
import { compareSync } from 'bcrypt-ts-edge';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { signInFormShema } from '@/lib/validators';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
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
    async jwt({ token, user }) {
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
      }
      return token;
    },
  },
});
