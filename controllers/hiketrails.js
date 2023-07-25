const HikingTrail = require('../models/hiketrails');

async function index(req, res) {
  try {
    const hikingTrails = await HikingTrail.find({});
    res.render('trails/hike', { hikingTrails });
  } catch (err) {
    console.error('Error fetching hiking trails:', err);
    ;
  }
}
async function create(req, res) {
  try {
    const newTrailData = {};
    for (let key in req.body) {
      newTrailData[key] = req.body[key];
    }
    const newTrail = new HikingTrail(newTrailData);
    await newTrail.save();
    res.redirect('/trails/hike');
  } catch (err) {
    console.error('Error creating new trail:', err);
    res.render('trails/new', { errorMsg: 'Error creating new trail' });
  }
}

function newTrail(req,res){
  res.render('trails/new', { errorMsg: '', urlPath: req.originalUrl});
}

async function show(req,res){
  try { 
    const trail = await HikingTrail.findById(req.params.id)
  res.render('updates/new',{trail})
  } catch(err) {
    console.error('Error',err)
  }
}

module.exports = {
  index,
  new: newTrail,
  create,
  show
};
