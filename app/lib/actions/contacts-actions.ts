'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import prisma from '@/app/lib/prisma';
import { Contact, User } from '@prisma/client';
import { states } from '@/app/lib/constants/us-states';

const ContactFormSchema = z.object({
  firstName: z.string().trim().min(1, { message: 'First Name required' }),
  lastName: z.string().trim().min(1, { message: 'Last Name required' }),
  relationship: z.string().trim().min(1, { message: 'Relationship required' }),
  email: z.string().trim().min(1, { message: 'Email required' }),
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
  isEmergency: z.string(),
});

export type ContactFormState = {
  message: string | null;
  errors: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phoneNumber?: string[];
    addressLine1?: string[];
    addressLine2?: string[];
    city?: string[];
    state?: string[];
    zipCode?: string[];
    relationship?: string[];
    isEmergency?: string[];
  };
};

export async function addContact(
  user: User,
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to create contact.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.contact.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: {
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
        },
        relationship: data.relationship,
        isEmergency: Boolean(data.isEmergency),
        belongsToId: user.id,
      },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to add contact.', errors: {} };
  }

  revalidatePath(`/resident-dashboard/contacts`);
  return { message: 'Successfully added contact.', errors: {} };
}

export async function editContact(
  contact: Contact,
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to update contact.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;
  const id = contact.id;

  try {
    await prisma.contact.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: {
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
        },
        relationship: data.relationship,
        isEmergency: Boolean(data.isEmergency),
      },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to update device.', errors: {} };
  }

  revalidatePath(`/resident-dashboard/devices`);
  return { message: 'Successfully updated device.', errors: {} };
}

export async function deleteContact(
  contact: Contact,
): Promise<ContactFormState> {
  const id = contact.id;
  try {
    await prisma.contact.delete({
      where: { id },
    });
  } catch (e) {
    return { message: 'Database Error: Failed to delete contact.', errors: {} };
  }

  revalidatePath(`/resident-dashboard/contacts`);
  return { message: 'Successfully deleted contact.', errors: {} };
}
