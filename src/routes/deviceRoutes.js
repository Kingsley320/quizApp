const express = require('express');
const router = express.Router();
const { getAllDevices, createDevice } = require('../controllers/deviceController');

router.get('/', getAllDevices);
router.post('/', createDevice);

module.exports = router;
