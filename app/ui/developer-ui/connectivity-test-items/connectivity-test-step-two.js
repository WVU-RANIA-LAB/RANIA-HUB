import React, { useState, useEffect } from 'react';

function ConnectivityTestStepTwo({ deviceId, dashboardLayout, deviceInfo }) {
  const [handshakeStatus, setHandshakeStatus] = useState('Waiting for handshake message...');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8080');
    webSocket.onopen = () => {
      console.log('WebSocket connection established');
      setWs(webSocket);
      webSocket.send(JSON.stringify({ action: 'subscribe', topic: 'test/handshake' }));
    };

    webSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received data:', data);

        if (data.topic === 'test/handshake' && data.message) {
          setHandshakeStatus(`Handshake message Received Successfully!`);
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
        ws.send(JSON.stringify({ action: 'unsubscribe', topic: 'test/handshake' }));
        ws.close();
      }
    };
  }, []);

  return (
    <div>
      <p>First, let's make sure your device can connect to the hub.</p>
      <p>The Hub is now listening for messages on topic 'test/handshake'.</p>
      <p>Uncomment the lines of code in the Handshake Example block of code.</p>
      <p>Run the code!</p>
      <p>Results:</p>
      <p>{handshakeStatus}</p>
    </div>
  );
}

export default ConnectivityTestStepTwo;
