'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();
  if (session && session.user) {
    return redirect('/dashboard');
  } else {
    return redirect('/sign-in');
  }
}
