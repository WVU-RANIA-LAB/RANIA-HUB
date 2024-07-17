// Import necessary modules and Prisma Client instance
'use server'
import prisma from '@/app/lib/prisma';

// Function to update dashboard layout in MongoDB
/**
 * Updates a user's information in the database.
 * @param projectId - The ID of the user to update.
 * @returns A promise that resolves to the updated user form state.
 */
export async function updateDashboardLayout(projectId: string, layoutData: any) {
  try {
    // Check if the layout entry already exists
    const existingLayout = await prisma.dashboardLayout.findUnique({
      where: { projectId },
    });

    if (existingLayout) {
      // Update the existing layout entry
      await prisma.dashboardLayout.update({
        where: { projectId },
        data: { layout: layoutData },
      });
    } else {
      // Create a new layout entry if it doesn't exist
      await prisma.dashboardLayout.create({
        data: { projectId, layout: layoutData },
      });
    }

    return { message: 'Successfully updated dashboard layout.' };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update dashboard layout.');
  }
}

// Function to fetch dashboard layout from MongoDB
export async function fetchDashboardLayout(projectId: string) {
    try {
      const layout = await prisma.dashboardLayout.findUnique({
        where: { projectId },
      });
  
      return layout?.layout || null;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch dashboard layout.');
    }
  }
  