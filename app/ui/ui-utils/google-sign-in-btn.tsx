'use client';

import { signInWithGoogle } from '@/app/lib/actions/auth-actions';

export default function SignInWithGoogleButton() {
  return (
    <button
      onClick={() => signInWithGoogle()}
      className="btn rounded-md border-2 border-gray-400 bg-white text-lg font-semibold text-gray-800 hover:bg-gray-100"
    >
      Sign In With Google
    </button>
  );
}
