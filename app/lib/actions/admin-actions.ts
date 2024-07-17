'use server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/app/lib/prisma';
import { Role } from '@prisma/client';

// Define the schema for user form data validation
const UserFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().trim().min(1, { message: 'Phone number is required' }),
  role: z.nativeEnum(Role),
});

const ProjectFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  group_owner: z.string().trim().min(1, { message: 'Group assignment is required' }),
});

// Define specific schemas for each role
const ResidentSchema = UserFormSchema.extend({
  // Additional fields for Resident
});

const AdminSchema = UserFormSchema.extend({
  // Additional fields for Admin
});

const DoctorSchema = UserFormSchema.extend({
  // Additional fields for Doctor
});

const DeveloperSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().trim().min(1, { message: 'Phone number is required' }),
  role: z.nativeEnum(Role),
  group: z.string().trim().min(1, { message: 'Group number is required' }),
});

const DeveloperGroupSchema = z.object({
  semester: z.string().trim().min(1, { message: 'Semester is required' }),
  year: z.string().trim().min(1, { message: 'Year is required' }),
  course: z.string().trim().min(1, { message: 'Course is required' }),
  group_number: z.string().trim().min(1, { message: 'Group number is required' }),
});

type DeveloperGroupFormState = {
  message?: string;
  errors?: {
    semester?: string[];
    year?: string[];
    course?: string[];
    group_number: string[];
  };
};

type UserFormState = {
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    role?: string[];
  };
};

type ProjectFormState = {
  message?: string;
  errors?: {
    name?: string[];
    description?: string[];
    group_owner?: string[];
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
  const role = formData.get('role') as Role;
  //console.log(formData)

  // Validate form data based on the role
  let validatedFields;
  switch(role){
    case 'DEVELOPER': validatedFields = DeveloperSchema.safeParse(Object.fromEntries(formData.entries()));
    break;
    default:   validatedFields = UserFormSchema.safeParse(Object.fromEntries(formData.entries()));

    }

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to create user.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  let data_to_store;
  switch(role){
    case 'DEVELOPER': {
      data_to_store = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        role: data.role,
        group: data.group
      };
      //addDeveloperToDeveloperGroup(data.group, data.email)
    };
    break;
    default: {
        data_to_store = {
          name: data.name,
          email: data.email,
          phoneNumber: data.phone,
          role: data.role,
        }
      }
    }

  try {
    // Create the user and get the created user's ID
    const createdUser = await prisma.user.create({
      data: data_to_store,
    });

    // If the role is DEVELOPER, add the user to the developer group
    if (role === 'DEVELOPER') {
      await addDeveloperToDeveloperGroup(data.group, createdUser.id);
    }
    revalidatePaths();
    return { message: 'Successfully created user.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to create user.' };
  }
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
  const role = formData.get('role') as Role;
  //console.log(formData)

  // Validate form data based on the role
  let validatedFields;
  switch(role){
    case 'DEVELOPER': validatedFields = DeveloperSchema.safeParse(Object.fromEntries(formData.entries()));
    break;
    default:   validatedFields = UserFormSchema.safeParse(Object.fromEntries(formData.entries()));

    }

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to create user.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  let data_to_update;
  switch(role){
    case 'DEVELOPER': {
      data_to_update = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        role: data.role,
        group: data.group
      };

      const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true, group: true },
      });

      if (!currentUser) {
        return { message: 'User not found.' };
      }

      // Determine if the role is DEVELOPER and if the group has changed
      const isDeveloper = currentUser.role === Role.DEVELOPER;
      const groupChanged = isDeveloper && data.group !== currentUser.group;

      if (isDeveloper && groupChanged) {
        // Remove user from the old group
        if (currentUser.group) {
          await removeDeveloperFromDeveloperGroup(currentUser.group, userId);
        }

        // Add user to the new group
        await addDeveloperToDeveloperGroup(data.group, userId);
      }
    };
    break;
    default: {
        data_to_update = {
          name: data.name,
          email: data.email,
          phoneNumber: data.phone,
          role: data.role,
        }
      }
    }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: data_to_update,
    });
    revalidatePaths();
    return { message: 'Successfully updated user.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to update user.' };
  }
}

/**
 * Deletes a user from the database.
 * @param userId - The ID of the user to delete.
 * @returns A promise that resolves to an object with a `message` property indicating the result of the operation.
 */
export async function deleteUser(userId: string): Promise<{ message: string }> {
  try {
    // Retrieve the user to get their developer group
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { group: true, role: true },
    });

    if (!user) {
      return { message: 'User not found.' };
    }

    if (user.role === 'DEVELOPER' && user.group) {
      // Retrieve the developer group
      const developerGroup = await prisma.developerGroup.findUnique({
        where: { id: user.group },
      });

      if (developerGroup) {
        // Remove the user ID from the array of developers
        const updatedDevelopers = developerGroup.developers.filter(devId => devId !== userId);

        // Update the developer group with the new array of developers
        await prisma.developerGroup.update({
          where: { id: user.group },
          data: { developers: updatedDevelopers },
        });
      }
    }

    // Delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePaths();
    return { message: 'Deleted user.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to delete user.' };
  }
}

/**
 * Creates a new developer group with the provided form data.
 * @param _previousState - The previous state of the developer group form.
 * @param formData - The form data containing the developer group details.
 * @returns A promise that resolves to the updated developer group form state.
 */
export async function createDeveloperGroup(
  _previousState: DeveloperGroupFormState,
  formData: FormData,
): Promise<DeveloperGroupFormState> {
  const formDataEntries = Object.fromEntries(formData.entries());
  console.log('Form Data Entries:', formDataEntries);

  const validatedFields = DeveloperGroupSchema.safeParse(formDataEntries);
  console.log('Validation Result:', validatedFields);

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to create developer group.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.developerGroup.create({
      data: {
        semester: data.semester,
        year: data.year,
        course: data.course,
        group_number: data.group_number,
      },
    });
  } catch (e) {
    console.error('Database Error:', e);
    return { message: 'Database Error: Failed to create developer group.' };
  }

  revalidatePath(`/admin-dashboard/developer-groups`);

  return { message: 'Successfully created developer group.' };
}

async function addDeveloperToDeveloperGroup(groupId: string, userId: string) {
  // Retrieve the developerGroup document
  let developerGroup = await prisma.developerGroup.findUnique({
    where: { id: groupId },
  });

  // Check if the developerGroup exists
  if (!developerGroup) {
    throw new Error(`Developer group with id ${groupId} not found`);
  }

  // Add the userId to the array of developers
  const updatedDevelopers = [...developerGroup.developers, userId];

  // Update the developerGroup document with the new array of developers
  await prisma.developerGroup.update({
    where: { id: groupId },
    data: { developers: updatedDevelopers },
  });
}

async function removeDeveloperFromDeveloperGroup(groupId: string, userId: string) {
  // Retrieve the developerGroup document
  let developerGroup = await prisma.developerGroup.findUnique({
    where: { id: groupId },
  });

  // Check if the developerGroup exists
  if (!developerGroup) {
    throw new Error(`Developer group with id ${groupId} not found`);
  }

  // Remove the userId from the array of developers
  const updatedDevelopers = developerGroup.developers.filter(devId => devId !== userId);

  // Update the developerGroup document with the new array of developers
  await prisma.developerGroup.update({
    where: { id: groupId },
    data: { developers: updatedDevelopers },
  });
}

/**
 * Creates a new project with the provided form data.
 * @param _previousState - The previous state of the project form.
 * @param formData - The form data containing the project details.
 * @returns A promise that resolves to the updated project form state.
 */
export async function createProject(
  _previousState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const formDataEntries = Object.fromEntries(formData.entries());
  console.log('Form Data Entries:', formDataEntries);

  const validatedFields = ProjectFormSchema.safeParse(formDataEntries);
  console.log('Validation Result:', validatedFields);

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to create project.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        group_owner: data.group_owner
      },
    });
  } catch (e) {
    console.error('Database Error:', e);
    return { message: 'Database Error: Failed to create project.' };
  }

  revalidatePath(`/admin-dashboard/projects`);

  return { message: 'Successfully created project.' };
}

/**
 * Updates a project's information in the database.
 * @param projectId - The ID of the project to update.
 * @param _previousState - The previous state of the project form.
 * @param formData - The form data containing the updated project information.
 * @returns A promise that resolves to the updated project form state.
 */
export async function updateProject(
  projectId: string,
  _previousState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const formDataEntries = Object.fromEntries(formData.entries());
  console.log('Form Data Entries:', formDataEntries);

  const validatedFields = ProjectFormSchema.safeParse(formDataEntries);
  console.log('Validation Result:', validatedFields);

  if (!validatedFields.success) {
    return {
      message: 'Invalid/Missing fields. Failed to update project.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.project.update({
      where: { id: projectId },
      data: {
        name: data.name,
        description: data.description,
        group_owner: data.group_owner
      },
    });
  } catch (e) {
    console.error('Database Error:', e);
    return { message: 'Database Error: Failed to update project.' };
  }

  revalidatePath(`/admin-dashboard/projects`);

  return { message: 'Successfully updated project.' };
}

/**
 * Deletes a project from the database.
 * @param projectId - The ID of the project to delete.
 * @returns A promise that resolves to an object with a `message` property indicating the result of the operation.
 */
export async function deleteProject(projectId: string): Promise<{ message: string }> {
  try {
    // Delete the project
    await prisma.project.delete({
      where: { id: projectId },
    });

    revalidatePath(`/admin-dashboard/projects`);
    return { message: 'Deleted project.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to delete project.' };
  }
}

/**
 * Helper function to revalidate paths.
 */
function revalidatePaths() {
  revalidatePath(`/admin-dashboard/residents`);
  revalidatePath(`/admin-dashboard/doctors`);
  revalidatePath(`/admin-dashboard/admins`);
  revalidatePath(`/admin-dashboard/developers`);
  revalidatePath(`/admin-dashboard/projects`);
}
