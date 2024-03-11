'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Role } from '@prisma/client';

import prisma from '@/app/lib/prisma';
import { states } from '@/app/lib/constants/us-states';

const ProfileFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name required' }),
  email: z.string().trim().email({ message: 'Invalid email address' }),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/, {
      message: 'Invalid phone number',
    }),
  addressLine1: z
    .string()
    .trim()
    .min(1, { message: 'Address Line 1 required' }),
  addressLine2: z.string().trim(),
  city: z.string().trim().min(1, { message: 'City required' }),
  state: z.enum(states),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid zip code' }),
  specialty: z.string().trim().optional(),
});

export type ProfileFormState = {
  message: string | null;
  errors: {
    name?: string[];
    email?: string[];
    phoneNumber?: string[];
    addressLine1?: string[];
    addressLine2?: string[];
    city?: string[];
    state?: string[];
    zipCode?: string[];
    specialty?: string[];
  };
};

export async function updateProfile(
  email: string,
  role: Role,
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const validatedFields = ProfileFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to update profile.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.user.update({
      where: { email },
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: {
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
        },
        specialty: data.specialty,
      },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to Update Invoice.', errors: {} };
  }

  revalidatePath(`/${role.toLowerCase()}-dashboard/profile`);
  return { message: 'Successfully updated profile.', errors: {} };
}
