import React from 'react';

const DeviceCard = ({ deviceName, deviceDescription, onClick }) => (
  <div
    style={{ border: '1px solid black', borderRadius: 10, padding: 20 }}
    className="border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white hover:cursor-pointer active:bg-wvu-primary-blue active:text-white"
    onClick={onClick}
  >
    <h3 style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>{deviceName}</h3>
    <p>{deviceDescription}</p>
  </div>
);

export default DeviceCard;
