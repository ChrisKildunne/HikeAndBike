const express = require('express');
const router = express.Router();
const hikeCtrl = require('../controllers/hiketrails');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', hikeCtrl.index);
router.get('/new', ensureLoggedIn, hikeCtrl.new)
router.post('/', ensureLoggedIn,hikeCtrl.create)
router.get('/:id',hikeCtrl.show)


module.exports = router;
