'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteDevice } from '@/app/lib/actions/device-actions';
import { Device } from '@prisma/client';

type DeleteDeviceFormProps = { device: Device };

export default function deleteDeviceForm({ device }: DeleteDeviceFormProps) {
  const deleteDeviceForm = deleteDevice.bind(device);
  return (
    <div>
      <button
        className="btn mx-2 bg-white text-wvu-primary-blue hover:bg-wvu-primary-gold"
        onClick={() => {
          if (
            window.confirm(`Are you sure you want to delete ${device.name}?`)
          ) {
            deleteDeviceForm(device);
          }
        }}
      >
        <TrashIcon className="full w-8"></TrashIcon>
      </button>
    </div>
  );
}
