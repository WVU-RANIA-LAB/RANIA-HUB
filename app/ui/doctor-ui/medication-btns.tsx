'use client';

import { useRef } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { fetchFilteredMedications } from '@/app/lib/data/doctor-data';
import { deleteMedication } from '@/app/lib/actions/medication-actions';
import MedicationModal from '@/app/ui/doctor-ui/medication-modal';

type CreateMedicationButtonProps = { doctorId: string; residentId: string };

export function CreateMedicationButton({
  doctorId,
  residentId,
}: CreateMedicationButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button className="btn" onClick={() => dialogRef.current?.showModal()}>
        Create
      </button>

      <MedicationModal
        mode="Create"
        doctorId={doctorId}
        residentId={residentId}
        ref={dialogRef}
      />
    </>
  );
}

type EditMedicationButtonProps = {
  doctorId: string;
  residentId: string;
  medication: Awaited<ReturnType<typeof fetchFilteredMedications>>[number];
};

export function EditMedicationButton({
  doctorId,
  residentId,
  medication,
}: EditMedicationButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-square btn-sm"
        onClick={() => dialogRef.current?.showModal()}
      >
        <PencilIcon className="h-5" />
      </button>

      <MedicationModal
        mode="Edit"
        doctorId={doctorId}
        residentId={residentId}
        medication={medication}
        ref={dialogRef}
      />
    </>
  );
}

type DeleteMedicationButtonProps = { medicationId: string; residentId: string };

export function DeleteMedicationButton({
  medicationId,
  residentId,
}: DeleteMedicationButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const deleteMedicationWithId = deleteMedication.bind(
    null,
    medicationId,
    residentId,
  );

  return (
    <>
      <button
        className="btn btn-square btn-sm"
        onClick={() => dialogRef.current?.showModal()}
      >
        <TrashIcon className="h-5" />
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h2 className="text-lg font-bold">
            Are you sure you want to delete this medication?
          </h2>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <form action={deleteMedicationWithId}>
              <button className="btn btn-error">Delete</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
