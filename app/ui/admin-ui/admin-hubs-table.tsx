import { lusitana } from '@/app/ui/ui-utils/fonts';
import { fetchHubs } from '@/app/lib/data/admin-data';
import { DeleteHubButton } from './admin-actions-btns';
import { RegisteredHub } from '@prisma/client';

/**
 * Props for the AdminProjectsTable component.
 */
type AdminDevicesTableProps = {
  query: string;
  currentPage: number;
};

/**
 * Renders a table of projects with their information and actions.
 *
 * @param {AdminDevicesTableProps} props - The component props.
 * @param {string} props.query - The search query for filtering projects.
 * @param {number} props.currentPage - The current page number for pagination.
 * @returns {JSX.Element} The rendered component.
 */
export default async function AdminHubsTable({
  query,
  currentPage,
}: AdminDevicesTableProps) {
  const hubs: RegisteredHub[] = await fetchHubs();

  // Filter hubs based on query
  const filteredHubs = hubs.filter((hub) =>
    hub.id.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * 20;
  const paginatedHubs = filteredHubs.slice(startIndex, startIndex + 20);

  if (!paginatedHubs.length) {
    return (
      <p className="my-16 text-center text-gray-600">No hubs found.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {paginatedHubs.map((hub) => (
          <div key={hub.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>{hub.id}</h2>
                <div>
                  <DeleteHubButton hubId={hub.id} />
                </div>
              </div>
              <p className="text-sm text-gray-700">Hub Owner: {hub.registeredToId}</p>
            </div>
          </div>
        ))}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Hub ID</th>
            <th scope="col">Hub Owner</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedHubs.map((hub) => (
            <tr key={hub.id}>
              <td>{hub.id}</td>
              <td>{hub.registeredToId}</td>
              <td className="flex gap-2">
                <DeleteHubButton hubId={hub.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
