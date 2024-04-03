import { fetchRecentMedicalHistory } from '@/app/lib/data/doctor-data';

type RecentMedicalHistoryProps = { residentId: string };

export async function RecentMedicalHistory({
  residentId,
}: RecentMedicalHistoryProps) {
  const recentMedicalHistory = await fetchRecentMedicalHistory(residentId);
  const formatter = new Intl.DateTimeFormat('en-US');

  return (
    <div>
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
  );
}
