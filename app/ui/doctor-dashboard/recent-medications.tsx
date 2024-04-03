import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { fetchRecentMedications } from '@/app/lib/data/doctor-data';

type RecentMedicationsProps = { residentId: string };

export async function RecentMedications({
  residentId,
}: RecentMedicationsProps) {
  const recentMedications = await fetchRecentMedications(residentId);
  const formatter = new Intl.DateTimeFormat('en-US');

  return (
    <div className="card card-compact h-full shadow-lg">
      <div className="card-body">
        <div className="card-title justify-between">
          <h2>Recent Medications</h2>
          <Link
            href={`/doctor-dashboard/residents/${residentId}/medications`}
            className="btn btn-square btn-sm"
          >
            <ArrowRightIcon className="h-5" />
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {recentMedications.map((medication) => (
              <tr key={medication.id}>
                <td>{formatter.format(medication.prescribedDate)}</td>
                <td>{medication.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
