'use client';
import { forwardRef, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createDeveloperGroup } from '@/app/lib/actions/admin-actions';

type CreateDeveloperGroupModalProps = {};

const CreateDeveloperGroupModal = forwardRef<HTMLDialogElement, CreateDeveloperGroupModalProps>(
  function CreateDeveloperGroupModal(props, ref) {
    const formRef = useRef<HTMLFormElement>(null);
    const groupAction = createDeveloperGroup;
    const [state, dispatch] = useFormState(groupAction, {});

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
          <h2 className="mb-4 text-lg font-bold">Create New Developer Group</h2>
          <form
            ref={formRef}
            action={dispatch}
            className="flex flex-col gap-y-4"
          >
            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Semester:</span>
                </div>
                <select
                  name="semester"
                  className="select select-bordered"
                  required
                >
                  <option value="Spring">Spring</option>
                  <option value="Fall">Fall</option>
                </select>
              </label>
            </div>

            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Year:</span>
                </div>
                <select
                  name="year"
                  className="select select-bordered"
                  required
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </label>
            </div>

            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Group Number:</span>
                </div>
                <input
                  type="text"
                  name="group_number"
                  className="input input-bordered"
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Course:</span>
                </div>
                <select
                  name="course"
                  className="select select-bordered"
                  required
                >
                  <option value="CSEE480">CSEE480</option>
                  <option value="CSEE481">CSEE481</option>
                </select>
              </label>
            </div>
            <div>
              <Submit />
              {state.message && <span className="text-red-500">{state.message}</span>}
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

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="btn mt-4 w-full hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
    >
      {pending && <span className="loading loading-spinner" />}
      Create
    </button>
  );
}

export default CreateDeveloperGroupModal;
