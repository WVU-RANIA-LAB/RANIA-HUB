const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://localhost:1883'); // Connect to the broker

client.on('connect', () => {
  console.log('Connected to MQTT Broker');
  client.subscribe('data/update', (err) => {
    if (err) {
      console.error(`Failed to subscribe to topic data/update:`, err);
    } else {
      console.log(`Subscribed to topic data/update`);
    }
  });
});


module.exports = client;