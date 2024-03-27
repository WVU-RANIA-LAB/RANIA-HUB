'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteDevice } from '../lib/actions/device-actions';
import { Device } from '@prisma/client';
import { useFormState, useFormStatus } from 'react-dom';

type DeleteDeviceFormProps = { device: Device };

export default function deleteDeviceForm({ device }: DeleteDeviceFormProps) {
  const deleteDeviceForm = deleteDevice.bind(null, device);
  const [state, dispatch] = useFormState(deleteDeviceForm, {
    message: null,
    errors: {},
  });
  return (
    <div>
      <button
        className="btn mx-2 bg-white text-wvu-primary-blue hover:bg-wvu-primary-gold"
        onClick={() =>
          (
            document.getElementById('deleteDeviceModal') as HTMLDialogElement
          ).showModal()
        }
      >
        <TrashIcon className="full w-8"></TrashIcon>
      </button>
      <dialog id="deleteDeviceModal" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-xl font-bold text-wvu-primary-blue">
            Are you sure you want to delete {device.name}?
          </h3>
          <div className="inline-block">
            <br></br>
            <form action={dispatch} className="mx-auto max-w-3xl">
              <Submit />

              {state.message && (
                <p className="my-4 text-sm text-gray-600">{state.message}</p>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="btn rounded-md border-none bg-wvu-blue text-lg font-semibold text-white hover:bg-wvu-primary-blue"
    >
      {pending && <span className="loading loading-spinner" />}
      Yes, Delete Device
    </button>
  );
}
