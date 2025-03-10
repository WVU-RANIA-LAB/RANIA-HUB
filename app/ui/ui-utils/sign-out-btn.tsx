'use client';

import { signOutUser } from '@/app/lib/actions/auth-actions';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOutUser()}
      className="text-red-700 hover:bg-red-200"
    >
      Sign out
    </button>
  );
}
