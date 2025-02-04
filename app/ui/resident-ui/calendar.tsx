import React from 'react';
import { auth } from '@/auth';

export default async function Calendar() {
    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return <p className="text-center text-red-500 mt-4">Error: Unable to load calendar.</p>;
    }

    const calendarSrc = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(userEmail)}`;
    const calendarURL = `https://calendar.google.com/calendar/u/0/r`;
    
    return (
        <div className="bg-wvu-off-white min-h-screen">
            <div className="container mx-auto py-4">
                <div className="flex justify-between items-center mb-4 px-4">
                    <h1 className="text-xl font-semibold">Your Google Calendar</h1>
                    <div className="space-x-4">
                        <a 
                            href="https://calendar.google.com/calendar/render?action=TEMPLATE&add=${encodeURIComponent(userEmail)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            + Create Event
                        </a>
                        <a 
                            href={calendarURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Manage Events
                        </a>
                    </div>
                </div>
                <iframe 
                    src={calendarSrc} 
                    className="w-full h-[80vh] border rounded-md"
                ></iframe>
            </div>
        </div>
    );
}
