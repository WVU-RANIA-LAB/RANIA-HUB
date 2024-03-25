'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteDevice } from '../lib/actions/device-actions';

export default function DeleteDevice() {
  return (
    <button
      onClick={() => deleteDevice()}
      className="btn mx-2 bg-white text-wvu-primary-blue hover:bg-wvu-primary-gold"
    >
      <TrashIcon className="full w-8"></TrashIcon>
    </button>
  );
}
