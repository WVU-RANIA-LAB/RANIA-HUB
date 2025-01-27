import React from 'react';
import { auth } from '@/auth';

export default async function Calendar() {
    const session = await auth();
    const srcURL = "https://calendar.google.com/calendar/embed?src="+session!.user!.email!
    return (
        <div>
            <div className="bg-wvu-off-white">
                <div className="container mx-auto">
                    <iframe src={srcURL} className="w-full h-screen"></iframe>
                </div>
            </div>
        </div>
    );
}