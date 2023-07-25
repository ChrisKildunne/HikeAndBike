const express = require('express');
const router = express.Router();
const updateCtrl = require('../controllers/updatesHike')

router.post('/trails/hike/:id/showhike', updateCtrl.create); 
//router.get('/trails/bike/:id',updateCtrl.new)
router.get('/trails/hike/:id/show', updateCtrl.edit);
//router.put('/trails/bike/:id', updateCtrl.update);


module.exports = router;