import { Metadata } from 'next';

import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data';
import DeviceForm from '@/app/ui/device-form';

export const metadata: Metadata = {
  title: 'Devices',
};

export default async function Page() {
  const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);

  return (
    <main className="grow bg-white py-16">
      <DeviceForm></DeviceForm>
    </main>
  );
}
