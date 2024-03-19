import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    '/resident-dashboard/:path*',
    '/doctor-dashboard/:path*',
    '/admin-dashboard/:path*',
  ],
};
