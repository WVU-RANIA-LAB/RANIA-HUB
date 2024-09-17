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
    return `// JavaScript MQTT test connectivity code
      const mqtt = require('mqtt');
      const client = mqtt.connect('mqtt://broker.hivemq.com');

      client.on('connect', () => {
        console.log('Connected');
        client.subscribe('test/topic');
      });

      client.on('message', (topic, message) => {
        console.log(topic, message.toString());
      });`;
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
    return `// Java MQTT test connectivity code
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;

public class MqttTest {
  public static void main(String[] args) throws MqttException {
    MqttClient client = new MqttClient("tcp://broker.hivemq.com:1883", MqttClient.generateClientId());
    client.connect();

    client.subscribe("test/topic", (topic, msg) -> {
        byte[] payload = msg.getPayload();
        System.out.println(topic + ": " + new String(payload));
    });

    client.disconnect();
  }
}`;
  };

  return (
    <div>
      <p>Select the language for your MQTT test connectivity code file:</p>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="">Select Language</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
      </select>
      <button onClick={handleDownload} disabled={!selectedLanguage}>
        Download MQTT Test File
      </button>
    </div>
  );
}

export default ConnectivityTestStepOne;
