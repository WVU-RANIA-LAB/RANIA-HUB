import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { fetchRecentMedicalHistory } from '@/app/lib/data/doctor-data';

type RecentMedicalHistoryProps = { residentId: string };

export async function RecentMedicalHistory({
  residentId,
}: RecentMedicalHistoryProps) {
  const recentMedicalHistory = await fetchRecentMedicalHistory(residentId);
  const formatter = new Intl.DateTimeFormat('en-US');

  return (
    <div className="card card-compact h-full shadow-lg">
      <div className="card-body">
        <div className="card-title justify-between">
          <h2>Recent Medical History</h2>
          <Link
            href={`/doctor-dashboard/residents/${residentId}/medical-history`}
            className="btn btn-square btn-sm"
          >
            <ArrowRightIcon className="h-5" />
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {recentMedicalHistory.map((entry) => (
              <tr key={entry.id}>
                <td>{formatter.format(entry.date)}</td>
                <td>{entry.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
