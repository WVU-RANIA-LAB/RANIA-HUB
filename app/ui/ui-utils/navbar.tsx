import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';
import { Role } from '@prisma/client';

import { lusitana } from '@/app/ui/ui-utils/fonts';
import SignOutButton from './sign-out-btn';

const navbarLinks: Record<Role, Array<{ label: string; href: string }>> = {
  RESIDENT: [
    { label: 'Calendar', href: '/resident-dashboard/calendar' },
    { label: 'Devices', href: '/resident-dashboard/devices' },
    { label: 'Medications', href: '/resident-dashboard/medications' },
    { label: 'Contacts', href: '/resident-dashboard/contacts' },
  ],
  DOCTOR: [
    { label: 'Residents', href: '/doctor-dashboard/residents' },
    { label: 'Calendar', href: '/doctor-dashboard/calendar' },
  ],
  ADMIN: [
    { label: 'Users', href: '/admin-dashboard/users' },
    // { label: 'Residents', href: '/admin-dashboard/residents' },
    // { label: 'Doctors', href: '/admin-dashboard/doctors' },
    // { label: 'Admins', href: '/admin-dashboard/admins' },
    { label: 'Developers', href: '/admin-dashboard/developers'},
    // { label: 'Projects', href: '/admin-dashboard/projects'},
    { label: 'Products', href: '/admin-dashboard/products'},
    // { label: 'Devices', href: '/admin-dashboard/devices'},
    // { label: 'Hubs', href: '/admin-dashboard/hubs'}


  ],
  DEVELOPER: [
    { label: 'Dashboard Management', href: '/developer-dashboard/' },
    { label: 'Project Testing', href: '/developer-dashboard/project-testing' },
  ],
};

type NavbarProps = {
  role: Role;
};

export default function Navbar({ role }: NavbarProps) {
  return (
    <nav className="navbar bg-wvu-primary-blue">
      <div className="navbar-start">
        <h1
          className={`${lusitana.className} text-2xl font-bold text-wvu-off-white ml-5`}
        >
          RANIAhub
        </h1>
      </div>
      <div className="navbar-center gap-x-8">
        {navbarLinks[role].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={`text-l text-wvu-off-white hover:text-wvu-blue active:underline `}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="w-8 rounded-full">
              <UserIcon className="text-wvu-off-white hover:text-wvu-blue" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-gray-200 p-2 text-black "
          >
            <li>
              <Link
                href={`/${role.toLowerCase()}-dashboard/profile`}
                className="hover:bg-wvu-blue-light"
              >
                Profile
              </Link>
            </li>
            <li>
              <SignOutButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
