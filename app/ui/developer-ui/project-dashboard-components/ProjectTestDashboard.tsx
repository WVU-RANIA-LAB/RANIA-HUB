'use client';

import React, { useState, useEffect } from 'react';

import GridLayout from 'react-grid-layout';
import LineChartComponent from './LineChartComponent';
import BarChartComponent from './BarChartComponent';
import SingleValueComponent from './SingleValueComponent';
import TableComponent from './TableComponent';
import TextComponent from './TextComponent';

import ConnectivityTestStepOne from '../connectivity-test-items/connectivity-test-step-one'
import ConnectivityTestInstructions from '../connectivity-test-items/connectivity-test-instructions'

import { fetchProjectData } from '@/app/lib/data/developer-data';
import { fetchDashboardLayout } from '@/app/lib/actions/developer-actions';

import { BeginConnectivityTestButton, EndConnectivityTestButton } from '../developer-action-buttons';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

type ProjectDashboardProps = {
  projectId: string;
  projectName: string;
  projectDescription: string;
};


function ProjectTestDashboard({ projectId, projectName, projectDescription }: ProjectDashboardProps) {

  const [layout, setLayout] = useState([
    { i: 'lineChart0', x: 0, y: 0, w: 2, h: 2 },
  ]);
  const [listening, setListening] = useState(false); // State to track server listening state

  const [dashboardData, setDashboardData] = useState({})
  
  const dashboardWidth = 1280 * 0.6; // Calculate 60% of 1280
  const dashboardHeight = 800 * 0.6; // Calculate 60% of 800
  const rows = 10;
  const rowHeight = dashboardHeight / rows;

  const [ws, setWs] = useState(null);

  useEffect(() => {

    const loadLayout = async () => {
      try {
        const savedLayout = await fetchDashboardLayout(projectId);

        const initialData = {};
  
        savedLayout.forEach((item) => {
          // For each item, add { [item.i]: "" } to initialData
          initialData[item.i] = "TEST";  // Initialize with an empty string or any default value you want
        });

        console.log("[INITIAL DATA]: ", initialData)

        // Update the dashboardData state with the new initialData
        setDashboardData(initialData);

        setLayout(savedLayout || []);
      } catch (error) {
        console.error('Error fetching dashboard layout:', error);
      }
    };

    loadLayout();

    const webSocket = new WebSocket('ws://localhost:8080');
    webSocket.onopen = () => {
      console.log('WebSocket connection established');
      setWs(webSocket);
    };

    // webSocket.onmessage = (event) => {
    //   try {
    //     const data = JSON.parse(event.data);
    //     console.log('Received data:');
    
    //     if (data && data.message) {
    //       const parsedMessage = JSON.parse(data.message); // Parse the nested JSON string
    //       console.log('Parsed message:', parsedMessage);
    
    //       if (parsedMessage.data !== undefined) {
    //         console.log('Data:', parsedMessage.data);
    
    //         // Use the functional update for setDashboardData to ensure state consistency
    //         setDashboardData((prevDashboardData) => {
    //           // Clone the current state
    //           const newDashboardData = { ...prevDashboardData };
    //           console.log("[DASHBOARD DATA BEFORE UPDATE]: ", prevDashboardData);
    
    //           // Update the newDashboardData immutably
    //           Object.keys(parsedMessage.data).forEach((key) => {
    //             if (newDashboardData.hasOwnProperty(key)) {
    //               newDashboardData[key] = parsedMessage.data[key]; // Update the value
    //             }
    //           });
    
    //           console.log("[NEW DASHBOARD DATA]: ", newDashboardData);
    
    //           // Return the updated state
    //           return newDashboardData;
    //         });
    //       } else {
    //         console.error('Data property is missing in the message');
    //       }
    //     } else {
    //       console.error('Message property is missing in the received data');
    //     }
    //   } catch (error) {
    //     console.error('Error parsing WebSocket message:', error);
    //   }
    // };

    webSocket.onclose = () => {
      console.log('WebSocket connection closed');
      setListening(false); // Reset listening state on WebSocket close
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [projectId]);

  const startConnectivityTest = () => {
    if (ws) {
      setListening(true); // Set listening indicator when starting connectivity test
      //ws.send(JSON.stringify({ action: 'subscribe', topic: 'connectivity/test' }));
      //console.log('Sent subscription request to WebSocket server');
    } else {
      console.log('WebSocket connection not established');
    }
  };

  const endConnectivityTest = () => {
    if (ws) {
     // ws.send(JSON.stringify({ action: 'unsubscribe', topic: 'connectivity/test' }));
      //console.log('Sent unsubscription request to WebSocket server');
      setListening(false); // Reset listening state on test end
    } else {
      console.log('WebSocket connection not established');
    }
  };

  function updateDashboardLayout(event) {
    try {
      console.log(event)
      const data = event;
      console.log('Received data:', data);
  
      if (data && data.message) {
        const parsedMessage = JSON.parse(data.message); // Parse the nested JSON string
        console.log('Parsed message:', parsedMessage);
  
        if (parsedMessage.data !== undefined) {
          console.log('Data:', parsedMessage.data);
  
          // Use the functional update for setDashboardData to ensure state consistency
          setDashboardData((prevDashboardData) => {
            // Clone the current state
            const newDashboardData = { ...prevDashboardData };
            console.log("[DASHBOARD DATA BEFORE UPDATE]: ", prevDashboardData);
  
            // Update the newDashboardData immutably
            Object.keys(parsedMessage.data).forEach((key) => {
              if (newDashboardData.hasOwnProperty(key)) {
                newDashboardData[key] = parsedMessage.data[key]; // Update the value
              }
            });
  
            console.log("[NEW DASHBOARD DATA]: ", newDashboardData);
  
            // Return the updated state
            return newDashboardData;
          });
        } else {
          console.error('Data property is missing in the message');
        }
      } else {
        console.error('Message property is missing in the received data');
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }
  

  return (
    <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
  {/* Left Side: Dashboard Layout */}
  <div className=" flex flex-col md:flex-row w-full md:w-1/2 p-2 border" style={{ width: `${dashboardWidth}px`, height: `${dashboardHeight}px`, maxWidth: '100%', maxHeight: '100%', border: '2px solid gray' }}>
    <GridLayout
      layout={layout}
      cols={10}
      rowHeight={rowHeight}
      width={dashboardWidth}
      isDraggable={false} // Disable dragging
      isResizable={false} // Disable resizing
    >
      {layout.map((item) => {
        console.log("[DASHBOARD DATA LAYOUT]: ", dashboardData);

        return (
          <div key={item.i}>
            {item.i.startsWith('lineChart') && <LineChartComponent layoutId={item.i} data={dashboardData[item.i]} />}
            {item.i.startsWith('barChart') && <BarChartComponent layoutId={item.i} data={dashboardData[item.i]} />}
            {item.i.startsWith('singleValue') && <SingleValueComponent layoutId={item.i} value={dashboardData[item.i]} />}
            {item.i.startsWith('text') && <TextComponent layoutId={item.i} value={dashboardData[item.i]} />}
            {item.i.startsWith('table') && <TableComponent layoutId={item.i} data={dashboardData[item.i]} />}
          </div>
        );
      })}
    </GridLayout>
  </div>

  {/* Right Side: Connectivity Test Buttons and Instructions */}
  <div style={{ display: 'flex', flexDirection: 'column'}} className="flex-grow px-10">
    {/* Buttons at the Top */}
    <div className="flex justify-end">
      <BeginConnectivityTestButton beginConnectivityTest={startConnectivityTest} />
      <EndConnectivityTestButton endConnectivityTest={endConnectivityTest} />
    </div>

    {/* Instructions Below the Buttons */}
    <div>
      {listening && (
        <div>
          <div className="alert">
            <strong>Listening for MQTT messages...</strong>
          </div>
          <ConnectivityTestInstructions
            updateDashboardLayout={updateDashboardLayout}
            projectId={projectId}
            dashboardLayout={layout}
            projectDescription={projectDescription}
            projectName={projectName}
          />
        </div>
      )}
    </div>
  </div>
</div>

  );
}

export default ProjectTestDashboard;
