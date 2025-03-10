import { fetchFilteredMedications } from '@/app/lib/data/doctor-data';
import {
  EditMedicationButton,
  DeleteMedicationButton,
} from '@/app/ui/doctor-ui/medication-btns';
import { lusitana } from '@/app/ui/ui-utils/fonts';

type MedicationsTableProps = {
  doctorId: string;
  residentId: string;
  query: string;
  currentPage: number;
};

export default async function MedicationsTable({
  doctorId,
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

  if (!medications.length) {
    return (
      <p className="my-16 text-center text-gray-600">
        This resident doesn&apos;t have any medications.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-y-2 md:hidden">
        {medications.map((medication) => (
          <div key={medication.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>
                  {medication.name}
                </h2>
                <div className="flex gap-2">
                  <EditMedicationButton
                    doctorId={doctorId}
                    residentId={residentId}
                    medication={medication}
                  />
                  <DeleteMedicationButton
                    medicationId={medication.id}
                    residentId={residentId}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-700">
                {medication.doctor.name} -{' '}
                {formatter.format(medication.prescribedDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <table className="table hidden md:table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Instructions</th>
            <th scope="col">Prescribed By</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <tr key={medication.id}>
              <td>{formatter.format(medication.prescribedDate)}</td>
              <td>{medication.name}</td>
              <td>{medication.instructions}</td>
              <td>{medication.doctor.name}</td>
              <td className="flex gap-2">
                <EditMedicationButton
                  doctorId={doctorId}
                  residentId={residentId}
                  medication={medication}
                />
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
