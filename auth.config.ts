import type { NextAuthConfig } from 'next-auth';
import Email from 'next-auth/providers/nodemailer';
import { Role } from '@prisma/client';

export default {
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/verify-request',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role ?? Role.RESIDENT;
      return session;
    },
  },
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
} satisfies NextAuthConfig;
