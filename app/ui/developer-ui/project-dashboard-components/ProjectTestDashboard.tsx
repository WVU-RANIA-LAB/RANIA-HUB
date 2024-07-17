'use client';

import React, { useState, useEffect } from 'react';

import GridLayout from 'react-grid-layout';
import LineChartComponent from './LineChartComponent';
import BarChartComponent from './BarChartComponent';
import SingleValueComponent from './SingleValueComponent';
import TableComponent from './TableComponent';
import TextComponent from './TextComponent';

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
  const [mqttMessage, setMqttMessage] = useState<string | null>(null); // State to store MQTT message
  const [description, setDescription] = useState<string | null>(null); // State to store MQTT message
  const [data, setData] = useState<string | null>(null); // State to store MQTT message
  
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


  const dashboardWidth = 1280 * 0.6; // Calculate 60% of 1280
  const dashboardHeight = 800 * 0.6; // Calculate 60% of 800
  const rows = 10;
  const rowHeight = dashboardHeight / rows;

  const [ws, setWs] = useState(null);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8080');
    webSocket.onopen = () => {
      console.log('WebSocket connection established');
      setWs(webSocket);
    };

    webSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received data:', data);
    
        if (data && data.message) {
          const parsedMessage = JSON.parse(data.message); // Parse the nested JSON string
          console.log('Parsed message:', parsedMessage);
    
          if (parsedMessage.data !== undefined) {
            console.log('Data:', parsedMessage.data);
            setData(parsedMessage.data)
          }
          else if (parsedMessage.description !== undefined){
            setDescription(parsedMessage.description)
          } else {
            console.error('Data property is missing in the message');
          }
        } else {
          console.error('Message property is missing in the received data');
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    

    webSocket.onclose = () => {
      console.log('WebSocket connection closed');
      setListening(false); // Reset listening state on WebSocket close
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const startConnectivityTest = () => {
    if (ws) {
      setListening(true); // Set listening indicator when starting connectivity test
      ws.send(JSON.stringify({ action: 'subscribe', topic: 'connectivity/test' }));
      console.log('Sent subscription request to WebSocket server');
    } else {
      console.log('WebSocket connection not established');
    }
  };

  const endConnectivityTest = () => {
    if (ws) {
      ws.send(JSON.stringify({ action: 'unsubscribe', topic: 'connectivity/test' }));
      console.log('Sent unsubscription request to WebSocket server');
      setListening(false); // Reset listening state on test end
    } else {
      console.log('WebSocket connection not established');
    }
  };

  return (
    <div>
      <div className="flex space-x-2 mb-2" style={{ alignItems: 'center' }}>
        <BeginConnectivityTestButton beginConnectivityTest={startConnectivityTest} />
        <EndConnectivityTestButton endConnectivityTest={endConnectivityTest} />
      </div>
      <div>
      {listening && <div className="listening-indicator">Listening for MQTT messages...</div>}

      </div>
      <div style={{ width: `${dashboardWidth}px`, height: `${dashboardHeight}px`, maxWidth: '100%', maxHeight: '100%', border: '2px solid gray' }}>
        <GridLayout
          layout={layout}
          cols={10}
          rowHeight={rowHeight}
          width={dashboardWidth}
          isDraggable={false} // Disable dragging
          isResizable={false} // Disable resizing
        >
          {layout.map((item) => (
            <div key={item.i}>
              {item.i.startsWith('lineChart') && <LineChartComponent layoutId={item.i}/>}
              {item.i.startsWith('barChart') && <BarChartComponent layoutId={item.i}/>}
              {item.i.startsWith('singleValue') && <SingleValueComponent layoutId={item.i} value = {data}/>}
              {item.i.startsWith('text') && <TextComponent layoutId={item.i} value={description}/>}
              {item.i.startsWith('table') && <TableComponent layoutId={item.i}/>}
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
}

export default ProjectTestDashboard;
