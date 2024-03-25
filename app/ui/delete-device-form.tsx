'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteDevice } from '../lib/actions/device-actions';
import { Device } from '@prisma/client';

type DeleteDeviceFormProps = { device: Device };

export default function deleteDeviceForm({ device }: Device) {
  const deleteDeviceModal = deleteDevice.bind(device);
  return (
    <button
      onClick={() => deleteDevice(device)}
      className="btn mx-2 bg-white text-wvu-primary-blue hover:bg-wvu-primary-gold"
    >
      <TrashIcon className="full w-8"></TrashIcon>
    </button>
  );
}
