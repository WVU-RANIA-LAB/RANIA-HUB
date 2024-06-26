import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/app/lib/prisma';

const ITEMS_PER_PAGE = 20;

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
            ],
          },
        ],
      },
      orderBy: { name: 'asc' },
    });
    return residents;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch residents');
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

export async function fetchFilteredMedications(
  residentId: string,
  query: string,
  currentPage: number,
) {
  noStore();

  try {
    const medications = await prisma.medication.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      where: {
        AND: [
          { residentId },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { instructions: { contains: query, mode: 'insensitive' } },
            ],
          },
        ],
      },
      include: {
        doctor: true,
      },
      orderBy: { prescribedDate: 'desc' },
    });
    return medications;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch medications');
  }
}

export async function fetchMedicationsPages(residentId: string, query: string) {
  noStore();

  try {
    const count = await prisma.medication.count({
      where: {
        AND: [
          { residentId },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { instructions: { contains: query, mode: 'insensitive' } },
            ],
          },
        ],
      },
    });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch total number of medications');
  }
}

export async function fetchFilteredMedicalHistoryEntries(
  residentId: string,
  query: string,
  currentPage: number,
) {
  noStore();

  try {
    const medicalHistoryEntries = await prisma.medicalHistoryEntry.findMany({
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      where: {
        AND: [
          { residentId },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        editor: true,
      },
      orderBy: { date: 'asc' },
    });
    return medicalHistoryEntries;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch medical history entries.');
  }
}

export async function fetchMedicalHistoryPages(
  residentId: string,
  query: string,
) {
  noStore();

  try {
    const count = await prisma.medicalHistoryEntry.count({
      where: {
        AND: [
          { residentId },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch total number of medical history entries.');
  }
}

export async function fetchRecentMedicalHistory(residentId: string) {
  noStore();

  try {
    const medicalHistoryEntries = await prisma.medicalHistoryEntry.findMany({
      take: 10,
      where: { residentId },
      orderBy: { date: 'desc' },
    });
    return medicalHistoryEntries;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch medical history entries.');
  }
}

export async function fetchRecentMedications(residentId: string) {
  noStore();

  try {
    const medications = await prisma.medication.findMany({
      take: 5,
      where: { residentId },
      orderBy: { prescribedDate: 'desc' },
    });
    return medications;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch medications.');
  }
}
