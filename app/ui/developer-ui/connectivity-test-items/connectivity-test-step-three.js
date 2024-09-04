import React, { useState, useEffect } from 'react';

function ConnectivityTestStepThree({updateDashboardLayout}) {
  const [dataStatus, setDataStatus] = useState('Waiting for data message...');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8080');
    webSocket.onopen = () => {
      console.log('WebSocket connection established');
      setWs(webSocket);
      webSocket.send(JSON.stringify({ action: 'subscribe', topic: 'test/data' }));
    };

    webSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received data:', data);

        if (data.topic === 'test/data' && data.message) {
          setDataStatus(`Data Received Successfully!`);
          updateDashboardLayout(data)
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    webSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (ws) {
        ws.send(JSON.stringify({ action: 'unsubscribe', topic: 'test/data' }));
        ws.close();
      }
    };
  }, []);
  return (
    <div>
      <p>Great! Now, let's make sure your project can send data.</p>
      <p>Re-comment the lines of code in the Handshake Example block of code</p>
      <p>Uncomment the lines of code in the Data Send Example block of code</p>
      <p>Run the code!</p>
      <p>Results:</p>
      <p>{dataStatus}</p>
    </div>
  );
}

export default ConnectivityTestStepThree;
