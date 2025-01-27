import React, { useState } from 'react';
import { fetchDashboardLayout } from '@/app/lib/actions/developer-actions';

function ConnectivityTestStepOne({projectId, dashboardLayout, deviceInfo}) {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLanguageExtension, setSelectedLanguageExtension] = useState('');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    console.log(event.target.value)
    switch(event.target.value){
      case "Python":
        setSelectedLanguageExtension('py')
        break;
      default:
        setSelectedLanguageExtension('txt')
    }
    
  };

  const handleDownload = () => {
    const fileContent = generateFileContent(selectedLanguage);
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedLanguage}_mqtt_test_connectivity_code.${selectedLanguageExtension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateFileContent = (language) => {
    switch (language) {
      case 'JavaScript':
        return generateJavaScriptFile();
      case 'Python':
        return generatePythonFile();
      case 'Java':
        return generateJavaFile();
      default:
        return 'Language not supported.';
    }
  };

  const generateJavaScriptFile = () => {
    return `
     // JavaScript MQTT test connectivity code
  // ENSURE YOU HAVE THESE NODE LIBRARIES INSTALLED
  // npm install mqtt
  const mqtt = require('mqtt');
  const crypto = require('crypto');
  
  // If you are not running the Web App locally, ask your admin for this information
  const broker = "localhost";
  const port = 1883;
  const topicTestData = "data/update";
  const topicTestHandshake = "connection/request";
  
  const client = mqtt.connect(\`mqtt://\${broker}:\${port}\`);
  
  // Generate a nonce
  function generateNonce(length = 16) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }
  
  // Generate handshake packet
  function generateHandshakePacket(deviceId, deviceInfo) {
    const timestamp = new Date().toISOString();
    const nonce = generateNonce();
    return {
      deviceId: deviceId,
      timestamp: timestamp,
      nonce: nonce,
      deviceInformation: deviceInfo
    };
  }
  
  // Generate update packet
  function generateUpdatePacket(deviceId, updateInfo) {
    const timestamp = new Date().toISOString();
    const nonce = generateNonce();
    const data = \`\${deviceId}\${timestamp}\${nonce}\${JSON.stringify(updateInfo)}\`;
    console.log('data:', data);
    return JSON.stringify({
      deviceId: deviceId,
      timestamp: timestamp,
      nonce: nonce,
      data: updateInfo
    });
  }
  
  // Publish message
  function publishMessage(topic, packet) {
    client.publish(topic, packet);
  }
  
  // Example usage
  const deviceId = "update with a deviceId before using";
  
  // /// Handshake Example
  // This block demonstrates how to implement a connection handshake request, for when a resident end-user wants to connect the device to the care home hub
  
  // const deviceInfo = \${deviceInfo};
  
  // const handshakePacket = generateHandshakePacket(deviceId, deviceInfo);
  // publishMessage(topicTestHandshake, JSON.stringify(handshakePacket));
  // /// End Handshake Example
  
  // /// Data Send Example
  // Populate the data block below with whatever data you want to update in your hub GUI layout
  // Your gridLayoutID options are:
  // \${JSON.stringify(dashboardLayout.map(item => item.i))};
  
  // const data = {
  //   gridLayoutId: "Updated data value",
  // };
  
  // const updatePacket = generateUpdatePacket(deviceId, data);
  // publishMessage(topicTestData, updatePacket);
  // /// End Data Send Example
    `;
  };

  const generatePythonFile = () => {
    return (
`# Python MQTT test connectivity code
# ENSURE YOU HAVE THESE PYTHON LIBRARIES INSTALLED
import paho.mqtt.client as mqtt
import time
import random
import json
import string

# If you are not running the Web App locally, ask your admin for this information
broker = "localhost"
port = 1883
topicTestData = "data/update"
topicTestHandshake = "connection/request"

client = mqtt.Client()
client.connect(broker, port, 60)
 
def generate_nonce(length=16):
  return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def generate_handshake_packet(device_id, device_info):
  timestamp = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
  nonce = generate_nonce()
  handshake_packet = {
      "deviceId": device_id,
      "timestamp": timestamp,
      "nonce": nonce,
      "deviceInformation": device_info
  }
  
  return handshake_packet
  
def generate_update_packet(device_id, update_info):
  timestamp = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
  nonce = generate_nonce()
  data = f"{device_id}{timestamp}{nonce}{json.dumps(update_info, separators=(',', ':'))}"
  print('data: ', data)
  update_packet = {
    "deviceId": device_id,
    "timestamp": timestamp,
    "nonce": nonce,
    "data": update_info
  }
  return json.dumps(update_packet, separators=(',', ':'))
  
def publish_message(topic, update_packet):
  # Publish the update packet to the MQTT topic
  client.publish(topic, update_packet)
  
# Example usage
device_id = "update with a deviceId before using" 

#///Handshake Example
#This block demonstrates how to implement a connection handshake request, for when a resident end-user wants to connect the device to the care home hub

#device_info = ${deviceInfo}

# handshake_packet = generate_handshake_packet(device_id, device_info)
# publish_message(topicTestHandshake, json.dumps(handshake_packet, separators=(',', ':')))
#///End Handshake Example

#///Data Send Example
# Populate the data block below with whatever data you want to update in your hub GUI layout
# Your gridLayoutID options are:
# ${JSON.stringify(dashboardLayout.map(item => item.i))}
#data = {
#  "gridLayoutId": "Updated data value",
#}
  
#update_packet = generate_update_packet(device_id, data)
  
#publish_message(topicTestData, update_packet)
#///End Data Send Example
`
  )};
  

  const generateJavaFile = () => {
    return `  // Java MQTT test connectivity code
  // Ensure you have these Java libraries installed:
  // org.eclipse.paho.client.mqttv3 (You can add this using Maven or manually)

  import org.eclipse.paho.client.mqttv3.MqttClient;
  import org.eclipse.paho.client.mqttv3.MqttException;
  import org.eclipse.paho.client.mqttv3.MqttMessage;
  import java.nio.charset.StandardCharsets;
  import java.security.SecureRandom;
  import java.text.SimpleDateFormat;
  import java.util.Date;
  import java.util.Random;
  
  public class MqttTestConnectivity {
  
      private static final String BROKER = "tcp://localhost:1883";
      private static final String TOPIC_TEST_DATA = "data/update";
      private static final String TOPIC_TEST_HANDSHAKE = "connection/request";
  
      public static void main(String[] args) throws MqttException {
          MqttClient client = new MqttClient(BROKER, MqttClient.generateClientId());
          client.connect();
  
          // Example usage
          String deviceId = "update with a deviceId before using";
          
          // Handshake Example
          // String deviceInfo = ${deviceInfo};
          // String handshakePacket = generateHandshakePacket(deviceId, deviceInfo);
          // publishMessage(client, TOPIC_TEST_HANDSHAKE, handshakePacket);
          
          // Data Send Example
          // String data = "{\\"gridLayoutId\\": \\"Updated data value\\"}";
          // String updatePacket = generateUpdatePacket(deviceId, data);
          // publishMessage(client, TOPIC_TEST_DATA, updatePacket);
      }
  
      private static String generateNonce(int length) {
          Random random = new SecureRandom();
          StringBuilder nonce = new StringBuilder(length);
          String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (int i = 0; i < length; i++) {
              nonce.append(characters.charAt(random.nextInt(characters.length())));
          }
          return nonce.toString();
      }
  
      private static String generateTimestamp() {
          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
          return sdf.format(new Date());
      }
  
      private static String generateHandshakePacket(String deviceId, String deviceInfo) {
          String timestamp = generateTimestamp();
          String nonce = generateNonce(16);
          return String.format(
              "{\\"deviceId\\": \\"%s\\", \\"timestamp\\": \\"%s\\", \\"nonce\\": \\"%s\\", \\"deviceInformation\\": \\"%s\\"}",
              deviceId, timestamp, nonce, deviceInfo
          );
      }
  
      private static String generateUpdatePacket(String deviceId, String updateInfo) {
          String timestamp = generateTimestamp();
          String nonce = generateNonce(16);
          String data = deviceId + timestamp + nonce + updateInfo;
          System.out.println("data: " + data);
          return String.format(
              "{\\"deviceId\\": \\"%s\\", \\"timestamp\\": \\"%s\\", \\"nonce\\": \\"%s\\", \\"data\\": %s}",
              deviceId, timestamp, nonce, updateInfo
          );
      }
  
      private static void publishMessage(MqttClient client, String topic, String messageContent) throws MqttException {
          MqttMessage message = new MqttMessage(messageContent.getBytes(StandardCharsets.UTF_8));
          message.setQos(2);
          client.publish(topic, message);
      }
  }`;
  };

  const generateCFile = () => {
    return `
// C MQTT test connectivity code
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Simulated MQTT publish function
void publish_message(const char *topic, const char *message) {
    printf("Publishing to topic %s: %s\\n", topic, message);
}

char *generate_nonce(int length) {
    char *nonce = (char *)malloc(length + 1);
    const char charset[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (nonce) {
        for (int i = 0; i < length; i++) {
            nonce[i] = charset[rand() % (sizeof(charset) - 1)];
        }
        nonce[length] = '\\0';
    }
    return nonce;
}

void generate_handshake_packet(const char *device_id, const char *device_info, char *output) {
    time_t now;
    time(&now);
    char timestamp[20];
    strftime(timestamp, sizeof(timestamp), "%Y-%m-%dT%H:%M:%SZ", gmtime(&now));
    char *nonce = generate_nonce(16);

    sprintf(output, "{\\"deviceId\\": \\"%s\\", \\"timestamp\\": \\"%s\\", \\"nonce\\": \\"%s\\", \\"deviceInformation\\": \\"%s\\"}", 
            device_id, timestamp, nonce, device_info);
    free(nonce);
}

void generate_update_packet(const char *device_id, const char *update_info, char *output) {
    time_t now;
    time(&now);
    char timestamp[20];
    strftime(timestamp, sizeof(timestamp), "%Y-%m-%dT%H:%M:%SZ", gmtime(&now));
    char *nonce = generate_nonce(16);

    sprintf(output, "{\\"deviceId\\": \\"%s\\", \\"timestamp\\": \\"%s\\", \\"nonce\\": \\"%s\\", \\"data\\": %s}", 
            device_id, timestamp, nonce, update_info);
    free(nonce);
}

int main() {
    const char *device_id = "update with a deviceId before using";
    const char *device_info = "${deviceInfo}";

    // Example: Handshake Packet
    char handshake_packet[256];
    generate_handshake_packet(device_id, device_info, handshake_packet);
    publish_message("connection/request", handshake_packet);

    // Example: Data Update Packet
    char update_info[128] = "{\\"gridLayoutId\\": \\"Updated data value\\"}";
    char update_packet[256];
    generate_update_packet(device_id, update_info, update_packet);
    publish_message("data/update", update_packet);

    return 0;
}
    `;
  };

  return (
    <div>
      <p>Select the language for your MQTT test connectivity code file:</p>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="">Select Language</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
        <option value="C">C</option>
      </select>
      <button onClick={handleDownload} disabled={!selectedLanguage}>
        Download MQTT Test File
      </button>
    </div>
  );
}

export default ConnectivityTestStepOne;
