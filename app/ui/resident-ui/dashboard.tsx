import navbarLinks from "@/app/ui/navbar"
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { Metadata } from 'next';
import { fetchDoctorById, fetchMedicationsByUser, fetchUserByEmail, fetchContactsByUser, fetchAppointmentsByResident } from '@/app/lib/data/data';
import { auth } from '@/auth';
import { lusitana } from "../fonts";
export const Medmetadata: Metadata = {
    title: 'Medications',
  };
  export const Contmetadata: Metadata = {
    title: 'Contacts',
  };
  export const Appmetadata: Metadata = {
    title: 'Appointments',
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
export default async function Dashboard() {
    const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);
  const medications = await fetchMedicationsByUser(user.id);
  const contacts = await fetchContactsByUser(user.id);
  const appointments = await fetchAppointmentsByResident(user.id);
    return (
        <main className="flex-grow flex flex-col bg-white px-2 py-8 sm:px-10 sm:py-20">
        <div className="flex flex-col">
                {/* First Row */}
                <div className="flex">
                    {/* Left Container */}
                    <div className="w-1/2 h-80 p-2">
                        <div className="flex flex-col h-full">
                            <div className="flex-grow bg-white border-2 border-black">
                                <div className="flex items-center justify-between w-full h-12 bg-wvu-primary-blue pl-5 pr-5">
                                    <h6 className={`${lusitana.className} rounded-md bg-wvu-primary-blue p-2 text-lg uppercase text-white antialiased`}>Devices</h6>
                                    <Link href={'/resident-dashboard/devices'} className="text-blue-900 no-underline">
                                        <button className="w-12 h-8 text-sm rounded-full bg-white flex justify-center items-center border-2 border-black font-bold">
                                            <ArrowRightIcon className='w-6' />
                                        </button>
                                    </Link>
                                </div>
                                <div className="pt-5 pl-5">
                                    <span className="underline text-blue-900 text-base mr-80 font-bold">Name:</span>
                                    <span className="underline text-blue-900 text-base font-bold">Device Status:</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Container */}
                    <div className="w-1/2 h-80 p-2 ">
                        <div className="flex flex-col h-full">
                            <div className="flex-grow bg-white border-2 border-black">
                                <div className="flex items-center justify-between w-full h-12 bg-wvu-primary-blue pl-5 pr-5">
                                    <h6 className={`${lusitana.className} rounded-md bg-wvu-primary-blue p-2 text-lg uppercase text-white antialiased`}>Appointments</h6>
                                    <Link href={'/resident-dashboard/calendar'} className="text-blue-900 no-underline">
                                        <button className="w-12 h-8 text-sm rounded-full bg-white flex justify-center items-center border-2 border-black font-bold">
                                            <ArrowRightIcon className='w-6' />
                                        </button>
                                    </Link>
                                </div>
                                <div className="pt-5 pl-5">
                                    <table className="table-auto">
                                        <thead>
                                            <tr>
                                                <th className="text-left pr-20 pb-2 pl-10 underline text-blue-900 text-base mr-48 font-bold">Doctor</th>
                                                <th className="text-left pb-2 pl-30 underline text-blue-900 text-base font-bold">Date</th>
                                                <th className="text-left pb-2 pl-24 underline text-blue-900 text-base font-bold">Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((appointment, index) => (
                                                <tr key={index}>
                                                    <td className="text-left text-black pr-20 pb-2 pl-10">{fetchDoctorName(appointment.doctorId)}</td>
                                                    <td className="text-left text-black pb-2 pl-30">{appointment.date.toLocaleDateString()}</td>
                                                    <td className="text-left text-black pb-2 pl-24">{appointment.location.addressLine1}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Second Row */}
                <div className="flex">
                    {/* Left Container */}
                    <div className="w-1/2 h-80 p-2">
                        <div className="flex flex-col h-full">
                            <div className="flex-grow bg-white border-2 border-black">
                                <div className="flex items-center justify-between w-full h-12 bg-wvu-primary-blue pl-5 pr-5">
                                    <h6 className={`${lusitana.className} rounded-md bg-wvu-primary-blue p-2 text-lg uppercase text-white antialiased`}>Medications</h6>
                                    <Link href={'/resident-dashboard/medications'} className="text-blue-900 no-underline">
                                        <button className="w-12 h-8 text-sm rounded-full bg-white flex justify-center items-center border-2 border-black font-bold">
                                            <ArrowRightIcon className='w-6' />
                                        </button>
                                    </Link>
                                </div>
                                <div className="pt-5 pl-5">
                                    <table className="table-auto">
                                        <thead>
                                            <tr>
                                                <th className="text-left pr-20 pb-2 pl-10 underline text-blue-900 text-base mr-48 font-bold">Medication</th>
                                                <th className="text-left pb-2 pl-40 underline text-blue-900 text-base font-bold">Instructions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medications.map((medication, index) => (
                                                <tr key={index}>
                                                    <td className="text-left text-black pr-20 pb-2 pl-10">{medication.name}</td>
                                                    <td className="text-left text-black pb-2 pl-40">{medication.instructions}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Container */}
                    <div className="w-1/2 h-80 p-2">
                        <div className="flex flex-col h-full">
                            <div className="flex-grow bg-white border-2 border-black">
                                <div className="flex items-center justify-between w-full h-12 bg-wvu-primary-blue pl-5 pr-5">
                                    <h6 className={`${lusitana.className} rounded-md bg-wvu-primary-blue p-2 text-lg uppercase text-white antialiased`}>Contacts</h6>
                                    <Link href={'/resident-dashboard/contacts'} className="text-blue-900 no-underline">
                                        <button className="w-12 h-8 text-sm rounded-full bg-white flex justify-center items-center border-2 border-black font-bold">
                                            <ArrowRightIcon className='w-6' />
                                        </button>
                                    </Link>
                                </div>
                                <div className="pt-5 pl-5">
                                    <table className="table-auto">
                                        <thead>
                                            <tr>
                                            <th className="text-left pr-20 pb-2 pl-10 underline text-blue-900 text-base font-bold">Name</th>
                                            <th className="text-left pb-2 pl-32 underline text-blue-900 text-base font-bold">Phone Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contacts.map((contact, index) => (
                                                <tr key={index}>
                                                    <td className="text-left text-black pr-20 pb-2 pl-10">{contact.firstName}/{contact.relationship}</td>
                                                    <td className="text-left text-black pb-2 pl-32">{contact.phoneNumber}</td>
                                                </tr>
                                                ))}
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </main>
    );
}
