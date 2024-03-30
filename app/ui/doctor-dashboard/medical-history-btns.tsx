'use client';

import { useRef } from 'react';
import MedicalHistoryModal from './medical-history-modal';

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
