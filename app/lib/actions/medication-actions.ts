'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import prisma from '@/app/lib/prisma';

const MedicationFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Medication name required' }),
  instructions: z.string().trim(),
  refills: z.coerce.number().int().nonnegative(),
});

type MedicationFormState = {
  message?: string;
  errors?: {
    name?: string[];
    instructions?: string[];
    refills?: string[];
  };
};

export async function createMedication(
  doctorId: string,
  residentId: string,
  _previousState: MedicationFormState,
  formData: FormData,
): Promise<MedicationFormState> {
  const validatedFields = MedicationFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to create medication.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.medication.create({
      data: {
        name: data.name,
        instructions: data.instructions,
        refills: data.refills,
        doctorId,
        residentId,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: 'Database Error: Failed to create medication.' };
  }

  revalidatePath(`/doctor-dashboard/residents/${residentId}/medications`);
  return { message: 'Successfully created medication.' };
}

export async function deleteMedication(
  medicationId: string,
  residentId: string,
) {
  try {
    await prisma.medication.delete({ where: { id: medicationId } });
    revalidatePath(`/doctor-dashboard/residents/${residentId}/medications`);
    return { message: 'Deleted medication.' };
  } catch (e) {
    return { message: 'Database Error: Failed to delete medication.' };
  }
}
