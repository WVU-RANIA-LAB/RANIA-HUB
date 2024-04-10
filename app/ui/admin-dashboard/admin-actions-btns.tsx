'use client';
import { useRef } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { User } from '@prisma/client';
import AdminActionsModal from '@/app/ui/admin-dashboard/admin-actions-modal';
import { deleteUser } from '@/app/lib/actions/admin-actions';

type EditUserButtonProps = {
  user: User;
};

export function EditUserButton({ user }: EditUserButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-square btn-sm"
        onClick={() => dialogRef.current?.showModal()}
      >
        <PencilIcon className="h-5" />
      </button>
      <AdminActionsModal user={user} ref={dialogRef} />
    </>
  );
}

type DeleteUserButtonProps = {
  userId: string;
};

export function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const deleteUserWithId = deleteUser.bind(null, userId);

  return (
    <form action={deleteUserWithId}>
      <button className="btn btn-square btn-sm">
        <TrashIcon className="h-5" />
      </button>
    </form>
  );
}
