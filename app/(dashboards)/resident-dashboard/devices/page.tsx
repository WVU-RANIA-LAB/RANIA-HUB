import { Metadata } from 'next';

import { lusitana } from '@/app/ui/fonts';
import AddDeviceForm from '@/app/ui/add-device-form';
import EditDeviceForm from '@/app/ui/edit-device-form';
import DeleteDeviceForm from '@/app/ui/delete-device-form';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import { fetchDevicesByResident } from '@/app/lib/data/resident-data';

export const metadata: Metadata = {
  title: 'Devices',
};

export default async function Page() {
  const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);
  const devices = await fetchDevicesByResident(user.id);

  if (devices.length === 0) {
    return (
      <main className="grow bg-white py-16">
        {' '}
        <div className="mx-auto max-w-7xl">
          <div
            className={`${lusitana.className} rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased`}
          >
            Manage Devices <AddDeviceForm user={user}></AddDeviceForm>
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
                <td>No Devices to Display</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
  }

  return (
    <main className="grow bg-white py-16">
      <div className="mx-auto max-w-7xl">
        <div
          className={`${lusitana.className} rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased`}
        >
          Manage Devices <AddDeviceForm user={user}></AddDeviceForm>
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
            {devices.map((device, index) => (
              <tr key={index}>
                <td>{device.name}</td>
                <td>{device.status}</td>
                <td>{device.description}</td>
                <td
                  className={`${lusitana.className} join join-vertical md:join-horizontal`}
                >
                  <EditDeviceForm device={device}></EditDeviceForm>
                  <br></br>
                  <DeleteDeviceForm device={device}></DeleteDeviceForm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
