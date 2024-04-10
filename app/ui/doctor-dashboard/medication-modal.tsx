'use client';

import { forwardRef, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { fetchFilteredMedications } from '@/app/lib/data/doctor-data';
import MedicationForm from '@/app/ui/doctor-dashboard/medication-form';

type MedicationModalProps =
  | { mode: 'Create'; doctorId: string; residentId: string }
  | {
      mode: 'Edit';
      doctorId: string;
      residentId: string;
      medication: Awaited<ReturnType<typeof fetchFilteredMedications>>[number];
    };

const MedicationModal = forwardRef<HTMLDialogElement, MedicationModalProps>(
  function MedicationModal(props, ref) {
    const formRef = useRef<HTMLFormElement>(null);

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
          <h2 className="mb-4 text-lg font-bold">{props.mode} Medication</h2>

          <MedicationForm
            doctorId={props.doctorId}
            residentId={props.residentId}
            medication={props.mode === 'Edit' ? props.medication : undefined}
            ref={formRef}
          />
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => formRef.current?.reset()} />
        </form>
      </dialog>
    );
  },
);

export default MedicationModal;
