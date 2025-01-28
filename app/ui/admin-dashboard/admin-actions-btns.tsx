'use client';
import { useRef } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Role, User, DeveloperGroup, Project } from '@prisma/client';
import AdminActionsModal from '@/app/ui/admin-dashboard/admin-actions-modal';
import AdminProjectActionsModal from './admin-project-action-modal';
import CreateDeveloperGroupModal from './admin-create-developer-group';
import CreateProjectModal from './admin-create-project';
import CreateRegisteredDeviceModal from './admin-create-device';
import { deleteUser, deleteProject, deleteDevice, createRegisteredHub, deleteHub, deleteDevGroup } from '@/app/lib/actions/admin-actions';

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
 * Props for the DeleteDevGroupButton component.
 */
type DeleteDevGroupButtonProps = {
  devGroupId: string;
};

/**
 * Renders a button component for deleting a developer group.
 * @param {DeleteDevGroupButtonProps} props - The component props.
 * @returns {JSX.Element} The delete dev group button component.
 */

export function DeleteDeveloperGroupButton({ devGroupId }: DeleteDevGroupButtonProps) {
  const deleteDevGroupWithId = deleteDevGroup.bind(null, devGroupId);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-square bg-transparent btn-sm border-red-600 text-red-600 hover:bg-red-600 hover:text-wvu-off-white"
        onClick={() => dialogRef.current?.showModal()}
      >
        <TrashIcon className="h-5" />
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h2 className="text-lg font-bold">
            Are you sure you want to delete this developer group?
          </h2>
          <div className="modal-action">
            <button className="btn" onClick={() => dialogRef.current?.close()}>
              Cancel
            </button>
            <form action={deleteDevGroupWithId}>
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


/**
 * Props for the CreateUserButton component.
 */
type CreateRegisteredDeviceButtonProps = {
  projects: { id: string; name: string }[]; // Add projects as a prop
};

/**
 * Renders a button to create a registered device.
 * @returns The JSX element representing the create registered device button.
 */
export function CreateRegisteredDeviceButton({projects}: CreateRegisteredDeviceButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
          onClick={() => dialogRef.current?.showModal()}
        >
          Create Device
        </button>
      </div>
      {/* Only pass developerGroups to the modal if needed */}
      <CreateRegisteredDeviceModal ref={dialogRef} projects={projects}/>
    </>
  );
}


/**
 * Props for the DeleteDeviceButton component.
 */
type DeleteDeviceButtonProps = {
  deviceId: string;
};


/**
 * Renders a button component for deleting a device.
 * @param {DeleteDeviceButtonProps} props - The component props.
 * @returns {JSX.Element} The delete project button component.
 */
export function DeleteDeviceButton({ deviceId }: DeleteDeviceButtonProps) {
  const deleteDeviceWithId = deleteDevice.bind(null, deviceId);
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
            Are you sure you want to delete this device?
          </h2>
          <div className="modal-action">
            <button className="btn" onClick={() => dialogRef.current?.close()}>
              Cancel
            </button>
            <form action={deleteDeviceWithId}>
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


/**
 * Renders a button to create a user.
 * @returns The JSX element representing the create hub button.
 */
export function CreateHubButton() {
  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
          onClick={() => createRegisteredHub()}
        >
          Create Hub
        </button>
      </div>
    </>
  );
}


/**
 * Props for the DeleteHubButton component.
 */
type DeleteHubButtonProps = {
  hubId: string;
};

/**
 * Renders a button component for deleting a hub.
 * @param {DeleteHubButtonProps} props - The component props.
 * @returns {JSX.Element} The delete hub button component.
 */
export function DeleteHubButton({ hubId }: DeleteHubButtonProps) {
  const deleteHubWithId = deleteHub.bind(null, hubId);
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
            Are you sure you want to delete this hub?
          </h2>
          <div className="modal-action">
            <button className="btn" onClick={() => dialogRef.current?.close()}>
              Cancel
            </button>
            <form action={deleteHubWithId}>
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
        className="btn btn-square bg-transparent border-wvu-blue text-wvu-blue btn-sm hover:bg-wvu-primary-blue hover:text-white hover:bg-wvu-primary-gold"
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
        className="btn btn-square bg-transparent btn-sm border-red-600 text-red-600 hover:bg-red-600 hover:text-wvu-off-white"
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
