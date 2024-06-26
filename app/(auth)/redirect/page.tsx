import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect('/sign-in');
  }

  switch (session.user.role) {
    case 'RESIDENT':
      redirect('/resident-dashboard');
    case 'DOCTOR':
      redirect('/doctor-dashboard/residents');
    case 'ADMIN':
      redirect('/admin-dashboard/residents');
    case 'DEVELOPER':
      redirect('/developer-dashboard');
  }
}
