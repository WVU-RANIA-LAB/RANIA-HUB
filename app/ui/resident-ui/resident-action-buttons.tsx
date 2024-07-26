'use client';

import React, { useRef } from 'react';

type BeginConnectionButtonProps = {
    beginConnection: () => void; // Define prop for beginConnectivityTest function
  };
  
export const BeginConnectionButton = ({ beginConnection }: BeginConnectionButtonProps) => {
return (
    <div className="flex justify-end">
    <button
        className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
        onClick={beginConnection} // Use prop function for onClick event
    >
        Connect Device
    </button>
    </div>
);
};