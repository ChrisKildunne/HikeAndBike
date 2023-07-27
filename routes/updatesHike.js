const express = require('express');
const router = express.Router();
const updateCtrl = require('../controllers/updatesHike')

router.post('/trails/hike/:id/showhike',updateCtrl.create); 
router.get('/trails/hike/:id/:updateId/editParking', updateCtrl.edit);
router.put('/trails/hike/:id/:updateId', updateCtrl.updateParking);
router.delete('/trails/hike/:id',  updateCtrl.delete);

module.exports = router;