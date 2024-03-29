'use client';

import { forwardRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { createMedication } from '@/app/lib/actions/medication-actions';

type MedicationFormProps = { doctorId: string; residentId: string };

const MedicationForm = forwardRef<HTMLFormElement, MedicationFormProps>(
  function MedicationForm({ doctorId, residentId }, ref) {
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
      <form ref={ref} action={dispatch} className="flex flex-col gap-y-4">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Medication Name:</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Medication name"
            className="input input-bordered"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Instructions:</span>
          </div>
          <textarea
            name="instructions"
            placeholder="Instructions"
            className="textarea textarea-bordered h-32"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Refills</span>
          </div>
          <input
            type="number"
            name="refills"
            placeholder="Refills"
            min={0}
            className="input input-bordered"
          />
        </label>
        <Submit />
      </form>
    );
  },
);

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="btn mt-4">
      {pending && <span className="loading loading-spinner" />}
      Create
    </button>
  );
}

export default MedicationForm;
