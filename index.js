// Real-Time Sensor Data Logger

const fs = require('fs');
const path = require('path');

// Log file path
const logFile = path.join(__dirname, 'sensor_data_log.txt');

// Function to log sensor data
function logSensorData(sensor, value) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${sensor}: ${value}\n`;
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
}

// Simulated sensors
const sensors = ['Temperature', 'Humidity', 'Pressure', 'Light', 'Motion'];

// Function to generate random sensor values
function getRandomSensorValue(sensor) {
    switch (sensor) {
        case 'Temperature': return (Math.random() * 30 + 10).toFixed(2) + '°C';
        case 'Humidity': return (Math.random() * 50 + 30).toFixed(2) + '%';
        case 'Pressure': return (Math.random() * 20 + 980).toFixed(2) + ' hPa';
        case 'Light': return (Math.random() * 1000).toFixed(2) + ' lux';
        case 'Motion': return Math.random() > 0.5 ? 'Detected' : 'None';
        default: return 'Unknown';
    }
}

function getRandomSensor() {
    return sensors[Math.floor(Math.random() * sensors.length)];
}

// Function to log random sensor data
function logRandomSensorReading() {
    const sensor = getRandomSensor();
    const value = getRandomSensorValue(sensor);
    logSensorData(sensor, value);
    console.log(`Sensor Reading - ${sensor}: ${value}`);
}

// Schedule sensor data logging
setInterval(logRandomSensorReading, 3000); // Every 3 seconds

// Initial log message
logSensorData('SYSTEM', 'Sensor Data Logger started.');
console.log('Sensor Data Logger started.');

// Stop after 1 minute
setTimeout(() => {
    logSensorData('SYSTEM', 'Sensor Data Logger stopped.');
    console.log('Sensor Data Logger stopped.');
    process.exit(0);
}, 60000);
