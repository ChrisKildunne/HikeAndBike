const express = require('express');
const router = express.Router();
const bikeCtrl = require('../controllers/biketrails');

router.get('/', bikeCtrl.index);
router.get('/new', bikeCtrl.new)
router.post('/',bikeCtrl.create)
router.get('/:id', bikeCtrl.show)

module.exports = router;
