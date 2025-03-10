import { Metadata } from 'next';

import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import ProfileForm from '@/app/ui/ui-utils/profile-form';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page() {
  const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);

  return (
    <main className="grow bg-wvu-off-white py-16">
      <ProfileForm user={user} />
    </main>
  );
}
