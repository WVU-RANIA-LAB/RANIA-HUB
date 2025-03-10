import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { fetchFilteredResidents } from '@/app/lib/data/doctor-data';
import { lusitana } from '@/app/ui/ui-utils/fonts';

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

  if (!residents.length) {
    return (
      <p className="my-16 text-center text-gray-600">
        You don&apos;t have any residents.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {residents.map((resident) => (
          <div key={resident.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>
                  {resident.name}
                </h2>
                <Link
                  href={`/doctor-dashboard/residents/${resident.id}`}
                  className="btn btn-square btn-sm"
                >
                  <ArrowRightIcon className="h-4" />
                </Link>
              </div>
              <p className="text-sm text-gray-700">{resident.email}</p>
              <p className="text-sm text-gray-700">{resident.phoneNumber}</p>
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
            <th scope="col">Upcoming Appointment</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((resident) => (
            <tr key={resident.id}>
              <td>{resident.name}</td>
              <td>{resident.email}</td>
              <td>{resident.phoneNumber}</td>
              <td>PLACEHOLDER</td>
              <td>
                <Link
                  href={`/doctor-dashboard/residents/${resident.id}`}
                  className="btn btn-square btn-sm"
                >
                  <ArrowRightIcon className="h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
