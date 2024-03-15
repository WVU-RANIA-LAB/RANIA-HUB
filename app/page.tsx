import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen items-center bg-wvu-off-white">
      <div
        className={`${lusitana.className} mx-auto flex max-w-lg flex-col text-center antialiased`}
      >
        <h1 className="text-5xl font-bold text-wvu-primary-blue">RANIA HUB</h1>
        <h2 className="my-5 text-2xl text-gray-800">
          Empowering Independent Living for Seniors
        </h2>
        <p className="my-1 text-gray-800">
          Welcome to RANIA Hub, a pioneering web application spearheading the
          integration of medical records and IoT devices to elevate the quality
          of life for the elderly. Our innovative smart-home system fosters
          independence by seamlessly connecting medical devices, managing
          appointments, medication schedules, and daily tasks through a
          user-friendly, centralized dashboard.
        </p>
        <Link
          href="/sign-in"
          className="btn btn-sm my-8 rounded-md border-none bg-wvu-blue text-white hover:bg-wvu-primary-blue"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
