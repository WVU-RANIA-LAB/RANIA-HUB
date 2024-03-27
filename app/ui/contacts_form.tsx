import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { User } from '@prisma/client';
import { states } from '@/app/lib/constants/us-states';
import { updateContact } from '@/app/lib/actions/contact-actions';

type AddContactFormProps = { user: User; onClose: () => void };

export default function AddContactForm({ user, onClose }: AddContactFormProps) {
  const addContactWithEmail = updateContact.bind(null, user.email!, user.role);
  const [state, dispatch] = useFormState(addContactWithEmail, {
    message: null,
    errors: {},
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <form onSubmit={dispatch} className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Add New Contact</h2>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="mb-1 text-gray-800">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="input bg-gray-200 text-gray-800"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="mb-1 text-gray-800">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="input bg-gray-200 text-gray-800"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-gray-800">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input bg-gray-200 text-gray-800"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="mb-1 text-gray-800">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="XXX-XXX-XXXX"
                required
                className="input bg-gray-200 text-gray-800"
              />
            </div>
            {/* Other contact fields can be added similarly */}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn rounded-md border-none bg-wvu-blue text-lg font-semibold text-white hover:bg-wvu-primary-blue"
              disabled={state.pending}
            >
              {state.pending && <span className="loading loading-spinner" />}
              Save
            </button>
          </div>

          {state.message && <p className="text-sm text-gray-600">{state.message}</p>}
        </form>
      </div>
    </div>
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
        <p key={error} className="text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}
