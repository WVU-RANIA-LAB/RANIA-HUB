'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { fetchDevices, fetchDashboardLayout, fetchDeviceData } from '@/app/lib/data/resident-data';
import { BeginConnectionButton } from '../../resident-action-buttons';
import DeviceCard from './deviceCard';

import LineChartComponent from '@/app/ui/developer-ui/project-dashboard-components/LineChartComponent';
import BarChartComponent from '@/app/ui/developer-ui/project-dashboard-components/BarChartComponent';
import SingleValueComponent from '@/app/ui/developer-ui/project-dashboard-components/SingleValueComponent';
import TableComponent from '@/app/ui/developer-ui/project-dashboard-components/TableComponent';
import TextComponent from '@/app/ui/developer-ui/project-dashboard-components/TextComponent';

const ResponsiveGridLayout = WidthProvider(Responsive);

function DevicesDashboard() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedDeviceData, setSelectedDeviceData] = useState(null);
  const [deviceLayout, setDeviceLayout] = useState([]);

  const [ws, setWs] = useState(null);
  const [listening, setListening] = useState(false);

  // Fetch devices on component mount
  useEffect(() => {
    const loadDevices = async () => {
      try {
        const connectedDevices = await fetchDevices();
        console.log('ConnectedDevices: ', connectedDevices);
        setDevices(connectedDevices);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    loadDevices();
  }, []);

  // Initialize WebSocket connection
  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8080');
    
    webSocket.onopen = () => {
      console.log('WebSocket connection established');
      setWs(webSocket);
    };

    webSocket.onclose = () => {
      console.log('WebSocket connection closed');
      setListening(false);
    };

    webSocket.onmessage = async function(event) {
      const data = JSON.parse(event.data);

      // Check for the alert message type
      if (data.type === 'DATA_UPDATE_ALERT') {
        console.log('Data update alert received');
        if (selectedDevice) {
          await updateDeviceLayout(selectedDevice.deviceId); // Refresh the device layout
        }
      }
    };

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [selectedDevice]); // Only re-run if selectedDevice changes

  // Update device layout
  const updateDeviceLayout = useCallback(async (deviceId) => {
    try {
      const updatedLayout = await fetchDashboardLayout(deviceId);
      console.log('Updated Layout: ', updatedLayout[0].deviceDashboardLayout);
      setDeviceLayout(updatedLayout[0].deviceDashboardLayout);

      const updatedDeviceData = await fetchDeviceData(deviceId);
      console.log('Updated Device Data: ', updatedDeviceData);
      setSelectedDeviceData(updatedDeviceData);
    } catch (error) {
      console.error('Error updating device layout:', error);
    }
  }, []); // useCallback to memoize the function

  // Start device connection
  const startDeviceConnection = () => {
    if (ws) {
      setListening(true);
      ws.send(JSON.stringify({ action: 'subscribe', topic: 'connection/request' }));
      console.log('Sent connection/request subscription request to WebSocket server');
      
      // Set a 30-second timeout to call endDeviceConnection
      setTimeout(() => {
        endDeviceConnection();
      }, 30000); // 30000 milliseconds = 30 seconds
    } else {
      console.log('WebSocket connection not established');
    }
  };

  // End device connection
  const endDeviceConnection = () => {
    if (ws) {
      ws.send(JSON.stringify({ action: 'unsubscribe', topic: 'connection/request' }));
      console.log('Sent unsubscription request to WebSocket server');
      setListening(false);
    } else {
      console.log('WebSocket connection not established');
    }
  };

  const layout = devices.map((device, index) => ({
    i: device.deviceId,
    x: index % 4,
    y: Math.floor(index / 4),
    w: 1,
    h: 1,
  }));

  const dashboardWidth = 1280 * 0.6; // Calculate 60% of 1280
  const dashboardHeight = 800 * 0.6; // Calculate 60% of 800
  const rows = 10;
  const rowHeight = dashboardHeight / rows;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          width: selectedDevice ? '0%' : '100%',
          opacity: selectedDevice ? '0%' : '100%',
          overflow: 'hidden',
        }}
      >
        <BeginConnectionButton beginConnection={startDeviceConnection} />
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 1 }}
          rowHeight={150}
          isDraggable={false}
          isResizable={false}
        >
          {devices.map((device) => (
            <div key={device.deviceId} className="device-item">
              <DeviceCard
                deviceDescription={device.deviceDescription}
                deviceName={device.deviceName}
                onClick={() => {
                  console.log('Device selected:', device.deviceId); // Debugging
                  setSelectedDevice(device);
                  updateDeviceLayout(device.deviceId);
                }}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
      <div
        style={{
          width: selectedDevice ? '100%' : '0%',
          overflow: 'hidden',
          padding: selectedDevice ? '20px' : '0px',
        }}
      >
        {selectedDevice && (
          <div>
            <h2>{selectedDevice.deviceName}</h2>
            <p>{selectedDevice.deviceDescription}</p>
            <button onClick={() => setSelectedDevice(null)}>Close</button>
            {/* Add more details or layout for the selected device here */}
            <GridLayout
              layout={deviceLayout}
              cols={10}
              rowHeight={rowHeight}
              width={dashboardWidth}
              isDraggable={false} // Disable dragging
              isResizable={false} // Disable resizing
              style={{border: '1px solid black'}}
            >
              {deviceLayout.map((item) => (
                <div key={item.i}>
                  {item.i.startsWith('lineChart') && <LineChartComponent layoutId={item.i} />}
                  {item.i.startsWith('barChart') && <BarChartComponent layoutId={item.i} />}
                  {item.i.startsWith('singleValue') && <SingleValueComponent layoutId={item.i} value={selectedDeviceData?.singleValueData?.find(data => data.i === item.i)?.data} />}
                  {item.i.startsWith('text') && <TextComponent layoutId={item.i} value={selectedDeviceData?.textData?.find(data => data.i === item.i)?.data} />}
                  {item.i.startsWith('table') && <TableComponent layoutId={item.i} />}
                </div>
              ))}
            </GridLayout>
          </div>
        )}
      </div>
    </div>
  );
}

export default DevicesDashboard;
