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

type ProjectDashboardProps = {
  projectId: string;
  projectName: string;
  projectDescription: string;
};

function ProjectDashboard({ projectId, projectName, projectDescription }: ProjectDashboardProps) {
  // Sample data for the table component
const [tableRows, setRows] = useState(1);
const [tableCols, setCols] = useState(1);

const [lineChartXAxisTitle, setLineChartXAxisTitle] = useState("X Axis Title")
const [lineChartYAxisTitle, setLineChartYAxisTitle] = useState("Y Axis Title")
const [lineChartTitle, setLineChartTitle] = useState("Chart Title")

const [barChartXAxisTitle, setBarChartXAxisTitle] = useState("X Axis Title")
const [barChartYAxisTitle, setBarChartYAxisTitle] = useState("Y Axis Title")
const [barChartTitle, setBarChartTitle] = useState("Chart Title")


  
  const [layout, setLayout] = useState([
    { i: 'lineChart0', x: 0, y: 0, w: 2, h: 2, rows: 0, columns: 0 },
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
    <div className='w-full'>
      <div >
        <div className="flex space-x-2 mb-2" style={{alignItems: 'center'}}>
          <SaveDashboardButton projectId={projectId} layout={layout} setLayout={setLayout} />
          <DownloadDashboardButton layout={layout} deviceName={projectName} description={projectDescription} />
        </div>
        <div className="flex space-x-2 mb-2">
          <table>
            <tr>
              <td>
                <AddLineChartButton layout={layout} setLayout={setLayout} xtitle={lineChartXAxisTitle} ytitle={lineChartYAxisTitle} ctitle={lineChartTitle}/>
              </td>
              <td>
                <AddBarChartButton layout={layout} setLayout={setLayout} xtitle={barChartXAxisTitle} ytitle={barChartYAxisTitle} ctitle={barChartTitle}/>
              </td>
              <td>
                <AddTableButton layout={layout} setLayout={setLayout} rows={tableRows} columns={tableCols} />
              </td>
              <td>
                <AddTextButton layout={layout} setLayout={setLayout} />
              </td>
              <td>
                <AddSingleValueButton layout={layout} setLayout={setLayout} />
              </td>
            </tr>
            <tr>
              <td>
                <form >
                  <div className="flex">
                    <label className="text-s" htmlFor="lctitle" >Chart Title:</label>
                    <input type="text" id="lctitle" name="lctitle" className="border p-1" defaultValue="Chart Title" onChange={(e) => setLineChartTitle(e.target.value)} />
                  </div>

                  <div className="flex">
                    <label htmlFor="lcxtitle">Chart X Axis Title:</label>
                    <input type="text" id="lcxtitle" name="lcxtitle" className="border p-1" defaultValue="X Axis Title" onChange={(e) => setLineChartXAxisTitle(e.target.value)} />
                  </div>

                  <div className="flex">
                    <label htmlFor="lcytitle">Chart Y Axis Title:</label>
                    <input type="text" id="lcytitle" name="lcytitle" className="border p-1" defaultValue="Y Axis Title" onChange={(e) => setLineChartYAxisTitle(e.target.value)} />
                  </div>
                </form>

              </td>
              <td>
                <form>
                  <div className="flex">
                  <label htmlFor="bctitle">Chart Title:</label>
                  <input type="text" id="bctitle" name="bctitle" className="border p-1" defaultValue={"Chart Title"} onChange={(e) => setBarChartTitle(e.target.value)}/>
                  </div>

                  <div className="flex">
                  <label htmlFor="bcxtitle">Chart X Axis Title:</label>
                  <input type="text" id="bcxtitle" name="bcxtitle" className="border p-1" defaultValue={"X Axis Title"} onChange={(e) => setBarChartXAxisTitle(e.target.value)}/>
                  </div>

                  <div className="flex">
                  <label htmlFor="bcytitle">Chart Y Axis Title:</label>
                  <input type="text" id="bcytitle" name="bcytitle" className="border p-1" defaultValue={"Y Axis Title"} onChange={(e) => setBarChartYAxisTitle(e.target.value)}/>
                  </div>

                  
                  
                  
                </form>
              </td>
              <td>
                <form>
                  <div className="flex">
                  <label htmlFor="rows">Rows:</label>
                  <input type="number" id="tableRows" name="rows" min="1" max="10" step="1" className="border p-1" defaultValue={1} onChange={(e) => setRows(Number(e.target.value))}/>
                  </div >
                  
                  
                  <div className="flex">
                  <label htmlFor="cols">Cols:</label>
                  <input type="number" id="tableCols" name="cols" min="1" max="10" step="1" className="border p-1" defaultValue={1} onChange={(e) => setCols(Number(e.target.value))}/>
                  </div >
                  
                </form>
              </td>
              <td>
                
              </td>
              <td>
                
              </td>
            </tr>
          </table>
         

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
              {item.i.startsWith('lineChart') && <LineChartComponent  ctitle={item.i.match(/lineChart\d+-c(?<ctitle>.+?)-x(?<xtitle>.+?)-y(?<ytitle>.+)/)?.groups?.ctitle ?? "test"}
                                                                      xtitle={item.i.match(/lineChart\d+-c(?<ctitle>.+?)-x(?<xtitle>.+?)-y(?<ytitle>.+)/)?.groups?.xtitle ?? "test"}
                                                                      ytitle={item.i.match(/lineChart\d+-c(?<ctitle>.+?)-x(?<xtitle>.+?)-y(?<ytitle>.+)/)?.groups?.ytitle ?? "test"}/>}
              {item.i.startsWith('barChart') && <BarChartComponent  ctitle={item.i.match(/barChart\d+-c(?<ctitle>.+?)-x(?<xtitle>.+?)-y(?<ytitle>.+)/)?.groups?.ctitle ?? "test"}
                                                                    xtitle={item.i.match(/barChart\d+-c(?<ctitle>.+?)-x(?<xtitle>.+?)-y(?<ytitle>.+)/)?.groups?.xtitle ?? "test"}
                                                                    ytitle={item.i.match(/barChart\d+-c(?<ctitle>.+?)-x(?<xtitle>.+?)-y(?<ytitle>.+)/)?.groups?.ytitle ?? "test"}/>}
              {item.i.startsWith('singleValue') && <SingleValueComponent value="42" />}
              {item.i.startsWith('text') && <TextComponent value="Lorem ipsum dolor sit amet" />}
              {item.i.startsWith('table') && <TableComponent rows={item.i.match(/-r(\d+)-c(\d+)/)[1]} cols={item.i.match(/-r(\d+)-c(\d+)/)[2]}/>}
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
