'use client';

import { addDevice } from '../lib/actions/device-actions';

export default function AddDevice() {
  return (
    <button
      onClick={() => addDevice()}
      className="btn float-right rounded-md border-2 bg-white text-xl font-semibold text-wvu-primary-blue hover:bg-wvu-primary-gold"
    >
      Add Device
    </button>
  );
}
