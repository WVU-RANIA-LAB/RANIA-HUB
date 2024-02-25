import Link from 'next/link';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export function NavBar() {
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
        <Link
          href="#"
          className="mx-4 text-xl text-black hover:text-wvu-blue active:underline"
        >
          Residents
        </Link>
        <Link
          href="#"
          className="mx-4 text-xl text-black hover:text-wvu-blue active:underline"
        >
          Doctors
        </Link>
        <Link
          href="#"
          className="mx-4 text-xl text-black hover:text-wvu-blue active:underline"
        >
          Admins
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="/images/profile_icon.svg"
                width="40"
                height="40"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-wvu-off-white p-2 text-black "
          >
            <li>
              <a className="hover:bg-wvu-blue-light">Profile</a>
            </li>
            <li>
              <a className="hover:bg-wvu-blue-light">Settings</a>
            </li>
            <li>
              <a className="hover:bg-wvu-blue-light">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
