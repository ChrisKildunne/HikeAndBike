const express = require('express');
const router = express.Router();
const hikeCtrl = require('../controllers/hiketrails');

router.get('/', hikeCtrl.index);
router.get('/new', hikeCtrl.new)
router.post('/',hikeCtrl.create)
router.get('/:id',hikeCtrl.show)


module.exports = router;
