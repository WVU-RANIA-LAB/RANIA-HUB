import React, { useState, useEffect } from 'react';
import { fetchMedicationsByUser } from '@/app/lib/data';
import prisma from '@/app/lib/prisma';
import { Medication } from '@prisma/client';
import { User } from '@prisma/client';
import { auth } from '@/auth';

import { fetchUserByEmail } from '@/app/lib/data';


export default function Medications() {
    const [medications, setMedications] = useState<any[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data using email
                const session = await auth();
                const user: User | null = await fetchUserByEmail(session!.user!.email!);
                if (user) {
                    // If user exists, fetch medications using user ID
                    const fetchedMedications = await fetchMedicationsByUser(user.id);
                    setMedications(fetchedMedications);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user or medications:', error);
            }
        };

        fetchUserData();
    });

    return (
        <main>
            <div className="mt-4 mb-4 mr-4 ml-4 min-h-screen flex flex-col">
                
                <div className="flex-grow mb-24 bg-white">
                    
                    <div className="flex items-center justify-between w-full h-12 bg-blue-900 pl-5 pr-5">
                        <h6 className=" text-2xl font-bold text-white">Medications</h6>
                            <a href="#" className="text-blue-900 no-underline">
                                <button className="w-24 h-8 text-sm rounded-full bg-white flex justify-center items-center border-2 border-black font-bold">
                                    Create
                                </button>
                            </a>
                    </div>

                <div className="pt-5 pl-5">
                    <span className="text-blue-900 text-base mr-32 font-bold">Prescribed By:</span>
                    <span className="text-blue-900 text-base mr-32 font-bold">Prescribed Date:</span>
                    <span className="text-blue-900 text-base mr-60 font-bold">Medication:</span>
                    <span className="text-blue-900 text-base mr-72 font-bold">Instructions:</span>
                    <span className="text-blue-900 text-base font-bold">Refills:</span>
                </div>

                <div className="border border-black mx-4"></div>
                
                <div className="pl-5 mt-2">
                        {medications.map(medication => (
                            <div key={medication.id} className="flex">
                                <span className="text-base mr-32">{medication.prescribedBy}</span>
                                <span className="text-base mr-32">{medication.prescribedDate}</span>
                                <span className="text-base mr-60">{medication.name}</span>
                                <span className="text-base mr-72">{medication.instructions}</span>
                                <span className="text-base">{medication.refills}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </main>
    );
}

