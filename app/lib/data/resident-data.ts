import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/app/lib/prisma';

export async function fetchDevicesByResident(belongsToId: string) {
  noStore();

  try {
    return prisma.device.findMany({
      where: { belongsToId },
    });
  } catch (e) {
    throw new Error('Failed to fetch device');
  }
}
