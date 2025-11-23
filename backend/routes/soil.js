const express = require("express");
const Data = require("../models/data");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Normal ranges for soil parameters
const normalRanges = {
  ph: { min: 6.0, max: 7.5 },
  moisture: { min: 20, max: 60 },
  N: { min: 10, max: 50 },
  P: { min: 5, max: 30 },
  K: { min: 10, max: 40 },
};

// Helper to get status
const getStatus = (key, value) => {
  if (value == null) return "N/A";
  if (value < normalRanges[key].min) return "Low";
  if (value > normalRanges[key].max) return "High";
  return "Normal";
};

// GET latest soil data for frontend
router.get("/latest", verifyToken, async (req, res) => {
  try {
    const latestData = await Data.findOne({}).sort({ createdAt: -1 });
    if (!latestData) return res.json({});

    const s = latestData.sensorReadings || {};

    const response = {
      moisture: s.moisture,
      ph: s.ph,
      nitrogen: s.N,
      phosphorus: s.P,
      potassium: s.K,
      status: {
        moisture: getStatus("moisture", s.moisture),
        ph: getStatus("ph", s.ph),
        nitrogen: getStatus("N", s.N),
        phosphorus: getStatus("P", s.P),
        potassium: getStatus("K", s.K),
      },
      createdAt: latestData.createdAt,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch latest soil data" });
  }
});

// GET all soil data of user
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await Data.find({ userId }).sort({ createdAt: -1 });

    const enrichedData = userData.map((entry) => {
      const states = {};
      for (let key of ["ph", "moisture", "N", "P", "K"]) {
        const val = entry.sensorReadings[key];
        states[key] = getStatus(key, val);
      }
      return {
        _id: entry._id,
        sensorReadings: entry.sensorReadings,
        states,
        createdAt: entry.createdAt,
      };
    });

    res.json(enrichedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch soil data" });
  }
});

// POST - Save current soil data manually
router.post("/save", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { moisture, ph, nitrogen, phosphorus, potassium } = req.body;

    const newData = new Data({
      userId,
      sensorReadings: {
        moisture,
        ph,
        N: nitrogen,
        P: phosphorus,
        K: potassium,
      },
    });

    await newData.save();
    res.json({ message: "Reading saved successfully", data: newData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save soil data" });
  }
});


module.exports = router;
