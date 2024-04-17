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

export async function fetchContactsByUser(belongsToId: string) {
  noStore();

  try {
    return prisma.contact.findMany({
      where: { belongsToId },
    });
  } catch (e) {
    throw new Error('Failed to fetch contact');
  }
}

export async function fetchMedicationsByUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { receivedPrescriptions: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.receivedPrescriptions;

  } catch (e) {
    throw new Error('Failed to fetch medications');
  }
}
export async function fetchDoctorById(doctorId: string) {
  try {
    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
    });

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    return doctor;

  } catch (e) {
    throw new Error('Failed to fetch doctor');
  }
}
export async function fetchAppointmentsByResident(residentId: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { residentId },
      include: { 
        doctor: { 
          select: { id: true },
        },
      },
    });

    return appointments;

  } catch (e) {
    throw new Error('Failed to fetch appointments');
  }
}
