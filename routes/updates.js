const express = require('express');
const router = express.Router();
const updateCtrl = require('../controllers/updates')
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.post('/trails/bike/:id/show', ensureLoggedIn, updateCtrl.create);
router.delete('/trails/bike/:id', ensureLoggedIn, updateCtrl.delete);
router.put('/trails/bike/:id/:updateId', ensureLoggedIn,updateCtrl.updateBike);
router.get('/trails/bike/:id/:updateId/editbike',ensureLoggedIn, updateCtrl.edit);


module.exports = router;