const WebSocket = require('ws');
const mqttClient = require('./mqtt-client'); // Assuming this is your MQTT client file

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.action === 'subscribe' && data.topic) {
      console.log(`Subscribing to topic: ${data.topic}`);
      mqttClient.subscribe(data.topic);
    }
    else if (data.action === 'unsubscribe' && data.topic) {
        console.log(`Unsubscribing to topic: ${data.topic}`);
        mqttClient.subscribe(data.topic);
      }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

mqttClient.on('message', (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
    handleIncomingMessage(topic, message.toString());
  });

const handleIncomingMessage = (topic, message) => {
    console.log(`MQTT message received on ${topic}: ${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ topic, message }));
      }
    });
  };



console.log('WebSocket server started on port 8080');
