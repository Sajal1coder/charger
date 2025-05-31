const express = require('express');
const router = express.Router();
const chargingStationController = require('../controllers/chargingStationController');
const auth = require('../middleware/auth');

// All routes are protected
router.post('/', auth, chargingStationController.createStation);
router.get('/', auth, chargingStationController.getStations);
router.get('/:id', auth, chargingStationController.getStationById);
router.put('/:id', auth, chargingStationController.updateStation);
router.delete('/:id', auth, chargingStationController.deleteStation);

module.exports = router; 