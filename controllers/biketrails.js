const BikingTrail = require('../models/biketrails');

function newTrail(req, res) {
  res.render('trails/new', { errorMsg: '', urlPath: req.originalUrl });
}
async function show(req, res) {
  try {
    const trailId = req.params.id;
    const trail = await BikingTrail.findById(trailId).populate('update').exec();
    res.render('trails/show/showbike', { trail, trailName: trail.name });
  } catch (err) {
    console.error('Error:', err);
    res.redirect('/');
  }
}
async function index(req, res) {
  try {
    const bikingTrails = await BikingTrail.find({});
    res.render('trails/bike', { bikingTrails });
  } catch (err) {
    console.error('Error fetching biking trails:', err);
  }
}
async function create(req, res) {
  try {
    const newTrailData = {};
    for (let key in req.body) {
      newTrailData[key] = req.body[key];
    }
    const newTrail = new BikingTrail(newTrailData);
    await newTrail.save();
    res.redirect('/trails/bike');
  } catch (err) {
    console.error('Error creating new trail:', err);
    res.render('trails/new', { errorMsg: 'Error creating new trail' });
  }
}
module.exports = {
  index,
  new: newTrail,
  create,
  show
};
