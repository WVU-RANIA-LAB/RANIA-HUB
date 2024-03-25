'use client';

import { PencilIcon } from '@heroicons/react/24/solid';
import { editDevice } from '../lib/actions/device-actions';
import { Device } from '@prisma/client';
import { useFormState, useFormStatus } from 'react-dom';

type EditDeviceFormProps = { device: Device };

export default function editDeviceForm({ device }: EditDeviceFormProps) {
  const editDeviceModal = editDevice.bind(device);
  const [state, dispatch] = useFormState(editDeviceModal, {
    message: null,
    errors: {},
  });

  return (
    <form action={dispatch} className="mx-auto max-w-3xl">
      <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-gray-800">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Device Name"
            required
            className="input bg-gray-200 text-gray-800"
          />
          <ErrorsList errors={state.errors.name} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="text" className="mb-1 text-gray-800">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="description"
            placeholder="Description"
            required
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
      Update Device
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
