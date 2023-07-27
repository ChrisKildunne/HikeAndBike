const express = require('express');
const router = express.Router();
const bikeCtrl = require('../controllers/biketrails');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', bikeCtrl.index);
router.get('/new',ensureLoggedIn, bikeCtrl.new)
router.post('/',ensureLoggedIn,bikeCtrl.create)
router.get('/:id', bikeCtrl.show)

module.exports = router;
