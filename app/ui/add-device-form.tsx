'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { User } from '@prisma/client';
import { addDevice } from '@/app/lib/actions/device-actions';

type AddDeviceFormProps = { user: User };

export default function AddDeviceForm({ user }: AddDeviceFormProps) {
  const addDeviceForm = addDevice.bind(null, user);
  const [state, dispatch] = useFormState(addDeviceForm, {
    message: null,
    errors: {},
  });

  return (
    <div className="inline">
      <button
        className="btn float-right rounded-md border-2 bg-white text-xl font-semibold text-wvu-primary-blue hover:bg-wvu-primary-gold"
        onClick={() =>
          (
            document.getElementById('addDeviceModal') as HTMLDialogElement
          ).showModal()
        }
      >
        Add Device
      </button>
      <dialog id="addDeviceModal" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 text-gray-400">
              ✕
            </button>
          </form>
          <h3 className="text-xl font-bold text-wvu-primary-blue">
            Add New Device
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
                  placeholder="Device Name"
                  required
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
                  type="description"
                  placeholder="Description"
                  required
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.description} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="text"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  IP Address
                </label>
                <input
                  id="ipAddress"
                  name="ipAddress"
                  type="ipAddress"
                  placeholder="0.0.0.0"
                  required
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.ipAddress} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="text"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Port
                </label>
                <input
                  id="port"
                  name="port"
                  type="port"
                  placeholder="3000"
                  required
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.port} />
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
      Add Device
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
