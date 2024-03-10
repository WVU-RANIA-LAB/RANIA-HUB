'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div>
        Profile
        <p>{session.user.name}</p>
      </div>
    );
  }
  return redirect('/sign-in');
}
