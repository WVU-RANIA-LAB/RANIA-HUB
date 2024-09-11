import { lusitana } from '@/app/ui/fonts';
import { fetchDevices } from '@/app/lib/data/admin-data';
import { DeleteDeviceButton } from './admin-actions-btns';
import { RegisteredDevice } from '@prisma/client';

/**
 * Props for the AdminDevicesTable component.
 */
type AdminDevicesTableProps = {
  query: string;
  currentPage: number;
};

/**
 * Renders a table of devices with their information.
 *
 * @param {AdminDevicesTableProps} props - The component props.
 * @param {string} props.query - The search query for filtering devices.
 * @param {number} props.currentPage - The current page number for pagination.
 * @returns {JSX.Element} The rendered component.
 */
export default async function AdminDevicesTable({
  query,
  currentPage,
}: AdminDevicesTableProps) {
  const devices: RegisteredDevice[] = await fetchDevices();

  // Filter devices based on query
  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(query.toLowerCase())
  );
  console.log(devices)

  // Pagination logic
  const startIndex = (currentPage - 1) * 20;
  const paginatedDevices = filteredDevices.slice(startIndex, startIndex + 20);

  if (!paginatedDevices.length) {
    return (
      <p className="my-16 text-center text-gray-600">No devices found.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {paginatedDevices.map((device) => (
          <div key={device.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>{device.name}</h2>
                <div className="flex gap-2">
                  <DeleteDeviceButton deviceId={device.id} />
                </div>
              </div>
              <p className="text-sm text-gray-700">Device ID: {device.id}</p>
              <p className="text-sm text-gray-700">Registered To: {device.registeredTo}</p>
            </div>
          </div>
        ))}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Device Name</th>
            <th scope="col">Device ID</th>
            <th scope="col">Registered To</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedDevices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>{device.id}</td>
              <td>{device.registeredTo}</td>
              <td className="flex gap-2">
                <DeleteDeviceButton deviceId={device.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
