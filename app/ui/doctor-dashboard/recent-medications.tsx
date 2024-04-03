import { fetchRecentMedications } from '@/app/lib/data/doctor-data';

type RecentMedicationsProps = { residentId: string };

export async function RecentMedications({
  residentId,
}: RecentMedicationsProps) {
  const recentMedications = await fetchRecentMedications(residentId);
  const formatter = new Intl.DateTimeFormat('en-US');

  return (
    <div>
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
  );
}
