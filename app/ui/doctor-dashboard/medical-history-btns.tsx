'use client';

import { useRef } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { MedicalHistoryEntry } from '@prisma/client';

import MedicalHistoryModal from '@/app/ui/doctor-dashboard/medical-history-modal';
import { deleteMedicalHistoryEntry } from '@/app/lib/actions/medical-history-actions';

type CreateMedicalHistoryButtonProps = { doctorId: string; residentId: string };

export function CreateMedicalHistoryButton({
  doctorId,
  residentId,
}: CreateMedicalHistoryButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button className="btn" onClick={() => dialogRef.current?.showModal()}>
        Create
      </button>

      <MedicalHistoryModal
        mode="Create"
        doctorId={doctorId}
        residentId={residentId}
        ref={dialogRef}
      />
    </>
  );
}

type EditMedicalHistoryButtonProps = {
  doctorId: string;
  residentId: string;
  medicalHistoryEntry: MedicalHistoryEntry;
};

export function EditMedicalHistoryButton({
  doctorId,
  residentId,
  medicalHistoryEntry,
}: EditMedicalHistoryButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-square btn-sm"
        onClick={() => dialogRef.current?.showModal()}
      >
        <PencilIcon className="h-5" />
      </button>

      <MedicalHistoryModal
        mode="Edit"
        doctorId={doctorId}
        residentId={residentId}
        medicalHistoryEntry={medicalHistoryEntry}
        ref={dialogRef}
      />
    </>
  );
}

type DeleteMedicalHistoryButtonProps = {
  medicalHistoryId: string;
  residentId: string;
};

export function DeleteMedicalHistoryButton({
  medicalHistoryId,
  residentId,
}: DeleteMedicalHistoryButtonProps) {
  const deleteMedicationWithId = deleteMedicalHistoryEntry.bind(
    null,
    medicalHistoryId,
    residentId,
  );

  return (
    <form action={deleteMedicationWithId}>
      <button className="btn btn-square btn-sm">
        <TrashIcon className="h-5" />
      </button>
    </form>
  );
}
