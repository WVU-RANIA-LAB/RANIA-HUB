const aedes = require('aedes')();
const { createServer } = require('net');

const port = 1883;

// Create a TCP server
const server = createServer(aedes.handle);

server.listen(port, function () {
  console.log(`MQTT broker started and listening on port ${port}`);
});

// Handle client connection
aedes.on('client', function (client) {
  console.log(`Client connected: ${client ? client.id : 'Unknown'}`);
});

// Handle client disconnection
aedes.on('clientDisconnect', function (client) {
  console.log(`Client disconnected: ${client ? client.id : 'Unknown'}`);
});

// Handle client subscription
aedes.on('subscribe', function (subscriptions, client) {
  console.log(`Client ${client ? client.id : 'Unknown'} subscribed to ${subscriptions.map(s => s.topic).join(', ')}`);
});

// Handle client unsubscription
aedes.on('unsubscribe', function (subscriptions, client) {
  console.log(`Client ${client ? client.id : 'Unknown'} unsubscribed from ${subscriptions.join(', ')}`);
});

// Handle published message
aedes.on('publish', function (packet, client) {
  if (client) {
    console.log(`Message from ${client.id}: ${packet.topic} - ${packet.payload.toString()}`);
  } else {
    console.log(`Broker published message: ${packet.topic} - ${packet.payload.toString()}`);
  }
});
