'use client';

import { PowerIcon } from '@heroicons/react/16/solid';
import { powerOff, powerOn } from '@/app/lib/actions/device-actions';
import { Device } from '@prisma/client';

type ChangeStatusButtonProps = { device: Device };

export default function ChangeStatusButton({
  device,
}: ChangeStatusButtonProps) {
  return (
    <div>
      <button
        className="btn mx-2 bg-white text-green-700
         hover:bg-wvu-primary-gold"
        onClick={async () => {
          await powerOn(device);
        }}
      >
        <PowerIcon className="full w-8"></PowerIcon>
      </button>
      <button
        className="btn mx-2 bg-white text-red-700 hover:bg-wvu-primary-gold"
        onClick={async () => {
          await powerOff(device);
        }}
      >
        <PowerIcon className="full w-8"></PowerIcon>
      </button>
    </div>
  );
}
