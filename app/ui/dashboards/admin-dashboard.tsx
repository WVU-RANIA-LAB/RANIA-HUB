import NavBar from '@/app/components/admin-navbar';

NavBar;
export default function AdminDashboard() {
  return (
    <NavBar
      links={[
        // Add more links as needed. The example is given below
        // { href: '/dashboard/home', label: 'Home' },
        { href: '#', label: 'Residents' },
        { href: '#', label: 'Doctors' },
        { href: '#', label: 'Admins' },
      ]}
    />
  );
}
