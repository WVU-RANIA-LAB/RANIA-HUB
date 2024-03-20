import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/app/lib/prisma';

const ITEMS_PER_PAGE = 2; /* Intentionally low for testing */

export async function fetchFilteredResidents(
  residentIds: string[],
  query: string,
  currentPage: number,
) {
  noStore();

  try {
    const residents = await prisma.user.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      where: {
        AND: [
          { id: { in: residentIds } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
      },
      orderBy: { name: 'asc' },
    });
    return residents;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch residents');
  }
}
