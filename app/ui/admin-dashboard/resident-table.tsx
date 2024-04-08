import { fetchFilteredResidents } from '@/app/lib/data/admin-data';
import { lusitana } from '@/app/ui/fonts';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';

type ResidentsTableProps = {
  residentIds: string[];
  query: string;
  currentPage: number;
};

export default async function ResidentsTable({
  residentIds,
  query,
  currentPage,
}: ResidentsTableProps) {
  const residents = await fetchFilteredResidents(
    residentIds,
    query,
    currentPage,
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {residents.map((resident) => (
          <div key={resident.id} className="card bg-gray-100">
            <div className="card-body">
              <h2 className={`text-lg ${lusitana.className}`}>
                {resident.name}
              </h2>
              <p className="text-sm text-gray-700">{resident.email}</p>
            </div>
          </div>
        ))}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((resident) => (
            <tr key={resident.id}>
              <td>{resident.name}</td>
              <td>{resident.email}</td>
              <td>{resident.phoneNumber}</td>
              <td>{resident.role}</td>
              <td>
                <div className="flex">
                  <button className="mr-2">
                    <PencilIcon className="text-gray-700" width={20} />
                  </button>
                  <button>
                    <TrashIcon className="text-gray-700" width={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
