'use client';
import { forwardRef, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { User } from '@prisma/client';
import { createUser, updateUser } from '@/app/lib/actions/admin-actions';
import FieldErrors from '@/app/ui/field-errors';

type AdminActionsModalProps = {
  mode: 'Create' | 'Edit';
  user?: User;
  roleType?: 'RESIDENT' | 'DOCTOR' | 'ADMIN';
};

const AdminActionsModal = forwardRef<HTMLDialogElement, AdminActionsModalProps>(
  function AdminActionsModal(props, ref) {
    const { mode, user, roleType } = props;
    const formRef = useRef<HTMLFormElement>(null);
    const userAction =
      mode === 'Create' ? createUser : updateUser.bind(null, user!.id);
    const [state, dispatch] = useFormState(userAction, {});

    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-circle btn-ghost btn-sm absolute right-6 top-6"
              onClick={() => {
                formRef.current?.reset();
              }}
            >
              <XMarkIcon className="h-6" />
            </button>
          </form>
          <h2 className="mb-4 text-lg font-bold">
            {mode === 'Create' ? 'Create' : 'Edit'} User
          </h2>
          <form
            ref={formRef}
            action={dispatch}
            className="flex flex-col gap-y-4"
          >
            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Name:</span>
                </div>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered"
                  defaultValue={user?.name || ''}
                  required
                />
              </label>
              <FieldErrors errors={state.errors?.name} />
            </div>
            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Email:</span>
                </div>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered"
                  defaultValue={user?.email || ''}
                  required
                />
              </label>
              <FieldErrors errors={state.errors?.email} />
            </div>
            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Phone Number:</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  className="input input-bordered"
                  defaultValue={user?.phoneNumber || ''}
                  required
                />
              </label>
              <FieldErrors errors={state.errors?.phone} />
            </div>
            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Role:</span>
                </div>
                <select
                  name="role"
                  className="select select-bordered"
                  defaultValue={user?.role || roleType}
                  required
                >
                  <option value="RESIDENT">Resident</option>
                  <option value="DOCTOR">Doctor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </label>
              <FieldErrors errors={state.errors?.role} />
            </div>
            <div>
              <Submit mode={mode} />
              {state.message && <span>{state.message}</span>}
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => formRef.current?.reset()} />
        </form>
      </dialog>
    );
  },
);

function Submit({ mode }: { mode: 'Create' | 'Edit' }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="btn mt-4 w-full hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
    >
      {pending && <span className="loading loading-spinner" />}
      {mode === 'Create' ? 'Create' : 'Update'}
    </button>
  );
}

export default AdminActionsModal;
