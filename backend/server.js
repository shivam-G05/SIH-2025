const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios"); // for optional polling
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const DataRoutes = require("./routes/Data");
const analysisRoutes = require("./routes/analysis");
const weatherRoute = require("./routes/weather.js");
const soilRoute = require("./routes/soil");
const espModule = require('./routes/esp'); // ensure path is correct

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/data", DataRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/weather", weatherRoute);
app.use("/api/soil", soilRoute);
app.use("/api/esp", espModule.router);
espModule.startPolling();

// ----------------------------
// Live soil moisture storage
// ----------------------------
let latestSoilMoisture = null;

// Optional: poll sensor directly if needed
app.get('/api/soil-moisture', async (req, res) => {
  try {
    // Replace with your actual sensor IP if you want to poll live
    const sensorIP = '10.130.195.204'; 
    const response = await axios.get(`http://${sensorIP}`);
    latestSoilMoisture = response.data; // update latest value in memory
    res.json({ moisture: latestSoilMoisture });
  } catch (err) {
    console.error('Poll error:', err.message);
    res.status(500).json({ error: 'Device unreachable' });
  }
});

// New route: always return latest ESP reading
app.get('/api/soil-moisture/latest', (req, res) => {
  if (latestSoilMoisture !== null) {
    res.json({ moisture: latestSoilMoisture });
  } else {
    res.status(404).json({ error: 'No data yet' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 10.130.195.204:${PORT}`);
});
