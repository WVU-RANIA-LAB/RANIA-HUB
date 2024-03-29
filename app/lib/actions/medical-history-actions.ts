'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import prisma from '@/app/lib/prisma';

const MedicalHistoryFormSchema = z.object({
  date: z.coerce.date({ required_error: 'Date is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
});

type MedicalHistoryFormState = {
  message?: string;
  errors?: {
    date?: string[];
    description?: string[];
  };
};

export async function createMedicalHistoryEntry(
  residentId: string,
  editorId: string,
  _previousState: MedicalHistoryFormState,
  formData: FormData,
): Promise<MedicalHistoryFormState> {
  const validatedFields = MedicalHistoryFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message:
        'Invalid/Missing fields. Failed to create medical history entry.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.medicalHistoryEntry.create({
      data: {
        date: data.date,
        description: data.description,
        residentId,
        editorId,
      },
    });
  } catch (e) {
    console.error(e);
    return {
      message: 'Database Error: Failed to create medical history entry.',
    };
  }

  revalidatePath(`/doctor-dashboard/residents/${residentId}/medical-history`);
  return { message: 'Successfully created medical history entry.' };
}

export async function updateMedicalHistoryEntry(
  medicalHistoryEntryId: string,
  residentId: string,
  editorId: string,
  _previousState: MedicalHistoryFormState,
  formData: FormData,
): Promise<MedicalHistoryFormState> {
  const validatedFields = MedicalHistoryFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message:
        'Invalid/Missing fields. Failed to update medical history entry.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.medicalHistoryEntry.update({
      where: { id: medicalHistoryEntryId },
      data: {
        date: data.date,
        description: data.description,
        editorId,
      },
    });
  } catch (e) {
    console.error(e);
    return {
      message: 'Database Error: Failed to update medical history entry.',
    };
  }

  revalidatePath(`/doctor-dashboard/residents/${residentId}/medical-history`);
  return { message: 'Successfully updated medical history entry.' };
}

export async function deleteMedicalHistoryEntry(
  medicalHistoryEntryId: string,
  residentId: string,
) {
  try {
    await prisma.medicalHistoryEntry.delete({
      where: { id: medicalHistoryEntryId },
    });
    revalidatePath(`/doctor-dashboard/residents/${residentId}/medical-history`);
    return { message: 'Deleted medical history entry.' };
  } catch (e) {
    return {
      message: 'Database Error: Failed to delete medical history entry.',
    };
  }
}
