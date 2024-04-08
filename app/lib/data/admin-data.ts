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
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phoneNumber: { contains: query, mode: 'insensitive' } },
              { role: { equals: 'RESIDENT' } },
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
      },
      orderBy: { name: 'asc' },
    });
    return residents;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch residents');
  }
}

export async function fetchFilteredDoctors(
  doctorIds: string[],
  query: string,
  currentPage: number,
) {
  noStore();

  try {
    const doctors = await prisma.user.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      where: {
        AND: [
          { id: { in: doctorIds } },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phoneNumber: { contains: query, mode: 'insensitive' } },
              { role: { equals: 'DOCTOR' } },
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
      },
      orderBy: { name: 'asc' },
    });
    return doctors;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch doctors');
  }
}

export async function fetchFilteredAdmins(
  adminIds: string[],
  query: string,
  currentPage: number,
) {
  noStore();

  try {
    const admins = await prisma.user.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      where: {
        AND: [
          { id: { in: adminIds } },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phoneNumber: { contains: query, mode: 'insensitive' } },
              { role: { equals: 'ADMIN' } },
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
      },
      orderBy: { name: 'asc' },
    });
    return admins;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch admins');
  }
}

export async function fetchResidentsPages(
  residentIds: string[],
  query: string,
) {
  noStore();

  try {
    const count = await prisma.user.count({
      where: {
        AND: [
          { id: { in: residentIds } },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phoneNumber: { contains: query, mode: 'insensitive' } },
              { role: { equals: 'RESIDENT' } },
            ],
          },
        ],
      },
    });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch total number of residents');
  }
}

export async function fetchDoctorsPages(doctorIds: string[], query: string) {
  noStore();

  try {
    const count = await prisma.user.count({
      where: {
        AND: [
          { id: { in: doctorIds } },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phoneNumber: { contains: query, mode: 'insensitive' } },
              { role: { equals: 'DOCTOR' } },
            ],
          },
        ],
      },
    });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch total number of doctors');
  }
}

export async function fetchAdminsPages(adminIds: string[], query: string) {
  noStore();

  try {
    const count = await prisma.user.count({
      where: {
        AND: [
          { id: { in: adminIds } },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phoneNumber: { contains: query, mode: 'insensitive' } },
              { role: { equals: 'ADMIN' } },
            ],
          },
        ],
      },
    });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch total number of admins');
  }
}
