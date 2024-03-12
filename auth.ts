import NextAuth from 'next-auth';
import Email from 'next-auth/providers/nodemailer';
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
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Email({
      id: 'email',
      name: 'email',
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
});
