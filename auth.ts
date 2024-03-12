import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Role } from '@prisma/client';
import {} from 'next-auth/jwt';

import authConfig from '@/auth.config';
import prisma from '@/app/lib/prisma';

declare module 'next-auth' {
  interface User {
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
