'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import prisma from '@/app/lib/prisma';
import { Device, User } from '@prisma/client';

const DeviceFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name required' }),
  description: z.string().trim().min(1, { message: 'Description required' }),
  ipAddress: z.string().trim().min(1, { message: 'IP Address required' }),
  port: z.string().trim().min(1, { message: 'Port required' }),
});

export type DeviceFormState = {
  message: string | null;
  errors: {
    ipAddress?: string[] | undefined;
    port?: string[] | undefined;
    name?: string[];
    description?: string[];
  };
};

export async function addDevice(
  user: User,
  _prevState: DeviceFormState,
  formData: FormData,
): Promise<DeviceFormState> {
  const validatedFields = DeviceFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to create device.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.device.create({
      data: {
        name: data.name,
        ipAddress: data.ipAddress,
        port: data.port,
        status: 'off',
        description: data.description,
        belongsToId: user.id,
      },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to add device.', errors: {} };
  }

  revalidatePath(`/resident-dashboard/devices`);
  return { message: 'Successfully added device.', errors: {} };
}

export async function editDevice(
  device: Device,
  _prevState: DeviceFormState,
  formData: FormData,
): Promise<DeviceFormState> {
  const validatedFields = DeviceFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to update device.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;
  const id = device.id;

  try {
    await prisma.device.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to update device.', errors: {} };
  }

  revalidatePath(`/resident-dashboard/devices`);
  return { message: 'Successfully updated device.', errors: {} };
}

export async function deleteDevice(device: Device) {
  const id = device.id;
  try {
    await prisma.device.delete({
      where: { id },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to delete device.', errors: {} };
  }

  revalidatePath(`/resident-dashboard/devices`);
}

export async function fetchStatus(ipAddress: string, port: string) {
  const device_url = `http://${ipAddress}:${port}/status`;
  return fetch(device_url, { method: 'GET' })
    .then((response) => response.json())
    .then((data) => data.device_on)
    .catch((error) => console.error('Error:', error));
}

export async function powerOn(device: Device) {
  const device_on = `http://${device.ipAddress}:${device.port}/manual_on`;

  return fetch(device_on, {
    method: 'POST',
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
}

export async function powerOff(device: Device) {
  const device_off = `http://${device.ipAddress}:${device.port}/manual_off`;

  return fetch(device_off, {
    method: 'POST',
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
}
