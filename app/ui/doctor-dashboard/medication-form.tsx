'use client';

import { forwardRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import {
  createMedication,
  updateMedication,
} from '@/app/lib/actions/medication-actions';
import { fetchFilteredMedications } from '@/app/lib/data/doctor-data';
import FieldErrors from '@/app/ui/field-errors';

type MedicationFormProps = {
  doctorId: string;
  residentId: string;
  medication?: Awaited<ReturnType<typeof fetchFilteredMedications>>[number];
};

const MedicationForm = forwardRef<HTMLFormElement, MedicationFormProps>(
  function MedicationForm({ doctorId, residentId, medication }, ref) {
    const medicationAction = medication
      ? updateMedication.bind(null, medication.id, doctorId, residentId)
      : createMedication.bind(null, doctorId, residentId);
    const [state, dispatch] = useFormState(medicationAction, {});

    return (
      <form ref={ref} action={dispatch} className="flex flex-col gap-y-4">
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Medication Name:</span>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Medication name"
              defaultValue={medication?.name ?? ''}
              className="input input-bordered"
              required
            />
          </label>
          <FieldErrors errors={state.errors?.name} />
        </div>
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Instructions:</span>
            </div>
            <textarea
              name="instructions"
              placeholder="Instructions"
              defaultValue={medication?.instructions ?? ''}
              className="textarea textarea-bordered h-32"
            />
          </label>
          <FieldErrors errors={state.errors?.instructions} />
        </div>
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Refills</span>
            </div>
            <input
              type="number"
              name="refills"
              placeholder="Refills"
              min={0}
              defaultValue={medication?.refills ?? ''}
              className="input input-bordered"
            />
          </label>
          <FieldErrors errors={state.errors?.refills} />
        </div>
        <Submit mode={medication ? 'Update' : 'Create'} />
      </form>
    );
  },
);

type SubmitProps = { mode: 'Create' | 'Update' };

function Submit({ mode }: SubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="btn mt-4">
      {pending && <span className="loading loading-spinner" />}
      {mode}
    </button>
  );
}

export default MedicationForm;
