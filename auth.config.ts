import type { NextAuthConfig } from 'next-auth';
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
    authorized({ request: { nextUrl }, auth }) {
      if (!auth?.user) {
        return false;
      }
      const isOnCorrectDashboard = nextUrl.pathname.startsWith(
        `/${auth.user.role.toLowerCase()}`,
      );
      if (!isOnCorrectDashboard) {
        return Response.redirect(new URL('/redirect', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
