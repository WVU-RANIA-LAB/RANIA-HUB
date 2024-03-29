import { forwardRef, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import MedicationForm from '@/app/ui/doctor-dashboard/medication-form';

type MedicationModalProps = { doctorId: string; residentId: string };

const MedicationModal = forwardRef<HTMLDialogElement, MedicationModalProps>(
  function MedicationModal({ doctorId, residentId }, ref) {
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
          <h2 className="mb-4 text-lg font-bold">Create Medication</h2>

          <MedicationForm
            doctorId={doctorId}
            residentId={residentId}
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
