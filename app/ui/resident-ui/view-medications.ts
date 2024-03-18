'use client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to fetch all medications
export async function getAllMedications() {
  try {
    const medications = await prisma.medication.findMany();
    return medications;
  } catch (error) {
    console.error('Error fetching medications:', error);
    throw new Error('Failed to fetch medications');
  }
}