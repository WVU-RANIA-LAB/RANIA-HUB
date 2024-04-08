import { fetchFilteredDoctors } from '@/app/lib/data/admin-data';
import { lusitana } from '@/app/ui/fonts';

type DoctorsTableProps = {
  doctorIds: string[];
  query: string;
  currentPage: number;
};

export default async function DoctorsTable({
  doctorIds,
  query,
  currentPage,
}: DoctorsTableProps) {
  const doctors = await fetchFilteredDoctors(doctorIds, query, currentPage);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="card bg-gray-100">
            <div className="card-body">
              <h2 className={`text-lg ${lusitana.className}`}>{doctor.name}</h2>
              <p className="text-sm text-gray-700">{doctor.email}</p>
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
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phoneNumber}</td>
              <td>{doctor.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
