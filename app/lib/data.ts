import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/app/lib/prisma';

export async function fetchUserByEmail(email: string) {
  noStore();

  try {
    return prisma.user.findUniqueOrThrow({
      where: { email },
    });
  } catch (e) {
    throw new Error('Failed to fetch user');
  }
}

export async function fetchMedicationsByUser(userId: string){
  noStore();

  try{
    const medications = await prisma.medication.findMany({
      where: {
        OR: [
          { residentId: { equals: userId } },
          { doctorId: { equals: userId } }
        ]
      }
    });

    return medications;

  } catch (e) {
    throw new Error('Failed to fetch medications');
  }
}
