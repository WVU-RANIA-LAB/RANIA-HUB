import React from 'react';

export default function Calendar() {
    return (
        <div>
            <div className="grow py-16 bg-wvu-primary-blue">
                <div className="container mx-auto">
                    <iframe src="https://calendar.google.com/calendar/embed?src=mlb0094@mix.wvu.edu" className="w-full h-screen"></iframe>
                </div>
            </div>
        </div>
    );
}