import navbarLinks from "@/app/ui/navbar"
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { Metadata } from 'next';
import { fetchDoctorById, fetchMedicationsByUser, fetchUserByEmail } from '@/app/lib/data';
import { auth } from '@/auth';
export const metadata: Metadata = {
    title: 'Medications',
  };
export default async function Dashboard() {
    const session = await auth();

  const user = await fetchUserByEmail(session!.user!.email!);
  const medications = await fetchMedicationsByUser(user.id);
    return (
        <main>

        <div className="flex flex-col">
                {/* First Row */}
                <div className="flex">
                    {/* Left Container */}
                    <div className="w-1/2 h-80 p-2">
                        <div className="flex flex-col h-full">
                            <div className="flex-grow bg-white border-2 border-black">
                                <div className="flex items-center justify-between w-full h-12 bg-blue-900 pl-5 pr-5">
                                    <h6 className="text-2xl font-bold text-white">Devices</h6>
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
                                <div className="flex items-center justify-between w-full h-12 bg-blue-900 pl-5 pr-5">
                                    <h6 className="text-2xl font-bold text-white">Appointments</h6>
                                    <Link href={'/resident-dashboard/calendar'} className="text-blue-900 no-underline">
                                        <button className="w-12 h-8 text-sm rounded-full bg-white flex justify-center items-center border-2 border-black font-bold">
                                            <ArrowRightIcon className='w-6' />
                                        </button>
                                    </Link>
                                </div>
                                <div className="pt-5 pl-5">
                                    <span className="underline text-blue-900 text-base mr-48 font-bold">Doctor:</span>
                                    <span className="underline text-blue-900 text-base mr-48 font-bold">Time:</span>
                                    <span className="underline text-blue-900 text-base font-bold">Location:</span>
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
                                <div className="flex items-center justify-between w-full h-12 bg-blue-900 pl-5 pr-5">
                                    <h6 className="text-2xl font-bold text-white">Medications</h6>
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
                                                    <td className="text-left pr-20 pb-2 pl-10">{medication.name}</td>
                                                    <td className="text-left pb-2 pl-40">{medication.instructions}</td>
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
                                <div className="flex items-center justify-between w-full h-12 bg-blue-900 pl-5 pr-5">
                                    <h6 className="text-2xl font-bold text-white">Contacts</h6>
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
                                            <th className="text-left pb-2 pl-40 underline text-blue-900 text-base font-bold">Phone Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-left pr-20 pb-2 pl-10">Jon Johnson</td>
                                                <td className="text-left pb-2 pl-40">304-111-2222</td>
                                            </tr>
                                            <tr>
                                                <td className="text-left pr-20 pb-2 pl-10">Jane Johnson</td>
                                                <td className="text-left pb-2 pl-40">304-222-1111</td>
                                            </tr>
                                            {/* Add more contacts as needed */}
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
