'use server'
import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/app/lib/prisma';

export async function fetchDevices() {
  noStore();

  try {
    console.log('attempting to get Devices');
    const devices = await prisma.deviceACL.findMany({
      select: {
        deviceId: true,
        deviceName: true,
        deviceDescription: true,
        // other fields
      }
    });
    console.log('Devices:', devices);
    return devices;
  } catch (e) {
    console.error('Error fetching devices:', e);
    throw new Error('Failed to fetch devices');
  }
}

// Function to fetch dashboard layout from MongoDB
export async function fetchDashboardLayout(requestedId: string) {
  try {
    const layout = await prisma.deviceACL.findMany({
      where: {
        deviceId: requestedId,
      },
      select:{deviceDashboardLayout: true}
    });

    return layout || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dashboard layout.');
  }
}
//
export async function fetchDeviceData(deviceId: string) {
  let data = null;

  try {

        const textData = await prisma.textData.findMany({
          where: {
            deviceId: deviceId,
          },
          select: { data: true, i: true }
        });

        const singleValueData = await prisma.singleValueData.findMany({
          where: {
            deviceId: deviceId
          },
          select: { data: true, i: true }
        });

        data = {
          textData: textData,
          singleValueData: singleValueData
        }

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch device data.');
  }

  return data;
}



