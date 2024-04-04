import { fetchFilteredMedicalHistoryEntries } from '@/app/lib/data/doctor-data';
import {
  EditMedicalHistoryButton,
  DeleteMedicalHistoryButton,
} from '@/app/ui/doctor-dashboard/medical-history-btns';

type MedicalHistoryTableProps = {
  doctorId: string;
  residentId: string;
  query: string;
  currentPage: number;
};

export default async function MedicalHistoryTable({
  doctorId,
  residentId,
  query,
  currentPage,
}: MedicalHistoryTableProps) {
  const medicalHistoryEntries = await fetchFilteredMedicalHistoryEntries(
    residentId,
    query,
    currentPage,
  );

  const formatter = new Intl.DateTimeFormat('en-US');

  if (!medicalHistoryEntries.length) {
    return (
      <p className="my-16 text-center text-gray-600">
        This resident doesn&apos;t have any medical history.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Added By</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicalHistoryEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{formatter.format(entry.date)}</td>
              <td>{entry.description}</td>
              <td>{entry.editor.name}</td>
              <td className="flex gap-2">
                <EditMedicalHistoryButton
                  doctorId={doctorId}
                  residentId={residentId}
                  medicalHistoryEntry={entry}
                />
                <DeleteMedicalHistoryButton
                  medicalHistoryId={entry.id}
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
