const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON and form-data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data storage (in-memory for simplicity)
let phoneData = {
  batteryLevel: 'N/A',
  temperature: 'N/A',
  notification: 'No new notifications',
};

// Route to handle data from the Flutter app
app.post('/update', (req, res) => {
  const { batteryLevel, temperature, notification } = req.body;

  // Update stored data
  phoneData.batteryLevel = batteryLevel;
  phoneData.temperature = temperature;
  phoneData.notification = notification;

  res.status(200).send('Data received');
});

// Route to get the latest phone data
app.get('/data', (req, res) => {
  res.json(phoneData);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
