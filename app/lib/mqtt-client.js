const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://localhost:1883'); // Connect to the broker

client.on('connect', () => {
  console.log('Connected to MQTT Broker');
  client.subscribe('data/#', (err) => {
    if (err) {
      console.error(`Failed to subscribe to topic data/#:`, err);
    } else {
      console.log(`Subscribed to topic data/#`);
    }
  });
});


module.exports = client;