import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/app/lib/prisma';
import { Role } from '@prisma/client';

/**
 * The number of items to display per page.
 */
const ITEMS_PER_PAGE = 20;

/**
 * Fetches filtered users based on role, query, and current page.
 * @param roleType - The role type to filter users by.
 * @param query - The search query to filter users by.
 * @param currentPage - The current page number.
 * @returns A promise that resolves to an array of filtered users.
 * @throws An error if there is a database error or if fetching users fails.
 */
export async function fetchFilteredUsers(
  roleType: Role,
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

/**
 * Fetches the total number of pages for users based on the specified role and query.
 * @param roleType - The role type of the users to fetch.
 * @param query - The query string to search for in user names, emails, and phone numbers.
 * @returns The total number of pages.
 * @throws Error if there is a database error while fetching the total number of users.
 */
export async function fetchUsersPages(roleType: Role, query: string) {
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
