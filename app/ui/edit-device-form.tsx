'use client';

import { PencilIcon } from '@heroicons/react/24/solid';
import { editDevice } from '../lib/actions/device-actions';

export default function EditDevice() {
  return (
    <button
      onClick={() => editDevice()}
      className="btn mx-2 bg-white text-wvu-primary-blue hover:bg-wvu-primary-gold"
    >
      <PencilIcon className="full w-8"></PencilIcon>
    </button>
  );
}
