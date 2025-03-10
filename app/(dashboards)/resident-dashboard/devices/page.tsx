import { lusitana } from '@/app/ui/ui-utils/fonts';
import AddDeviceForm from '@/app/ui/resident-ui/add-device-form';
import EditDeviceForm from '@/app/ui/resident-ui/edit-device-form';
import DeleteDeviceForm from '@/app/ui/resident-ui/delete-device-form';
import { auth } from '@/auth';
import { fetchUserByEmail } from '@/app/lib/data/data';
import ChangeStatusButton from '@/app/ui/resident-ui/device-status-btn';
import CheckStatus from '@/app/ui/resident-ui/device-status';
import DevicesDashboard from '@/app/ui/resident-ui/resident-dashboard/devices/devicesDashboard';


export default async function Page() {
  const session = await auth();

  //const user = await fetchUserByEmail(session!.user!.email!);
    return (
      <main className="grow bg-white py-16">
        {' '}
        <div className="mx-auto max-w-7xl">
          <div
            className={`${lusitana.className} rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased`}
          >
            Manage Devices 
            {/* <AddDeviceForm user={user}></AddDeviceForm> */}
          </div>
          <br></br>
          <DevicesDashboard/>
        </div>
      </main>
    );

}
