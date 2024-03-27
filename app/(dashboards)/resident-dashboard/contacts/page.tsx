import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data';
import Contacts from '@/app/ui/resident-ui/contacts';
export default async function Page() {
  const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);

  return (
    <main className="grow bg-white py-16">
      <Contacts user={user} />
    </main>
  );
  }