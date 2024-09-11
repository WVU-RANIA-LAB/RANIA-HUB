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
/**
 * Fetches developer groups from the database.
 * @returns A promise that resolves to an array of developer groups.
 * @throws An error if there is a database error or if fetching groups fails.
 */
export async function fetchDeveloperGroups() {
  noStore();

  try {
    const groups = await prisma.developerGroup.findMany({
      orderBy: [{ semester: 'asc' }, { year: 'asc' }, { group_number: 'asc' }],
    });
    return groups;
  } catch (e: any) {
    console.error('Database Error:', e.message);
    console.error('Stack Trace:', e.stack);
    console.error('Error Details:', e);
    throw new Error('Failed to fetch developer groups');
  }
}

/**
 * Fetches project information from the database.
 * @returns A promise that resolves to an array of projects.
 * @throws An error if there is a database error or if fetching projects fails.
 */
export async function fetchProjects() {
  noStore();

  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ name: 'asc' }]
    });
    return projects;
  } catch (e: any) {
    console.error('Database Error:', e.message);
    console.error('Stack Trace:', e.stack);
    console.error('Error Details:', e);
    throw new Error('Failed to fetch projects');
  }
}

/**
 * Fetches filtered registered devices based on deviceId, name, registeredTo, and current page.
 * @returns A promise that resolves to an array of filtered registered devices.
 * @throws An error if there is a database error or if fetching devices fails.
 */
export async function fetchDevices() {
  noStore();

  try {
    const projects = await prisma.registeredDevice.findMany({
      orderBy: [{ name: 'asc' }]
    });
    return projects;
  } catch (e: any) {
    console.error('Database Error:', e.message);
    console.error('Stack Trace:', e.stack);
    console.error('Error Details:', e);
    throw new Error('Failed to fetch projects');
  }
}

export async function fetchHubs() {
  noStore();

  try {
    const projects = await prisma.registeredHub.findMany({
      orderBy: [{ id: 'asc' }]
    });
    return projects;
  } catch (e: any) {
    console.error('Database Error:', e.message);
    console.error('Stack Trace:', e.stack);
    console.error('Error Details:', e);
    throw new Error('Failed to fetch projects');
  }
}
