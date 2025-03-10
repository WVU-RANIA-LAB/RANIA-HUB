import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { lusitana } from '@/app/ui/ui-utils/fonts';
import { fetchFilteredMedicalHistoryEntries } from '@/app/lib/data/doctor-data';
import {
  EditMedicalHistoryButton,
  DeleteMedicalHistoryButton,
} from '@/app/ui/doctor-ui/medical-history-btns';

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
      <div className="flex flex-col gap-y-2 md:hidden">
        {medicalHistoryEntries.map((entry) => (
          <div key={entry.id} className="card card-compact bg-gray-50">
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className={`text-lg ${lusitana.className}`}>
                  {formatter.format(entry.date)}
                </h2>
                <div className="flex gap-2">
                  <EditMedicalHistoryButton
                    doctorId={doctorId}
                    residentId={residentId}
                    medicalHistoryEntry={entry}
                  />
                  <DeleteMedicalHistoryButton
                    medicalHistoryId={entry.id}
                    residentId={residentId}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-700">{entry.editor.name}</p>
            </div>
          </div>
        ))}
      </div>
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
