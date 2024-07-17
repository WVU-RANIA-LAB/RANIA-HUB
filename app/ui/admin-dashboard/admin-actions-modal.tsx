'use client';
import { forwardRef, useRef, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Role, User, DeveloperGroup } from '@prisma/client';
import { createUser, updateUser } from '@/app/lib/actions/admin-actions';

/**
 * Props for the AdminActionsModal component.
 */
type AdminActionsModalProps = {
  mode: 'Create' | 'Edit';
  user?: User;
  developerGroups: DeveloperGroup[];
  roleType?: Role;
};

/**
 * Renders a modal for creating or editing a user in the admin dashboard.
 *
 * @component
 * @param {AdminActionsModalProps} props - The component props.
 * @param {React.Ref<HTMLDialogElement>} ref - The ref for the dialog element.
 * @returns {JSX.Element} The rendered component.
 */
const AdminActionsModal = forwardRef<HTMLDialogElement, AdminActionsModalProps>(
  function AdminActionsModal(props, ref) {
    const { mode, user, roleType: initialRoleType, developerGroups } = props;
    const formRef = useRef<HTMLFormElement>(null);
    const userAction = mode === 'Create' ? createUser : updateUser.bind(null, user!.id);
    const [state, dispatch] = useFormState(userAction, {});

    const [roleType, setRoleType] = useState<Role | undefined>(initialRoleType);

    useEffect(() => {
      if (user && user.role) {
        setRoleType(user.role);
      }
    }, [user]);

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRoleType(event.target.value as Role);
    };

    var transformedRoleType = "";
    if (roleType !== undefined) {
      transformedRoleType = roleType.charAt(0).toUpperCase() + roleType.slice(1).toLowerCase();
    }

    const renderRoleSpecificFormFields = () => {
      switch (roleType) {
        case Role.DEVELOPER:
          return (
            <div>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Add To Group:</span>
                </div>
                <select
                  name="group"
                  className="select select-bordered"
                  required
                  defaultValue={user?.group || ''}
                >
                  <option value="" disabled>Select a group</option>
                  {developerGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.year} {group.semester} {group.course} Group {group.group_number}</option>
                  ))}
                </select>
              </label>
            </div>
          );
        default:
          return null;
      }
    };

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
            {mode === 'Create' ? 'Create' : 'Edit'} New {transformedRoleType}
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
                  onChange={handleRoleChange}
                  required
                >
                  <option value={Role.RESIDENT}>Resident</option>
                  <option value={Role.DOCTOR}>Doctor</option>
                  <option value={Role.ADMIN}>Admin</option>
                  <option value={Role.DEVELOPER}>Developer</option>
                </select>
              </label>
            </div>
            {renderRoleSpecificFormFields()}
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

/**
 * Renders a submit button for the admin actions modal.
 *
 * @param mode - The mode of the admin actions modal ('Create' or 'Edit').
 * @returns The submit button component.
 */
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

AdminActionsModal.displayName = 'AdminActionsModal';
export default AdminActionsModal;
