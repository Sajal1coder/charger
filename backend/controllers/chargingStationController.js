const ChargingStation = require('../models/ChargingStation');

// Create a new charging station
exports.createStation = async (req, res) => {
  try {
    const station = new ChargingStation(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all charging stations
exports.getStations = async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single charging station by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a charging station
exports.updateStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a charging station
exports.deleteStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json({ message: 'Station deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 