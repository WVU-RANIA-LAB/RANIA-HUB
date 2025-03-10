'use client';

import { PencilIcon } from '@heroicons/react/24/solid';
import { editContact } from '@/app/lib/actions/resident-actions';
import { Contact } from '@prisma/client';
import { useFormState, useFormStatus } from 'react-dom';
import { states } from '@/app/lib/constants/us-states';

type EditContactFormProps = { contact: Contact };

export default function EditContactForm({ contact }: EditContactFormProps) {
  const editContactForm = editContact.bind(null, contact);
  const [state, dispatch] = useFormState(editContactForm, {
    message: null,
    errors: {},
  });

  return (
    <div>
      <button
        className="btn mx-2 bg-white text-wvu-primary-blue hover:bg-wvu-primary-gold"
        onClick={() =>
          (
            document.getElementById('editContactModal') as HTMLDialogElement
          ).showModal()
        }
      >
        <PencilIcon className="full w-8"></PencilIcon>
      </button>
      <dialog id="editContactModal" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-xl font-bold text-wvu-primary-blue">
            Edit Contact
          </h3>
          <br></br>
          <form action={dispatch} className="mx-auto max-w-3xl">
            <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-6">
            <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="firstName"
                  placeholder="Contact First Name"
                  required
                  className="input bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.firstName} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="lastName"
                  placeholder="Contact Last Name"
                  required
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.lastName} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="relationship"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Relation
                </label>
                <input
                  id="relationship"
                  name="relationship"
                  type="relationship"
                  placeholder="Relation"
                  required
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.relationship} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Contact Email"
                  required
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.email} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="phoneNumber"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="phoneNumber"
                  placeholder="Contact Phone Number"
                  required
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.phoneNumber} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="addressLine1"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Address Line 1
                </label>
                <input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  placeholder="Address Line 1"
                  required
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.addressLine1} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="addressLine2"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Address Line 2
                </label>
                <input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  placeholder="Address Line 2"
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.addressLine2} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="city"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  required
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.city} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="state"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  defaultValue={contact.address?.state ?? ''}
                  required
                  className="select bg-gray-200 text-gray-800"
                >
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <ErrorsList errors={state.errors.state} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="zipCode"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Zip Code
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="Zip Code"
                  required
                  className="input border-none bg-gray-200 text-gray-800"
                />
                <ErrorsList errors={state.errors.zipCode} />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="isEmergency"
                  className="mb-1 text-lg font-semibold text-wvu-primary-blue"
                >
                  Emergency Contact?
                </label>
                <select
                  id="isEmergency"
                  name="isEmergency"
                  className="input border-none bg-gray-200 text-gray-800"
                >
                  <option>Not Selected</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <ErrorsList errors={state.errors.isEmergency} />
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
      Update Contact Information
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
