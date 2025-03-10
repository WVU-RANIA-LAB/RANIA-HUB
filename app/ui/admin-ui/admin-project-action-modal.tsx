'use client';
import { forwardRef, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DeveloperGroup, Project } from '@prisma/client';
import { updateProject } from '@/app/lib/actions/admin-actions';

/**
 * Props for the AdminProjectActionsModal component.
 */
type AdminProjectActionsModalProps = {
  project: Project;
  developerGroups: DeveloperGroup[];
};

/**
 * Renders a modal for editing project information in the admin dashboard.
 *
 * @component
 * @param {AdminProjectActionsModalProps} props - The component props.
 * @param {React.Ref<HTMLDialogElement>} ref - The ref for the dialog element.
 * @returns {JSX.Element} The rendered component.
 */
const AdminProjectActionsModal = forwardRef<HTMLDialogElement, AdminProjectActionsModalProps>(
  function AdminProjectActionsModal(props, ref) {
    const { project, developerGroups } = props;
    const formRef = useRef<HTMLFormElement>(null);
    const [state, dispatch] = useFormState(updateProject.bind(null, project.id), {});

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
            Edit Project
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
                  defaultValue={project.name}
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
                  defaultValue={project.description}
                  required
                />
              </label>
            </div>
            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Group Owner:</span>
                </div>
                <select
                  name="group_owner"
                  className="select select-bordered"
                  required
                  defaultValue={project.group_owner}
                >
                  <option value="" disabled>Select a group</option>
                  {developerGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.year} {group.semester} {group.course} Group {group.group_number}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <Submit />
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

/**
 * Renders a submit button for the admin project actions modal.
 *
 * @returns The submit button component.
 */
function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="btn mt-4 w-full hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
    >
      {pending && <span className="loading loading-spinner" />}
      Update
    </button>
  );
}

AdminProjectActionsModal.displayName = 'AdminProjectActionsModal';
export default AdminProjectActionsModal;
