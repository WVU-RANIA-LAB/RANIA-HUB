import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/app/lib/prisma';

const ITEMS_PER_PAGE = 20;

export async function fetchFilteredUsers(
  roleType: 'RESIDENT' | 'DOCTOR' | 'ADMIN',
  query: string,
  currentPage: number,
) {
  noStore();

  try {
    const users = await prisma.user.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      where: {
        AND: [
          { role: roleType },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phoneNumber: { contains: query, mode: 'insensitive' } },
            ],
          },
        ],
      },
      orderBy: { name: 'asc' },
    });
    return users;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch users');
  }
}

export async function fetchUsersPages(
  roleType: 'RESIDENT' | 'DOCTOR' | 'ADMIN',
  query: string,
) {
  noStore();

  try {
    const count = await prisma.user.count({
      where: {
        AND: [
          { role: roleType },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phoneNumber: { contains: query, mode: 'insensitive' } },
            ],
          },
        ],
      },
    });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch total number of users');
  }
}
