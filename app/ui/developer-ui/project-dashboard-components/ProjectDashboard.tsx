'use client';

import React, { useState, useEffect } from 'react';

import GridLayout from 'react-grid-layout';
import LineChartComponent from './LineChartComponent';
import BarChartComponent from './BarChartComponent';
import SingleValueComponent from './SingleValueComponent';
import TableComponent from './TableComponent';
import TextComponent from './TextComponent';

import { fetchProjectData } from '@/app/lib/data/developer-data';
import { fetchDashboardLayout} from '@/app/lib/actions/developer-actions';


import {  
  AddLineChartButton,
  AddBarChartButton,
  AddSingleValueButton,
  AddTableButton,
  AddTextButton,
  DeleteButton,
  SaveDashboardButton,
  DownloadDashboardButton
} from '../developer-action-buttons';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Sample data for the table component
const sampleData = [
  { name: 'John', age: 28, city: 'New York' },
  { name: 'Jane', age: 32, city: 'San Francisco' },
  { name: 'Doe', age: 22, city: 'Los Angeles' },
];

type ProjectDashboardProps = {
  projectId: string;
  projectName: string;
  projectDescription: string;
};

function ProjectDashboard({ projectId, projectName, projectDescription }: ProjectDashboardProps) {
  const [layout, setLayout] = useState([
    { i: 'lineChart0', x: 0, y: 0, w: 2, h: 2 },
  ]);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null); // State to track hovered item ID

  useEffect(() => {
    const loadLayout = async () => {
      try {
        const savedLayout = await fetchDashboardLayout(projectId);
        setLayout(savedLayout || []);
      } catch (error) {
        console.error('Error fetching dashboard layout:', error);
      }
    };

    loadLayout();
  }, [projectId]);

  // Function to handle mouse enter event
  const handleMouseEnter = (itemId: string) => {
    setHoveredItemId(itemId);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  const dashboardWidth = 1280 * 0.6; // Calculate 60% of 1280
  const dashboardHeight = 800 * 0.6; // Calculate 60% of 800
  const rows = 10;
  const rowHeight = dashboardHeight / rows;

  return (
    <div>
      <div >
        <div className="flex space-x-2 mb-2" style={{alignItems: 'center'}}>
          <SaveDashboardButton projectId={projectId} layout={layout} setLayout={setLayout} />
          <DownloadDashboardButton layout={layout} deviceName={projectName} description={projectDescription} />
        </div>
        <div className="flex space-x-2 mb-2">
          <AddLineChartButton layout={layout} setLayout={setLayout} />
          <AddBarChartButton layout={layout} setLayout={setLayout} />
          <AddSingleValueButton layout={layout} setLayout={setLayout} />
          <AddTextButton layout={layout} setLayout={setLayout} />
          <AddTableButton layout={layout} setLayout={setLayout} />
        </div>
        
      </div>
      <div style={{ width: `${dashboardWidth}px`, height: `${dashboardHeight}px`, maxWidth: '100%', maxHeight: '100%', border: '2px solid gray' }}>
        <GridLayout
          layout={layout}
          cols={10}
          rowHeight={rowHeight}
          width={dashboardWidth}
          onLayoutChange={setLayout}
        >
          {layout.map((item) => (
            <div key={item.i} onMouseEnter={() => handleMouseEnter(item.i)} onMouseLeave={handleMouseLeave}>
              {item.i.startsWith('lineChart') && <LineChartComponent />}
              {item.i.startsWith('barChart') && <BarChartComponent />}
              {item.i.startsWith('singleValue') && <SingleValueComponent value="42" />}
              {item.i.startsWith('text') && <TextComponent value="Lorem ipsum dolor sit amet" />}
              {item.i.startsWith('table') && <TableComponent data={sampleData} />}
              {hoveredItemId === item.i && (
                <DeleteButton itemId={item.i} layout={layout} setLayout={setLayout} />
              )}
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
}

export default ProjectDashboard;
