'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import prisma from '@/app/lib/prisma';
import { Device, User } from '@prisma/client';

const DeviceFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name required' }),
  description: z.string().trim().min(1, { message: 'Description required' }),
});

export type DeviceFormState = {
  message: string | null;
  errors: {
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

export async function deleteDevice(device: Device): Promise<DeviceFormState> {
  const id = device.id;
  try {
    await prisma.device.delete({
      where: { id },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to delete device.', errors: {} };
  }

  revalidatePath(`/resident-dashboard/devices`);
  return { message: 'Successfully deleted device.', errors: {} };
}
