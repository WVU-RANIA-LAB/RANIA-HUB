'use client';
import { useRef } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Role, User } from '@prisma/client';
import AdminActionsModal from '@/app/ui/admin-dashboard/admin-actions-modal';
import { deleteUser } from '@/app/lib/actions/admin-actions';

type CreateUserButtonProps = {
  roleType: Role;
};

export function CreateUserButton({ roleType }: CreateUserButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
          onClick={() => dialogRef.current?.showModal()}
        >
          Create
        </button>
      </div>
      <AdminActionsModal mode="Create" roleType={roleType} ref={dialogRef} />
    </>
  );
}

type EditUserButtonProps = {
  user: User;
};

export function EditUserButton({ user }: EditUserButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-square btn-sm hover:bg-wvu-primary-blue hover:text-white"
        onClick={() => dialogRef.current?.showModal()}
      >
        <PencilIcon className="h-5" />
      </button>
      <AdminActionsModal mode="Edit" user={user} ref={dialogRef} />
    </>
  );
}

type DeleteUserButtonProps = {
  userId: string;
};

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
