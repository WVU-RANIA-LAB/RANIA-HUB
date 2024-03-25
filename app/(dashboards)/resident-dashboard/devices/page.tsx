import { Metadata } from 'next';

import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import AddDeviceForm from '@/app/ui/add-device-form';
import EditDeviceForm from '@/app/ui/edit-device-form';
import DeleteDeviceForm from '@/app/ui/delete-device-form';

export const metadata: Metadata = {
  title: 'Devices',
};

export default async function Page() {
  const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);

  return (
    <main className="grow bg-white py-16">
      {' '}
      <div className="mx-auto max-w-7xl">
        <div
          className={`${lusitana.className} rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased`}
        >
          Manage Devices <AddDeviceForm></AddDeviceForm>
        </div>
        <br></br>
        <table className="table table-auto">
          <thead>
            <tr
              className={`${lusitana.className} text-2xl font-bold text-wvu-primary-blue antialiased`}
            >
              <th>Device</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-lg text-black">
              <td>Filler</td>
              <td>Filler</td>
              <td>Filler</td>
              <td>
                <EditDeviceForm></EditDeviceForm>
                <DeleteDeviceForm></DeleteDeviceForm>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
