'use client';
import { useRef } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Role, User, DeveloperGroup, Project } from '@prisma/client';
import AdminActionsModal from '@/app/ui/admin-dashboard/admin-actions-modal';
import AdminProjectActionsModal from './admin-project-action-modal';
import CreateDeveloperGroupModal from './admin-create-developer-group';
import CreateProjectModal from './admin-create-project';
import { deleteUser, deleteProject } from '@/app/lib/actions/admin-actions';

/**
 * Props for the CreateUserButton component.
 */
type CreateUserButtonProps = {
  roleType: Role;
  developerGroups: DeveloperGroup[];
};

/**
 * Renders a button to create a user.
 * @param roleType - The role type of the user.
 * @param developerGroups - The developer groups available.
 * @returns The JSX element representing the create user button.
 */
export function CreateUserButton({ roleType, developerGroups }: CreateUserButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formattedRoleType = roleType[0] + roleType.slice(1).toLowerCase();

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
          onClick={() => dialogRef.current?.showModal()}
        >
          Create {formattedRoleType}
        </button>
      </div>
      <AdminActionsModal mode="Create" roleType={roleType} developerGroups={developerGroups} ref={dialogRef} />
    </>
  );
}

export function CreateDeveloperGroupButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
          onClick={() => dialogRef.current?.showModal()}
        >
          Create Dev Group
        </button>
      </div>
      <CreateDeveloperGroupModal ref={dialogRef} />
    </>
  );
}

/**
 * Props for the EditUserButton component.
 */
type EditUserButtonProps = {
  user: User;
  developerGroups: DeveloperGroup[];
};

/**
 * Renders a button for editing a user.
 * @param user - The user to be edited.
 * @returns The rendered EditUserButton component.
 */
export function EditUserButton({ user, developerGroups }: EditUserButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-square btn-sm hover:bg-wvu-primary-blue hover:text-white"
        onClick={() => dialogRef.current?.showModal()}
      >
        <PencilIcon className="h-5" />
      </button>
      <AdminActionsModal mode="Edit" user={user} ref={dialogRef} developerGroups={developerGroups} />
    </>
  );
}

/**
 * Props for the DeleteUserButton component.
 */
type DeleteUserButtonProps = {
  userId: string;
};

/**
 * Renders a button component for deleting a user.
 * @param {DeleteUserButtonProps} props - The component props.
 * @returns {JSX.Element} The delete user button component.
 */
export function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const deleteUserWithId = deleteUser.bind(null, userId);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-square btn-sm hover:bg-red-600 hover:text-wvu-off-white"
        onClick={() => dialogRef.current?.showModal()}
      >
        <TrashIcon className="h-5" />
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h2 className="text-lg font-bold">
            Are you sure you want to delete this user?
          </h2>
          <div className="modal-action">
            <button className="btn" onClick={() => dialogRef.current?.close()}>
              Cancel
            </button>
            <form action={deleteUserWithId}>
              <button className="btn btn-error" type="submit">
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

type CreateProjectButtonProps = {
  developerGroups: DeveloperGroup[];
};
export function CreateProjectButton({ developerGroups }: CreateProjectButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
          onClick={() => dialogRef.current?.showModal()}
        >
          Create Project
        </button>
      </div>
      <CreateProjectModal ref={dialogRef} developerGroups={developerGroups}/>
    </>
  );
}

/**
 * Props for the EditProjectButton component.
 */
type EditProjectButtonProps = {
  project: Project;
  developerGroups: DeveloperGroup[];
};

/**
 * Renders a button for editing a project.
 * @param project - The project to be edited.
 * @returns The rendered EditProjectButton component.
 */
export function EditProjectButton({ project, developerGroups }: EditProjectButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-square btn-sm hover:bg-wvu-primary-blue hover:text-white"
        onClick={() => dialogRef.current?.showModal()}
      >
        <PencilIcon className="h-5" />
      </button>
      <AdminProjectActionsModal project={project} ref={dialogRef} developerGroups={developerGroups} />
    </>
  );
}

/**
 * Props for the DeleteProjectButton component.
 */
type DeleteProjectButtonProps = {
  projectId: string;
};

/**
 * Renders a button component for deleting a project.
 * @param {DeleteProjectButtonProps} props - The component props.
 * @returns {JSX.Element} The delete project button component.
 */
export function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  const deleteProjectWithId = deleteProject.bind(null, projectId);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-square btn-sm hover:bg-red-600 hover:text-wvu-off-white"
        onClick={() => dialogRef.current?.showModal()}
      >
        <TrashIcon className="h-5" />
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h2 className="text-lg font-bold">
            Are you sure you want to delete this project?
          </h2>
          <div className="modal-action">
            <button className="btn" onClick={() => dialogRef.current?.close()}>
              Cancel
            </button>
            <form action={deleteProjectWithId}>
              <button className="btn btn-error" type="submit">
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
