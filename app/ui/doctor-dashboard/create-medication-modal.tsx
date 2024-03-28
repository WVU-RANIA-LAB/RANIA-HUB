'use client';

import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createMedication } from '@/app/lib/actions/medication-actions';

type CreateMedicationModalProps = { doctorId: string; residentId: string };

export default function CreateMedicationModal({
  doctorId,
  residentId,
}: CreateMedicationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const createMedicationWithDoctorIdAndResidentId = createMedication.bind(
    null,
    doctorId,
    residentId,
  );
  const [state, dispatch] = useFormState(
    createMedicationWithDoctorIdAndResidentId,
    {},
  );

  return (
    <>
      <button className="btn" onClick={() => dialogRef.current?.showModal()}>
        Create
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <form action={dispatch}>
            <input type="text" name="name" placeholder="Medication name" />
            <textarea name="instructions" />
            <input type="number" name="refills" placeholder="Refills" />
            <Submit />
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return <button disabled={pending}>Create</button>;
}
