import { fetchFilteredMedications } from '@/app/lib/data/doctor-data';
import { DeleteMedicationButton } from '@/app/ui/doctor-dashboard/medication-btns';

type MedicationsTableProps = {
  residentId: string;
  query: string;
  currentPage: number;
};

export default async function MedicationsTable({
  residentId,
  query,
  currentPage,
}: MedicationsTableProps) {
  const medications = await fetchFilteredMedications(
    residentId,
    query,
    currentPage,
  );

  const formatter = new Intl.DateTimeFormat('en-US');

  return (
    <div className="overflow-x-auto">
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Instructions</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <tr key={medication.id}>
              <td>{formatter.format(medication.prescribedDate)}</td>
              <td>{medication.name}</td>
              <td>{medication.instructions}</td>
              <td className="flex gap-2">
                <DeleteMedicationButton
                  medicationId={medication.id}
                  residentId={residentId}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
