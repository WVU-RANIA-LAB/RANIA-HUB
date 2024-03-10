'use client';

import { ExclamationCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';

import { signInWithEmail } from '@/app/lib/actions/auth-actions';

export default function SignInForm() {
  const [errorMessage, dispatch] = useFormState(signInWithEmail, undefined);

  return (
    <form action={dispatch} className="flex flex-col gap-y-6">
      <label
        htmlFor="email"
        className="input flex items-center gap-2 border-gray-400 bg-white"
      >
        <UserIcon className="h-4 text-gray-500" />
        <input
          id="email"
          type="email"
          name="email"
          placeholder="name@gmail.com"
          className="grow bg-white text-gray-800 placeholder:text-gray-500"
          required
        />
      </label>
      <Submit />
      {errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}
      <p className="text-sm text-gray-500">
        We&apos;ll email you a magic link for a password-free sign in.
      </p>
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="btn rounded-md border-none bg-wvu-blue text-lg font-semibold text-white hover:bg-wvu-primary-blue"
    >
      {pending && <span className="loading loading-spinner" />}
      Sign In With Email
    </button>
  );
}
