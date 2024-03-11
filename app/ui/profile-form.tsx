'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { User } from '@prisma/client';

import { states } from '@/app/lib/constants/us-states';
import { updateProfile } from '@/app/lib/actions/user-actions';

type ProfileFormProps = { user: User };

export default function ProfileForm({ user }: ProfileFormProps) {
  const updateProfileWithEmail = updateProfile.bind(
    null,
    user.email!,
    user.role,
  );
  const [state, dispatch] = useFormState(updateProfileWithEmail, {
    message: null,
    errors: {},
  });

  return (
    <form action={dispatch} className="mx-auto max-w-3xl">
      <div className="mb-12 grid grid-cols-2 gap-x-12 gap-y-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-gray-800">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={user.name ?? ''}
            required
            className="input bg-gray-200 text-gray-800"
          />
          <ErrorsList errors={state.errors.name} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-gray-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={user.email ?? ''}
            disabled
            required
            className="input border-none bg-gray-200 text-gray-800 disabled:bg-gray-200 disabled:text-gray-400"
          />
          <ErrorsList errors={state.errors.email} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone-number" className="mb-1 text-gray-800">
            Phone Number
          </label>
          <input
            id="phone-number"
            name="phoneNumber"
            type="tel"
            defaultValue={user.phoneNumber ?? ''}
            required
            className="input bg-gray-200 text-gray-800"
          />
          <ErrorsList errors={state.errors.phoneNumber} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address-line-1" className="mb-1 text-gray-800">
            Address Line 1
          </label>
          <input
            id="address-line-1"
            name="addressLine1"
            type="text"
            defaultValue={user.address?.addressLine1 ?? ''}
            required
            className="input bg-gray-200 text-gray-800"
          />
          <ErrorsList errors={state.errors.addressLine1} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address-line-2" className="mb-1 text-gray-800">
            Address Line 2
          </label>
          <input
            id="address-line-2"
            name="addressLine2"
            type="text"
            defaultValue={user.address?.addressLine2 ?? ''}
            className="input bg-gray-200 text-gray-800"
          />
          <ErrorsList errors={state.errors.addressLine2} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-1 text-gray-800">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            defaultValue={user.address?.city ?? ''}
            required
            className="input bg-gray-200 text-gray-800"
          />
          <ErrorsList errors={state.errors.city} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="mb-1 text-gray-800">
            State
          </label>
          <select
            id="state"
            name="state"
            defaultValue={user.address?.state ?? ''}
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
          <label htmlFor="zip-code" className="mb-1 text-gray-800">
            Zip Code
          </label>
          <input
            id="zip-code"
            name="zipCode"
            type="text"
            defaultValue={user.address?.zipCode ?? ''}
            required
            className="input bg-gray-200 text-gray-800"
          />
          <ErrorsList errors={state.errors.zipCode} />
        </div>
        {user.role === 'DOCTOR' && (
          <div className="flex flex-col">
            <label htmlFor="specialty" className="mb-1 text-gray-800">
              Specialty
            </label>
            <input
              id="specialty"
              name="specialty"
              type="text"
              defaultValue={user.specialty ?? ''}
              className="input bg-gray-200 text-gray-800"
            />
            <ErrorsList errors={state.errors.specialty} />
          </div>
        )}
      </div>

      <Submit />
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
      Save
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
