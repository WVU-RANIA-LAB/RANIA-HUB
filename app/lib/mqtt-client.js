const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://localhost:1883'); // Connect to the broker

client.on('connect', () => {
  console.log('Connected to MQTT Broker');
  client.subscribe('your/topic', (err) => {
    if (!err) {
      console.log('Subscribed to your/topic');
    } else {
      console.log('Subscription error:', err);
    }
  });
});


module.exports = client;