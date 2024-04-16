import { Metadata } from 'next';
import { fetchDoctorById, fetchMedicationsByUser, fetchUserByEmail } from '@/app/lib/data';
import { auth } from '@/auth';
import prisma from '@/app/lib/prisma';
import { lusitana } from '../fonts';

export const metadata: Metadata = {
  title: 'Medications',
};
async function fetchDoctorName(doctorId: string) {
  try {
    const doctor = await fetchDoctorById(doctorId);
    return doctor.name;
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return 'Unknown';
  }
}
export default async function Medications() {
  const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);
  const medication = await fetchMedicationsByUser(user.id);
    return (
      <main className="flex grow flex-col bg-white px-2 py-8 sm:px-10 sm:py-20">
        <div className="mb-4 flex justify-end">
        </div>
        <div className="rounded-md border border-black">
        <h1
          className={`${lusitana.className} mb-4 rounded-md bg-wvu-primary-blue p-2 text-3xl uppercase text-white antialiased`}
        >
          Medications
        </h1>
            <table className="table table-auto">
              <thead>
                <tr className={`${lusitana.className} text-lg text-black`}>
                  <th>Prescribed By</th>
                  <th>Prescribed Date</th>
                  <th>Medication</th>
                  <th>Instructions</th>
                  <th>Refills</th>
                </tr>
              </thead>
              <tbody>
                {medication.map((medication, index) => (
                <tr key={index}>
                  <td className="text-base text-black">{fetchDoctorName(medication.doctorId)}</td>
                  <td className="text-base text-black">{medication.prescribedDate.toLocaleDateString()}</td>
                  <td className="text-base text-black">{medication.name}</td>
                  <td className="text-base text-black">{medication.instructions}</td>
                  <td className="text-base text-black">{medication.refills}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      );

}

