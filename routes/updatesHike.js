const express = require('express');
const router = express.Router();
const updateCtrl = require('../controllers/updatesHike')
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.post('/trails/hike/:id/showhike',ensureLoggedIn,updateCtrl.create); 
router.get('/trails/hike/:id/:updateId/editParking',ensureLoggedIn, updateCtrl.edit);
router.put('/trails/hike/:id/:updateId', ensureLoggedIn,updateCtrl.updateParking);
router.delete('/trails/hike/:id', ensureLoggedIn, updateCtrl.delete);

module.exports = router;