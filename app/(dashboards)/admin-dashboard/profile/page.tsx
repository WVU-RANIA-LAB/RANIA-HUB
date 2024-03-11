import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data';
import ProfileForm from '@/app/ui/profile-form';

export default async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/navigation');
  }

  const user = await fetchUserByEmail(session.user.email);

  return (
    <main className="grow bg-white pt-16">
      <ProfileForm user={user} />
    </main>
  );
}
