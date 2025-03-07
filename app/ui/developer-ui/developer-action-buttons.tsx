'use client';

import React, { useRef } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { updateDashboardLayout, fetchDashboardLayout } from '@/app/lib/actions/developer-actions'
type AddLineChartButtonProps = {
  layout: any[];
  setLayout: (layout: any[]) => void;
  ctitle: String;
  xtitle: string;
  ytitle: string;
};

export const AddLineChartButton = ({ layout, setLayout, ctitle, xtitle, ytitle}: AddLineChartButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const addLineChart = () => {
    // Determine the next available position
    const nextPosition = layout.length;
    const newLayoutItem = {
      i: `lineChart${nextPosition}-c${ctitle}-x${xtitle}-y${ytitle}`,
      x: (nextPosition % 10) * 2, // Example calculation
      y: Math.floor(nextPosition / 10) * 2, // Example calculation
      w: 2,
      h: 2,
    };

    // Check if the new item fits within the grid
    if (newLayoutItem.y < 10) { // Assuming the grid has a height limit of 10 rows
      setLayout([...layout, newLayoutItem]);
    } else {
      alert('No more space to add a new line chart.');
    }
  };

  return (
      <div className="flex justify-end">
        <button
          className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
          onClick={() => addLineChart()}
        >
          Add Line Chart
        </button>
      </div>
  );
};

type AddBarChartButtonProps = {
  layout: any[];
  setLayout: (layout: any[]) => void;
  ctitle: String;
  xtitle: string;
  ytitle: string;
};

export const AddBarChartButton = ({ layout, setLayout, ctitle, xtitle, ytitle }: AddBarChartButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const addBarChart = () => {
    // Determine the next available position
    const nextPosition = layout.length;
    const newLayoutItem = {
      i: `barChart${nextPosition}-c${ctitle}-x${xtitle}-y${ytitle}`,
      x: (nextPosition % 10) * 2, // Example calculation
      y: Math.floor(nextPosition / 10) * 2, // Example calculation
      w: 2,
      h: 2,
    };

    // Check if the new item fits within the grid
    if (newLayoutItem.y < 10) { // Assuming the grid has a height limit of 10 rows
      setLayout([...layout, newLayoutItem]);
    } else {
      alert('No more space to add a new bar chart.');
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
          onClick={() => addBarChart()}
        >
          Add Bar Chart
        </button>
      </div>
    </>
  );
};

type AddSingleValueButtonProps = {
  layout: any[];
  setLayout: (layout: any[]) => void;
};

export const AddSingleValueButton = ({ layout, setLayout }: AddSingleValueButtonProps) => {
  const addSingleValue = () => {
    const nextPosition = layout.length;
    const newLayoutItem = {
      i: `singleValue${nextPosition}`,
      x: (nextPosition % 10) * 2, // Example calculation
      y: Math.floor(nextPosition / 10) * 2, // Example calculation
      w: 2,
      h: 2,
    };

    if (newLayoutItem.y < 10) { // Assuming the grid has a height limit of 10 rows
      setLayout([...layout, newLayoutItem]);
    } else {
      alert('No more space to add a new single value component.');
    }
  };

  return (
    <div className="flex justify-end">
      <button
        className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
        onClick={() => addSingleValue()}
      >
        Add Single Value
      </button>
    </div>
  );
};

type AddTextButtonProps = {
  layout: any[];
  setLayout: (layout: any[]) => void;
};

export const AddTextButton = ({ layout, setLayout }: AddTextButtonProps) => {
  const addTextValue = () => {
    const nextPosition = layout.length;
    const newLayoutItem = {
      i: `textValue${nextPosition}`,
      x: (nextPosition % 10) * 2, // Example calculation
      y: Math.floor(nextPosition / 10) * 2, // Example calculation
      w: 2,
      h: 2,
    };

    if (newLayoutItem.y < 10) { // Assuming the grid has a height limit of 10 rows
      setLayout([...layout, newLayoutItem]);
    } else {
      alert('No more space to add a new text component.');
    }
  };

  return (
    <div className="flex justify-end">
      <button
        className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
        onClick={() => addTextValue()}
      >
        Add Text
      </button>
    </div>
  );
};

type AddTableButtonProps = {
  layout: any[];
  setLayout: (layout: any[]) => void;
  rows: number;
  columns: number;
};

export const AddTableButton = ({ layout, setLayout , rows, columns}: AddTableButtonProps) => {

  const addTable = () => {
    const nextPosition = layout.length;
    const newLayoutItem = {
      i: `table${nextPosition}-r${rows}-c${columns}`,
      x: (nextPosition % 10) * 2, // Example calculation
      y: Math.floor(nextPosition / 10) * 2, // Example calculation
      w: 4, // Table might need more width
      h: 4,
    };

    if (newLayoutItem.y < 10) { // Assuming the grid has a height limit of 10 rows
      setLayout([...layout, newLayoutItem]);
    } else {
      alert('No more space to add a new table.');
    }
  };

  return (
    <div className="flex justify-end">
      <button
        className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
        onClick={() => addTable()}
      >
        Add Table
      </button>
    </div>
  );
};

type DeleteButtonProps = {
  itemId: string;
  layout: any[];
  setLayout: (layout: any[]) => void;
};

export const DeleteButton = ({ itemId, layout, setLayout }: DeleteButtonProps) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevents the event from bubbling up to parent elements
    const updatedLayout = layout.filter(item => item.i !== itemId);
    setLayout(updatedLayout);
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white rounded-full p-1 hover:bg-red-700"

    >
      <TrashIcon className="h-4 w-4" />
    </button>
  );
};

type SaveDashboardButtonProps = {
  layout: any[];
  projectId: string;
  setLayout: (layout: any[]) => void;
};

export const SaveDashboardButton = ({ projectId, layout, setLayout }: SaveDashboardButtonProps) => {
  const saveDashboardLayout = async () => {
    try {
      // Update or create dashboard layout
      await updateDashboardLayout(projectId, layout);
      alert('Dashboard layout saved successfully!');
    } catch (error) {
      console.error('Failed to save dashboard layout:', error);
      alert('Failed to save dashboard layout. Please try again later.');
    }
  };

  return (
    <div className="flex justify-end">
      <button
      className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
      onClick={saveDashboardLayout}
    >
      Save Dashboard
    </button>
    </div>
  );
};

type DownloadDashboardButtonProps = {
  layout: any[];
  deviceName: string;
  description: string;
};

export const DownloadDashboardButton = ({ layout, deviceName, description }: DownloadDashboardButtonProps) => {
  const downloadDashboardLayout = () => {
    const data = {
      metadata: {
        deviceName,
        description,
      },
      layout,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "dashboard_layout.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex justify-end">
      <button
        className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
        onClick={downloadDashboardLayout}
      >
        Download Dashboard Layout
      </button>
    </div>
  );
};


type BeginConnectivityTestButtonProps = {
  beginConnectivityTest: () => void; // Define prop for beginConnectivityTest function
};

export const BeginConnectivityTestButton = ({ beginConnectivityTest }: BeginConnectivityTestButtonProps) => {
  return (
    <div className="flex justify-end">
      <button
        className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
        onClick={beginConnectivityTest} // Use prop function for onClick event
      >
        Begin Connectivity Test
      </button>
    </div>
  );
};

type EndConnectivityTestButtonProps = {
  endConnectivityTest: () => void; // Define prop for beginConnectivityTest function
};

export const EndConnectivityTestButton = ({ endConnectivityTest }: EndConnectivityTestButtonProps) => {
  return (
    <div className="flex justify-end">
      <button
        className="btn rounded-full border-black bg-transparent hover:bg-wvu-primary-gold hover:text-white active:bg-wvu-primary-blue active:text-white"
        onClick={endConnectivityTest} // Use prop function for onClick event
      >
        End Connectivity Test
      </button>
    </div>
  );
};