'use client';

import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

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
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-6 top-6">
              <XMarkIcon className="h-6" />
            </button>
          </form>
          <h2 className="mb-4 text-lg font-bold">Create Medication</h2>

          <form action={dispatch} className="flex flex-col gap-y-4">
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
                className="input input-bordered"
              />
            </label>
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

  return (
    <button disabled={pending} className="btn mt-4">
      {pending && <span className="loading loading-spinner" />}
      Create
    </button>
  );
}
