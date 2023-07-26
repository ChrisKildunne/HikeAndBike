const express = require('express');
const router = express.Router();
const updateCtrl = require('../controllers/updatesHike')

router.post('/trails/hike/:id/showhike', updateCtrl.create); 
router.get('/trails/hike/:id/editParking', updateCtrl.edit);
router.put('/trails/hike/:id', updateCtrl.updateParking);

module.exports = router;