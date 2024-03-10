'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import SignInForm from '@/app/ui/signin-form';

export const metadata: Metadata = {
  title: 'Sign In',
};
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();

  if (session && session.user) {
    return redirect('/dashboard');
  } else {
    return (
      <main className="flex min-h-screen items-center bg-wvu-off-white">
        <div className="mx-auto flex max-w-lg flex-col text-center">
          <h1
            className={`${lusitana.className} text-5xl font-bold text-wvu-primary-blue antialiased`}
          >
            RANIA
          </h1>
          <p className={`${lusitana.className} my-10 text-2xl text-gray-800`}>
            Sign in to RANIA Hub
          </p>

          <button
            onClick={() => signIn()}
            className="btn rounded-md border-2 border-gray-400 bg-white text-lg font-semibold text-gray-800 hover:bg-gray-100"
          >
            Sign In With Google
          </button>

          <div className="my-8 flex items-center justify-between">
            <hr className="flex-grow border border-gray-300" />
            <span className={`${lusitana.className} mx-4 text-gray-800`}>
              OR
            </span>
            <hr className="flex-grow border border-gray-300" />
          </div>

        <SignInForm />
      </div>
    </main>
  );
}
