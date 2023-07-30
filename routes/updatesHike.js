const express = require('express');
const router = express.Router();
const updateCtrl = require('../controllers/updatesHike')
const ensureLoggedIn = require('../config/ensureLoggedIn');
const upload = updateCtrl.upload;

router.post('/trails/hike/:id/upload/photo', upload.single('photo'), ensureLoggedIn, updateCtrl.createPhoto);
router.get('/trails/hike/:id/upload/photo', ensureLoggedIn, updateCtrl.photoPage);
router.post('/trails/hike/:id/showhike',ensureLoggedIn,updateCtrl.create); 
router.get('/trails/hike/:id/:updateId/edit/editParking',ensureLoggedIn, updateCtrl.edit);
router.put('/trails/hike/:id/:updateId', ensureLoggedIn,updateCtrl.updateParking);
router.delete('/trails/hike/:id', ensureLoggedIn, updateCtrl.delete);

module.exports = router;