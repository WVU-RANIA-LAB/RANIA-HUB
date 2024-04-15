import { Metadata } from 'next';
import { fetchDoctorById, fetchMedicationsByUser, fetchUserByEmail } from '@/app/lib/data';
import { auth } from '@/auth';
import prisma from '@/app/lib/prisma';

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
        <main className="grow bg-white py-16">
          <div className="mx-auto max-w-7xl">
            
            <div className={`rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased flex items-center justify-between`}>
              <span>Medications</span>
            </div>
    
            <br />
    
            <table className="table table-auto">
              <thead>
                <tr className={`text-2xl font-bold text-wvu-primary-blue antialiased`}>
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
                  <td>{fetchDoctorName(medication.doctorId)}</td>
                  <td>{medication.prescribedDate.toLocaleDateString()}</td>
                  <td>{medication.name}</td>
                  <td>{medication.instructions}</td>
                  <td>{medication.refills}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      );

}

