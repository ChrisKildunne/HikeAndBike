const express = require('express');
const router = express.Router();
const updateCtrl = require('../controllers/updates')

router.post('/trails/bike/:id/show', updateCtrl.create); 
//router.get('/trails/bike/:id',updateCtrl.new)

module.exports = router;