import { Metadata } from 'next';

import { lusitana } from '@/app/ui/ui-utils/fonts';
import SignInWithGoogleButton from '@/app/ui/ui-utils/google-sign-in-btn';
import SignInForm from '@/app/ui/ui-utils/signin-form';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Page() {
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

        <SignInWithGoogleButton />

        <div className="my-8 flex items-center justify-between">
          <hr className="flex-grow border border-gray-300" />
          <span className={`${lusitana.className} mx-4 text-gray-800`}>OR</span>
          <hr className="flex-grow border border-gray-300" />
        </div>

        <SignInForm />
      </div>
    </main>
  );
}
