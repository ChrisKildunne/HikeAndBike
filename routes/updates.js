const express = require('express');
const router = express.Router();
const updateCtrl = require('../controllers/updates')
const ensureLoggedIn = require('../config/ensureLoggedIn');
const upload = updateCtrl.upload;

router.post('/trails/bike/:id/upload/photo', upload.single('photo'), ensureLoggedIn, updateCtrl.createPhoto);
router.get('/trails/bike/:id/upload/photo', ensureLoggedIn, updateCtrl.photoPage);
router.post('/trails/bike/:id/showbike', ensureLoggedIn, updateCtrl.create);
router.delete('/trails/bike/:id', ensureLoggedIn, updateCtrl.delete);
router.put('/trails/bike/:id/:updateId', ensureLoggedIn,updateCtrl.updateBike);
router.get('/trails/bike/:id/:updateId/edit/editbike',ensureLoggedIn, updateCtrl.edit);


module.exports = router;