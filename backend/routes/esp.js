// backend/routes/esp.js
const mongoose = require('mongoose');

const express = require('express');
const axios = require('axios');
const router = express.Router();
const Data = require('../models/data'); // adjust path if needed
require('dotenv').config();

const ESP_URL = process.env.ESP_URL;
const ESP_POLL = process.env.ESP_POLL === 'true';
const ESP_POLL_INTERVAL_MS = Number(process.env.ESP_POLL_INTERVAL_MS) || 5000;
const ESP_DEFAULT_USER_ID = process.env.ESP_DEFAULT_USER_ID;
const ESP_PUSH_SECRET = process.env.ESP_PUSH_SECRET;

// --------------------
// In-memory latest reading
// --------------------
let latestSoilMoisture = null;

// ---------- PUSH endpoint (ESP -> backend) ----------
// router.post("/push", async (req, res) => {
//   try {
//     const { moisture } = req.body;

//     const newData = new Data({
//       userId: new mongoose.Types.ObjectId("68d6bf2a281fad871f742801"),
//       sensorReadings: { moisture }
//     });

//     await newData.save();

//     // update in-memory latest value
//     latestSoilMoisture = moisture;

//     res.json({ status: "ok", data: newData });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: err.message });
//   }
// });
// ---------- PUSH endpoint (ESP -> backend) ----------
router.post("/push", async (req, res) => {
  try {
    const { moisture } = req.body;

    // update in-memory latest value only (no DB save)
    latestSoilMoisture = moisture;

    res.json({ status: "ok", latestMoisture: latestSoilMoisture });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});



// ---------- public latest reading (no auth) ----------
router.get('/latest/public', async (req, res) => {
  try {
    const uid = req.query.userId || ESP_DEFAULT_USER_ID;
    if (!uid) return res.status(400).json({ error: 'userId required (or set ESP_DEFAULT_USER_ID)' });

    const latest = await Data.findOne({ userId: uid }).sort({ createdAt: -1 }).lean();
    if (!latest) return res.status(404).json({ error: 'No readings yet' });
    return res.json(latest);
  } catch (err) {
    console.error('ESP latest error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// ---------- new in-memory latest route ----------
router.get('/latest', (req, res) => {
  if (latestSoilMoisture !== null) {
    res.json({ moisture: latestSoilMoisture });
  } else {
    res.status(404).json({ error: "No data yet" });
  }
});

// ---------- Polling logic ----------
let pollTimer = null;

async function parseValueFromHtml(html) {
  const m1 = html.match(/Raw\s*Value\s*[:\-]?\s*(\d{1,5})/i);
  if (m1) return Number(m1[1]);

  const m2 = html.match(/Moisture\s*[:\-]?\s*(\d{1,5})/i);
  if (m2) return Number(m2[1]);

  const m3 = html.match(/(\d{2,5})/);
  if (m3) return Number(m3[1]);

  return null;
}

// async function pollOnce() {
//   if (!ESP_URL) {
//     console.warn('ESP_URL not set, skipping poll');
//     return;
//   }
//   try {
//     const r = await axios.get(ESP_URL, { timeout: 3000 });
//     const html = r.data;
//     const value = await parseValueFromHtml(html);
//     if (value === null) {
//       console.log('Poll: could not parse value from ESP HTML');
//       return;
//     }
//     if (!ESP_DEFAULT_USER_ID) {
//       console.log('Poll: ESP_DEFAULT_USER_ID not set, not saving polled value:', value);
//       return;
//     }

//     // Save to DB
//     const doc = new Data({
//       userId: ESP_DEFAULT_USER_ID,
//       sensorReadings: { moisture: value },
//     });
//     await doc.save();

//     // Update in-memory latest
//     latestSoilMoisture = value;

//     console.log('Polled and saved value:', value);
//   } catch (err) {
//     console.log('Poll error:', err.message || err.toString());
//   }
// }

async function pollOnce() {
  if (!ESP_URL) {
    console.warn("ESP_URL not set, skipping poll");
    return;
  }
  try {
    const r = await axios.get(ESP_URL, { timeout: 3000 });
    const html = r.data;
    const value = await parseValueFromHtml(html);

    if (value === null) {
      console.log("Poll: could not parse value from ESP HTML");
      return;
    }

    // ✅ only update in memory, don't save to DB
    latestSoilMoisture = value;

    console.log("Polled latest value (not saved):", value);
  } catch (err) {
    console.log("Poll error:", err.message || err.toString());
  }
}


function startPolling() {
  if (!ESP_POLL) {
    console.log('ESP polling is disabled (ESP_POLL != true)');
    return;
  }
  if (!ESP_URL) {
    console.warn('ESP_POLL enabled but ESP_URL not set.');
    return;
  }
  pollOnce();
  pollTimer = setInterval(pollOnce, ESP_POLL_INTERVAL_MS);
  console.log('ESP polling started. Interval (ms):', ESP_POLL_INTERVAL_MS);
}

function stopPolling() {
  if (pollTimer) clearInterval(pollTimer);
}

module.exports = {
  router,
  startPolling,
  stopPolling,
};
