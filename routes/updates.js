const express = require('express');
const router = express.Router();
const updateCtrl = require('../controllers/updates')
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.post('/trails/bike/:id/show', ensureLoggedIn, updateCtrl.create);
router.delete('/trails/bike/:id', ensureLoggedIn, updateCtrl.delete);


//router.post('/trails/bike/:id',updateCtrl.edit)
//router.put('/trails/bike/:id', updateCtrl.update);
module.exports = router;