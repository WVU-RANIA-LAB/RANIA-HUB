require('dotenv').config();
const WebSocket = require('ws');
const mqttClient = require('./mqtt-client'); // Assuming this is your MQTT client file
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const wss = new WebSocket.Server({ port: 8080 });
const secretKey = "your_secret_key";

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.action === 'subscribe' && data.topic) {
      console.log(`Subscribing to topic: ${data.topic}`);
      mqttClient.subscribe(data.topic);
    } else if (data.action === 'unsubscribe' && data.topic) {
      console.log(`Unsubscribing from topic: ${data.topic}`);
      mqttClient.unsubscribe(data.topic); // Fixed the typo here
    } else if(data.action === 'publish' && data.topic) {
      mqttClient.publish(data.topic, data.message.toString(), (err) => {
        if (err) {
          console.error(`Failed to publish response to ${data.topic}:`, err);
        } else {
          console.log(`Response sent to ${data.topic}:`, "responseMessage");
        }
      });

    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

mqttClient.on('message', async (topic, message) => {
  if (topic === 'connection/request') {
    const handshakePacket = JSON.parse(message.toString());
    if (validateHandshakePacket(handshakePacket, secretKey)) {
      console.log('Handshake packet is valid:', handshakePacket);
      await addDeviceInformation(handshakePacket);
    } else {
      console.log('Invalid handshake packet');
    }
  } else if(topic === 'connection/disconnect'){
    disconnectDevice(JSON.parse(message).deviceId)
  }
  
  else if (topic === 'test/handshake' || topic ==='test/data') {
    console.log(`Received message on ${topic}: ${message.toString()}`);
    handleConnectivityTest(topic, message.toString());

    mqttClient.publish(topic+'/response', topic+'/response', (err) => {
      if (err) {
        console.error(`Failed to publish response to ${topic}:`, err);
      } else {
        console.log(`Response sent to ${topic}/response:`, "responseMessage");
      }
    });
    
  }
  
  else if (topic === 'data/update') {
    console.log(`Received message on ${topic}: ${message.toString()}`)
    const deviceVerified = await verifyDevice(JSON.parse(message).deviceId)
    if(deviceVerified){
      const updated = await updateData(JSON.parse(message).deviceId, JSON.parse(message).data)
      if(updated){
        dataUpdateAlert()
      }
    }
  }
  
});

const handleConnectivityTest = (topic, message) => {
  console.log(`MQTT message received on ${topic}: ${message}`);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ topic, message }));
    }
  });
};

function generateChecksum(data, secretKey) {
  console.log('generated checksum: ', crypto.createHmac('sha256', data + secretKey).update(data).digest('hex'))
  return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
}

function validateHandshakePacket(packet, secretKey) {
  const { deviceId, timestamp, nonce, deviceInformation, checksum } = packet;
  const deviceInformationString = JSON.stringify(deviceInformation);
  const data = `${deviceId}${timestamp}${nonce}${deviceInformationString}`;
  console.log("parsed data: ", data)
  const calculatedChecksum = generateChecksum(data, secretKey);
  return checksum === calculatedChecksum;
}

async function verifyDevice(deviceId) {
  //verify requesting deviceId with hub
  console.log("Find: ",deviceId)
  try {
    // Find the device in the database
    const device = await prisma.deviceACL.findUnique({
      where: {
        deviceId: deviceId,
      },
    });

    console.log(device)

    // If the device is not found, return false
    if (!device) {
      console.log(`Device with ID ${deviceId} not found`);
      return false;
    }
    else{
      return true;
    }
  } catch (error) {
    console.error('Error verifying device:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}


async function updateData(deviceId, dataToUpdate) {
  try {
    // Iterate over the entries in the dataToUpdate object
    for (const [key, value] of Object.entries(dataToUpdate)) {
      // Determine the type of data based on the key
      const dataType = key.replace(/[0-9]/g, ''); // Extract the type from the key (e.g., 'textValue' or 'singleValue')
      
      if (dataType === 'textValue') {
        // Update the textValue data
        await prisma.textData.updateMany({
          where: {
            deviceId: deviceId, // Match deviceId
            i: key, // Match the identifier key
          },
          data: {
            data: value,
          },
        });
      } else if (dataType === 'singleValue') {
        // Update the singleValue data
        await prisma.singleValueData.updateMany({
          where: {
            deviceId: deviceId, // Match deviceId
            i: key, // Match the identifier key
          },
          data: {
            data: value.toString(),
          },
        });
      } else {
        console.warn(`Unknown data type: ${dataType}`);
      }
    }

    console.log('Data updated successfully');
    return true
  } catch (error) {
    console.error('Error updating data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

function dataUpdateAlert() {
  // Define the alert message to send to clients
  const alertMessage = {
    type: 'DATA_UPDATE_ALERT', // Custom type to identify the alert
    message: 'Data has been updated. Please refresh the data.',
  };

  // Send the alert to all connected WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(alertMessage));
    }
  });
}

async function addDeviceInformation(deviceInfo) {
  try {
    // Check if the device already exists in the ACL
    const existingDevice = await prisma.deviceACL.findUnique({
      where: {
        deviceId: deviceInfo.deviceId,
      },
    });

    if (existingDevice) {
      console.log(`Device with ID ${deviceInfo.deviceId} already exists in the ACL.`);
      return; // Exit the function to avoid adding duplicate device information
    }

    // If the device does not exist, create a new entry in the ACL
    const newDevice = await prisma.deviceACL.create({
      data: {
        deviceId: deviceInfo.deviceId,
        deviceName: deviceInfo.deviceInformation.metadata.deviceName,
        deviceDescription: deviceInfo.deviceInformation.metadata.description,
        deviceDashboardLayout: deviceInfo.deviceInformation.layout,
      },
    });
    console.log('Device information added:', newDevice);

    // Iterate through the device dashboard layout and create appropriate documents
    for (const item of deviceInfo.deviceInformation.layout) {
      const dataType = item.i.replace(/[0-9]/g, '');
      switch (dataType) {
        case 'textValue':
          await prisma.textData.create({
            data: {
              deviceId: newDevice.deviceId,
              i: item.i,
              data: "_"
            },
          });
          break;
        case 'singleValue':
          await prisma.singleValueData.create({
            data: {
              deviceId: newDevice.deviceId,
              i: item.i,
              data: "0"
            },
          });
          break;
        // Add more cases if you have other collections
        default:
          console.warn(`Unknown layout item type: ${dataType}`);
      }
    }
  } catch (error) {
    console.error('Error adding device information:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function disconnectDevice(deviceId) {
  try {
    // Check if the device exists in the ACL
    const existingDevice = await prisma.deviceACL.findUnique({
      where: {
        deviceId: deviceId,
      },
    });

    if (!existingDevice) {
      console.log(`Device with ID ${deviceId} does not exist in the ACL.`);
      return; // Exit the function if the device does not exist
    }

    // Delete associated textData entries
    await prisma.textData.deleteMany({
      where: {
        deviceId: deviceId,
      },
    });

    // Delete associated singleValueData entries
    await prisma.singleValueData.deleteMany({
      where: {
        deviceId: deviceId,
      },
    });

    // Delete the device entry from the ACL
    const deletedDevice = await prisma.deviceACL.delete({
      where: {
        deviceId: deviceId,
      },
    });
    console.log('Device information removed:', deletedDevice);
  } catch (error) {
    console.error('Error removing device information:', error);
  } finally {
    await prisma.$disconnect();
  }
}



console.log('WebSocket server started on port 8080');
