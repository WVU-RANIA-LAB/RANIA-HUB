import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/app/lib/prisma';

export async function fetchUserById(id: string) {
  noStore();

  try {
    return prisma.user.findUniqueOrThrow({
      where: { id },
    });
  } catch (e) {
    throw new Error('Failed to fetch user');
  }
}

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