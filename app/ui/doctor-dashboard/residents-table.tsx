import { fetchFilteredResidents } from '@/app/lib/data/doctor-data';
import { lusitana } from '@/app/ui/fonts';

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
            <th scope="col">Upcoming Appointment</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((resident) => (
            <tr key={resident.id}>
              <td>{resident.name}</td>
              <td>{resident.email}</td>
              <td>{resident.phoneNumber}</td>
              <td>PLACEHOLDER</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
