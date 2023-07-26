const express = require('express');
const router = express.Router();
const updateCtrl = require('../controllers/updates')

router.post('/trails/bike/:id/show', updateCtrl.create);
router.delete('/trails/bike/:id', updateCtrl.delete);


//router.post('/trails/bike/:id',updateCtrl.edit)
//router.put('/trails/bike/:id', updateCtrl.update);
module.exports = router;