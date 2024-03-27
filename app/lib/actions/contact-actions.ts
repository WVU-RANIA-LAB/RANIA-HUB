import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Role } from '@prisma/client';

import prisma from '@/app/lib/prisma';
import { states } from '@/app/lib/constants/us-states';


const ContactFormSchema = z.object({
    firstName: z.string().trim().min(1, { message: 'First name required' }),
    lastName: z.string().trim().min(1, { message: 'Last name required' }),
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
      relationship: z.string().trim().optional(),
      isEmergency: z.boolean(),
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

  export async function updateContact(
    contactId: string,
    role: Role,
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
  
    try {
      await prisma.contact.update({
        where: { id: contactId },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: {
            update: {
              addressLine1: data.addressLine1,
              addressLine2: data.addressLine2,
              city: data.city,
              state: data.state,
              zipCode: data.zipCode,
            },
          },
          relationship: data.relationship,
          isEmergency: data.isEmergency,
        },
      });
    } catch (e) {
      return { message: 'Database Error: Failed to update contact.', errors: {} };
    }
  
    revalidatePath(`/${role.toLowerCase()}-dashboard/profile`);
  return { message: 'Successfully updated profile.', errors: {} };
  }
  


