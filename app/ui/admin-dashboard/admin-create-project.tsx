'use client';
import { forwardRef, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createProject } from '@/app/lib/actions/admin-actions';
import { DeveloperGroup } from '@prisma/client';


type CreateProjectModalProps = {
  developerGroups: DeveloperGroup[];
};

const CreateProjectModal = forwardRef<HTMLDialogElement, CreateProjectModalProps>(
  function CreateProjectModal(props, ref) {
    const { developerGroups } = props;
    const formRef = useRef<HTMLFormElement>(null);
    const projectAction = createProject;
    const [state, dispatch] = useFormState(projectAction, {});

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
          <h2 className="mb-4 text-lg font-bold">Create New Project</h2>
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
                  required
                />
              </label>
            </div>
            <div>
            <label className="form-control">
                <div className="label">
                  <span className="label-text">Description:</span>
                </div>
                <input
                  type="text"
                  name="description"
                  className="input input-bordered"
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Assign To Group:</span>
                </div>
                <select
                  name="group_owner"
                  className="select select-bordered"
                  required
                  defaultValue={"None"}
                >
                  {developerGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.year} {group.semester} {group.course} Group {group.group_number}</option>
                  ))}
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

export default CreateProjectModal;
