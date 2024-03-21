import { fetchFilteredResidents } from '@/app/lib/data/doctor-data';

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
      <table className="table">
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
