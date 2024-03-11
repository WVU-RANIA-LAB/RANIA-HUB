import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';
import { Role } from '@prisma/client';

import { lusitana } from '@/app/ui/fonts';

const navbarLinks: Record<Role, Array<{ label: string; href: string }>> = {
  RESIDENT: [
    { label: 'Calendar', href: '/resident-dashboard/calendar' },
    { label: 'Devices', href: '/resident-dashboard/devices' },
    { label: 'Medical History', href: '/resident-dashboard/medical-history' },
    { label: 'Contacts', href: '/resident-dashboard/contacts' },
  ],
  DOCTOR: [
    { label: 'Residents', href: '/doctor-dashboard/residents' },
    { label: 'Calendar', href: '/doctor-dashboard/calendar' },
  ],
  ADMIN: [
    { label: 'Residents', href: '/admin-dashboard/residents' },
    { label: 'Doctors', href: '/admin-dashboard/doctors' },
    { label: 'Admins', href: '/admin-dashboard/admins' },
  ],
};

type NavbarProps = {
  role: Role;
};

export default function Navbar({ role }: NavbarProps) {
  return (
    <div className="navbar bg-wvu-warm-gray-light">
      <div className="navbar-start">
        <h1
          className={`${lusitana.className} text-5xl font-bold text-wvu-primary-blue antialiased`}
        >
          RANIA
        </h1>
      </div>
      <div className="navbar-center">
        {navbarLinks[role].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="mx-4 text-xl text-black hover:text-wvu-blue active:underline"
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
            <div className="w-10 rounded-full">
              <UserIcon className="text-black" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-gray-200 p-2 text-black "
          >
            <li>
              <Link
                href={`${role.toLowerCase()}-dashboard/profile`}
                className="hover:bg-wvu-blue-light"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link href="#" className=" text-red-700 hover:bg-wvu-blue-light">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
