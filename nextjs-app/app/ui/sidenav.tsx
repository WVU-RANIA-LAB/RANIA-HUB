import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/solid';
import {
  ArrowLeftStartOnRectangleIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gray-50 p-2">
      <Link
        href="/"
        className="mb-2 flex h-40 items-end rounded-md bg-teal-500 p-2 text-white"
      >
        <div className="flex items-center gap-3">
          <HomeIcon className="w-7" />
          <h1 className="text-3xl font-medium">RANIA</h1>
        </div>
      </Link>

      {/* Links are placeholders for now. The actual links depend on the user's role and should be stored in the database */}
      <div className="flex grow flex-col justify-between">
        <div className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-md p-2 hover:bg-teal-100 hover:text-teal-700"
          >
            <Squares2X2Icon className="w-6" />
            <p>Dashboard</p>
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 rounded-md p-2 hover:bg-teal-100 hover:text-teal-800"
          >
            <UserCircleIcon className="w-6" />
            <p>Profile</p>
          </Link>
        </div>

        {/* Sign out button does nothing right now. Need to implement auth first. */}
        <button className="flex items-center gap-2 rounded-md p-2 hover:bg-red-100 hover:text-red-800">
          <ArrowLeftStartOnRectangleIcon className="w-6" />
          <p>Sign Out</p>
        </button>
      </div>
    </div>
  );
}
