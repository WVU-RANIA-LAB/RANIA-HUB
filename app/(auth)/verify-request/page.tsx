import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export const metadata: Metadata = {
  title: 'Verify Request',
};

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-wvu-off-white">
      <div className="flex flex-col items-center gap-y-6">
        <p className="text-gray-600">
          A link has been sent to your email. Click it to complete your sign-in.
        </p>
        <Link
          href="/sign-in"
          className="btn border-none bg-wvu-blue text-white hover:bg-wvu-primary-blue"
        >
          <ArrowLeftIcon className="h-4" />
          Back to Sign-in
        </Link>
      </div>
    </main>
  );
}
