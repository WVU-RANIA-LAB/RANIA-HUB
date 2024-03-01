import Link from 'next/link';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

<NavBar
  links={
    [
      // Add more links as needed. The example is given below
      // { href: '/dashboard/home', label: 'Home' },
    ]
  }
/>;

// Prop `links` is an array of link objects passed to the NavBar
export function NavBar({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}) {
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
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="mx-4 text-xl text-black hover:text-wvu-blue active:underline"
          >
            {link.label}
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
              <Image
                alt="Tailwind CSS Navbar component"
                src="/images/profile_icon.svg"
                width="40"
                height="40"
              />
            </div>
          </div>
          {/* Dropdown or other elements can remain static or also be made dynamic in a similar fashion */}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
