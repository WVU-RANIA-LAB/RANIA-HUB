'use client';

import { addDevice } from '../lib/actions/device-actions';
import { lusitana } from './fonts';

export function AddDevice() {
  return (
    <button
      onClick={() => addDevice()}
      className="btn rounded-md border-2 border-gray-400 bg-white text-lg font-semibold text-gray-800 hover:bg-gray-100"
    >
      Add Device
    </button>
  );
}

export default function ViewDevices() {
  return (
    <div className="mx-auto max-w-7xl">
      <div
        className={`${lusitana.className} rounded border-8 border-wvu-primary-blue bg-wvu-primary-blue text-2xl font-bold text-white antialiased`}
      >
        Manage Devices{' '}
        <button
          onClick={() => addDevice()}
          className="btn float-right rounded-md border-2 bg-white text-xl font-semibold text-wvu-primary-blue hover:bg-wvu-primary-gold"
        >
          Add Device
        </button>
      </div>
      <br></br>
      <table className="table table-auto">
        <thead>
          <tr
            className={`${lusitana.className} text-2xl font-bold text-wvu-primary-blue antialiased`}
          >
            <th>Device</th>
            <th>Status</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-lg text-black">
            <td>Filler</td>
            <td>Filler</td>
            <td>Filler</td>
            <td>Filler</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
