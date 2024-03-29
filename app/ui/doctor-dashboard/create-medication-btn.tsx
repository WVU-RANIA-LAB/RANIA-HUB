'use client';

import { useRef } from 'react';

import MedicationModal from '@/app/ui/doctor-dashboard/medication-modal';

type CreateMedicationButtonProps = { doctorId: string; residentId: string };

export default function CreateMedicationButton({
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
        doctorId={doctorId}
        residentId={residentId}
        ref={dialogRef}
      />
    </>
  );
}
