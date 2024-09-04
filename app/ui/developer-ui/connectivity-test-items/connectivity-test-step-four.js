import React, { useState, useEffect } from 'react';

function ConnectivityTestStepFour({}) {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8080');
    webSocket.onopen = () => {
      console.log('WebSocket connection established');
      setWs(webSocket);
      webSocket.send(JSON.stringify({ action: 'subscribe', topic: 'test/data/to-project' }));
    };

    webSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (ws) {
        ws.send(JSON.stringify({ action: 'unsubscribe', topic: 'test/data/to-project' }));
        ws.close();
      }
    };
  }, []);

  const handlePublish = () => {
    if (ws) {
      const message = JSON.stringify({
        action: 'publish',
        topic: 'test/data/to-project',
        message: 'This is a test message from the WebSocket client.'
      });
      ws.send(message);
      console.log('Message published to test/data/to-project');
    }
  };

  const handleDownload = () => {
    const fileContent = generatePythonFile();
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `py_mqtt_test_receive_code.py`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generatePythonFile = () => {
    return (
`import paho.mqtt.client as mqtt
import json

# Define the MQTT broker details
broker_url = "localhost"
broker_port = 1883

# Define the topics to subscribe to
response_topics = [
    'test/handshake/response',
    'test/data/response',
    'test/data/to-project',
]

# The callback for when the client receives a connection acknowledgment from the broker
def on_connect(client, userdata, flags, rc):
    print(f"Connected to MQTT broker with result code {rc}")
    
    # Subscribe to the response topics
    for topic in response_topics:
        client.subscribe(topic)
        print(f"Subscribed to {topic}")

# The callback for when a message is received from the broker
def on_message(client, userdata, msg):
    print(f"Received message on {msg.topic}: {msg.payload.decode()}")
    
    # Handle different topics
    if msg.topic in ['test/handshake/response', 'test/data/response']:
        response = json.loads(msg.payload.decode())
        print(f"Connectivity test response received for {msg.topic}: {response}")
    
    elif msg.topic == 'test/data/to-project':
        print(f"Connectivity test received for {msg.topic}: {msg.payload.decode()}")
    
    elif msg.topic == 'data/update/response':
        response = json.loads(msg.payload.decode())
        if response.get('status') == 'update_success':
            print(f"Data updated successfully for device: {response['deviceId']}")
        else:
            print(f"Data update failed: {response.get('message')}")

# Create an MQTT client instance
client = mqtt.Client()

# Assign the callback functions
client.on_connect = on_connect
client.on_message = on_message

# Connect to the MQTT broker
client.connect(broker_url, broker_port, 60)

# Start the MQTT client loop (this runs in the background)
client.loop_forever()
`
  )};

  return (
    <div>
      <p>Great! Now, let's make sure your project can receive data.</p>
      <p>Download and run the sample client on your project</p>
      <button onClick={handleDownload}>
        Download MQTT Test File
      </button>
      <button onClick={handlePublish}>Publish Test Message</button>
    </div>
  );
}

export default ConnectivityTestStepFour;
