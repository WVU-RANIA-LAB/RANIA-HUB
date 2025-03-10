'use client';

import { PencilIcon } from '@heroicons/react/24/solid';
import { editDevice } from '@/app/lib/actions/device-actions';
import { Device } from '@prisma/client';
import { useFormState, useFormStatus } from 'react-dom';
import { useRef } from 'react';

type EditDeviceFormProps = { device: Device };

export default function EditDeviceForm({ device }: EditDeviceFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const editDeviceForm = editDevice.bind(null, device);
  const [state, dispatch] = useFormState(editDeviceForm, {
    message: null,
    errors: {},
  });

  return (
    <div>
      <button
        className="btn mx-2 bg-white text-wvu-primary-blue hover:bg-wvu-primary-gold"
        onClick={() => dialogRef.current?.showModal()}
      >
        <PencilIcon className="full w-8"></PencilIcon>
      </button>
      <dialog ref={dialogRef} id="editDeviceModal" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-xl font-bold text-wvu-primary-blue">
            Edit {device.name}
          </h3>
          <br></br>
          <form action={dispatch} className="mx-auto max-w-3xl">
            <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-6">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={device.name}
                  className="input bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.name} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="text"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  placeholder={device.description}
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.description} />
              </div>
            </div>

            <Submit />

            {state.message && (
              <p className="my-4 text-sm text-gray-600">{state.message}</p>
            )}
          </form>
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
      Update Device Information
    </button>
  );
}

type ErrorsListProps = { errors?: string[] };

function ErrorsList({ errors }: ErrorsListProps) {
  if (!errors) {
    return null;
  }

  return (
    <div className="mt-2">
      {errors.map((error) => (
        /* If it's possible to have duplicate errors, we need to pick a different key */
        <p key={error} className="text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}
