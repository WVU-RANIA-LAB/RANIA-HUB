# Device Information

## Relevant Files

- [`app/ui/add-device-form.tsx`](../app/ui/add-device-form.tsx)
- [`app/ui/delete-device-form.tsx`](../app/ui/delete-device-form.tsx)
- [`app/ui/edit-device-from.tsx`](../app/ui/edit-device-from.tsx)
- [`app/ui/device-status.tsx`](../app/ui/device-status.tsx)
- [`app/ui/device-status-btn.tsx`](../app/ui/device-status-btn.tsx)
- [`app/lib/actions/device-actions.ts`](../app/lib/actions/device-actions.ts)
- [`app/lib/data/resident-data.ts`](../app/lib/data/resident-data.ts)
- [`app/(dashboards)/resident-dashboard/devices/page.tsx`](<../app/(dashboards)/resident-dashboard/devices/page.tsx>)

## Known Bugs

- PowerOn and PowerOff buttons only work once, when the React state is empty/null. Once each button is pressed, they will only return the values from the first time they were pressed and will not send the POST requests again.

## Future Work Needed

- Switch from HTTP to HTTPS
- Standardize among other groups the methodology for sending and receiving HTTP/HTTPS requests. E.g., what is the return type, how are the functions called, etc.
- Fix the edit device form to accept input (very new bug, worked previously)

## Breakdown of File Structure

### UI

This folder contains the client-side files for objects the user interacts with, such as the forms and buttons that take user input. These files call the functions in `device-actions`.

### Lib

This folder contains the server-side functions for CRUD involving devices.

- `resident-data.ts` contains one function, `fetchDevicesByResident`, which returns a list of all the devices belonging to a particular resident.
- `device-actions.ts` contains the functions for adding, editing, and deleting a device; getting the device status via GET request (HTTP) and updating the device status via POST request (HTTP).

### Resident-dashboard/devices

This directory is where the main page for devices is located. It contains the Manage Devices page and shows a table of all the devices belonging to the user. Client-side elements from the UI folder are called here to allow for user interaction.

## Device Code

The following is the code for the device that was used to develop and test HTTP requests.

```python
!pip install schedule

from flask import Flask, request
import schedule
import time

app = Flask(__name__)

# Define initial schedule
schedule_days = [False] * 7  # Sunday-Saturday
schedule_times = [False] * 24  # 24 hours

device_on = False

def check_schedule():
    global device_on
    current_time = time.localtime()
    if schedule_days[current_time.tm_wday] and schedule_times[current_time.tm_hour]:
        device_on = True
    else:
        device_on = False

def set_schedule_days(days):
    global schedule_days
    schedule_days = days

def set_schedule_times(times):
    global schedule_times
    schedule_times = times

@app.route('/set_days', methods=['POST'])
def set_days():
    days = request.json['days']
    set_schedule_days(days)
    return 'Schedule days updated successfully'

@app.route('/set_times', methods=['POST'])
def set_times():
    times = request.json['times']
    set_schedule_times(times)
    return 'Schedule times updated successfully'

@app.route('/manual_on', methods=['POST'])
def manual_on():
    global device_on
    device_on = True
    return 'Device turned on manually'

@app.route('/manual_off', methods=['POST'])
def manual_off():
    global device_on
    device_on = False
    return 'Device turned off manually'

@app.route('/status', methods=['GET'])
def status():
    return {'device_on': device_on}

if __name__ == '__main__':
    check_schedule()  # Initial check
    schedule.every(1).minutes.do(check_schedule)  # Check schedule every minute

    # Start Flask app
    app.run(debug=True)
```

- The following code can be used to control the Python device when it is running to test its functionality outside of the RANIA Hub.

```
import requests


# Example to set schedule days
url = 'http://127.0.0.1:5000/set_days'
data = {'days': [True, True, False, False, False, False, True]}  # Monday, Tuesday, Sunday
response = requests.post(url, json=data)
print(response.text)


# Example to set schedule times
url = 'http://127.0.0.1:5000/set_times'
data = {'times': [True, True, False, False, False, False, True, True, True, True, True, True, True, True, True, True, True, True, True, True, True, True, True]}
response = requests.post(url, json=data)
print(response.text)


# Example to turn on manually
url = 'http://127.0.0.1:5000/manual_on'
response = requests.post(url)
print(response.text)


# Example to check status
url = 'http://127.0.0.1:5000/status'
response = requests.get(url)
print(response.json())

```

- The following steps can be used to run the device in a Linux environment
  - Install the necessary Python3 packages
  - Add this exact line to the top of the the device code
    ```
    #!/usr/bin/env python3
    ```
  - Give the Python file the appropriate permissions to execute
    ```
    chmod 755 [python-file]
    ```
  - Run the Python file
    ```
    ./python-file
    ```
  - The device will begin listening on localhost and a specific port (e.g. 5000)
