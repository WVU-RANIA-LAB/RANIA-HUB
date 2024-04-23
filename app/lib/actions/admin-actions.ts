'use server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/app/lib/prisma';
import { Role } from '@prisma/client';

const UserFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().trim().min(1, { message: 'Phone number is required' }),
  role: z.nativeEnum(Role),
});

type UserFormState = {
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    role?: string[];
  };
};

/**
 * Creates a new user with the provided form data.
 * @param _previousState - The previous state of the user form.
 * @param formData - The form data containing the user details.
 * @returns A promise that resolves to the updated user form state.
 */
export async function createUser(
  _previousState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const validatedFields = UserFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to create user.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        role: data.role,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: 'Database Error: Failed to create user.' };
  }

  revalidatePath(`/admin-dashboard/residents`);
  revalidatePath(`/admin-dashboard/doctors`);
  revalidatePath(`/admin-dashboard/admins`);

  return { message: 'Successfully created user.' };
}

/**
 * Updates a user's information in the database.
 * @param userId - The ID of the user to update.
 * @param _previousState - The previous state of the user form.
 * @param formData - The form data containing the updated user information.
 * @returns A promise that resolves to the updated user form state.
 */
export async function updateUser(
  userId: string,
  _previousState: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const validatedFields = UserFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to update user.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        role: data.role,
      },
    });
  } catch (e) {
    console.error(e);
    return { message: 'Database Error: Failed to update user.' };
  }

  revalidatePath(`/admin-dashboard/residents`);
  revalidatePath(`/admin-dashboard/doctors`);
  revalidatePath(`/admin-dashboard/admins`);

  return { message: 'Successfully updated user.' };
}

/**
 * Deletes a user from the database.
 *
 * @param userId - The ID of the user to delete.
 * @returns A promise that resolves to an object with a `message` property indicating the result of the operation.
 */
export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    revalidatePath(`/admin-dashboard/residents`);
    revalidatePath(`/admin-dashboard/doctors`);
    revalidatePath(`/admin-dashboard/admins`);
    return { message: 'Deleted user.' };
  } catch (e) {
    return { message: 'Database Error: Failed to delete user.' };
  }
}
