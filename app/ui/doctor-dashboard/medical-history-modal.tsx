'use client';

import { forwardRef, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MedicalHistoryEntry } from '@prisma/client';

import {
  createMedicalHistoryEntry,
  updateMedicalHistoryEntry,
} from '@/app/lib/actions/medical-history-actions';
import FieldErrors from '@/app/ui/field-errors';

type MedicalHistoryModalProps =
  | { mode: 'Create'; doctorId: string; residentId: string }
  | {
      mode: 'Edit';
      doctorId: string;
      residentId: string;
      medicalHistoryEntry: MedicalHistoryEntry;
    };

const MedicalHistoryModal = forwardRef<
  HTMLDialogElement,
  MedicalHistoryModalProps
>(function MedicationModal(props, ref) {
  const { mode, doctorId, residentId } = props;

  const formRef = useRef<HTMLFormElement>(null);
  const medicalHistoryAction =
    mode === 'Create'
      ? createMedicalHistoryEntry.bind(null, residentId, doctorId)
      : updateMedicalHistoryEntry.bind(
          null,
          props.medicalHistoryEntry.id,
          residentId,
          doctorId,
        );
  const [state, dispatch] = useFormState(medicalHistoryAction, {});

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-6 top-6"
            onClick={() => formRef.current?.reset()}
          >
            <XMarkIcon className="h-6" />
          </button>
        </form>
        <h2 className="mb-4 text-lg font-bold">{props.mode} Medical History</h2>

        <form ref={formRef} action={dispatch} className="flex flex-col gap-y-4">
          <div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Date:</span>
              </div>
              <input
                type="date"
                name="date"
                className="input input-bordered"
                required
              />
            </label>
            <FieldErrors errors={state.errors?.date} />
          </div>
          <div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Description:</span>
              </div>
              <textarea
                name="description"
                placeholder="Description"
                defaultValue={
                  mode === 'Create' ? '' : props.medicalHistoryEntry.description
                }
                className="textarea textarea-bordered h-32"
              />
            </label>
            <FieldErrors errors={state.errors?.description} />
          </div>
          <div>
            <Submit mode={mode === 'Create' ? 'Create' : 'Update'} />
            {state.message && <span>{state.message}</span>}
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={() => formRef.current?.reset()} />
      </form>
    </dialog>
  );
});

type SubmitProps = { mode: 'Create' | 'Update' };

function Submit({ mode }: SubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="btn mt-4 w-full">
      {pending && <span className="loading loading-spinner" />}
      {mode}
    </button>
  );
}

export default MedicalHistoryModal;
