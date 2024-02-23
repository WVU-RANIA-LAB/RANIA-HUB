import { Metadata } from 'next';
import { UserIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

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

        <button className="btn rounded-md border-2 border-gray-400 bg-white text-lg font-semibold text-gray-800 hover:bg-gray-100">
          Sign In With Google
        </button>

        <div className="my-8 flex items-center justify-between">
          <hr className="flex-grow border border-gray-300" />
          <span className={`${lusitana.className} mx-4 text-gray-800`}>OR</span>
          <hr className="flex-grow border border-gray-300" />
        </div>

        <div className="flex flex-col gap-y-6">
          <label className="input flex items-center gap-2 border-gray-400 bg-white">
            <UserIcon className="h-4 text-gray-500" />
            <input
              type="text"
              placeholder="name@gmail.com"
              className="grow bg-white text-gray-800 placeholder:text-gray-500"
            />
          </label>
          <button className="btn rounded-md border-none bg-wvu-blue text-lg font-semibold text-white hover:bg-wvu-primary-blue">
            Sign In With Email
          </button>
          <p className="text-sm text-gray-500">
            We&apos;ll email you a magic link for a password-free sign in.
          </p>
        </div>
      </div>
    </main>
  );
}
