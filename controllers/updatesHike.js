const HikingTrail = require('../models/hiketrails');

async function create(req, res) {
    const trailId = req.params.id;
    const userId = req.user._id.toString();
    try {
      const trail = await HikingTrail.findById(trailId);
      const { update, dateAdded, parking } = req.body;
      const newUpdate = {
        update,
        dateAdded: new Date(dateAdded),
        parking,
        user: userId,
        userName: req.user.name,
        userAvatar: req.user.avatar
      };
  
      trail.updateHike.push(newUpdate);
      await trail.save();
      res.redirect(`/trails/hike/${trailId}`);
    } catch (err) {
      console.error('Error creating new update:', err);
      res.redirect('/');
    }
  }
  async function edit(req, res) {
    const trailId = req.params.id;
    const updateId = req.params.updateId;
    try {
      const trail = await HikingTrail.findById(trailId);
      const update = trail.updateHike.id(updateId);
      res.render('trails/editParking', { trail, update });
    } catch (err) {
      res.redirect(`/trails/hike/${trailId}`);
    }
  }
  
  async function updateParking(req, res) {
    const trailId = req.params.id;
    console.log(req.body)
    try {
      const trail = await HikingTrail.findById(trailId);
      const  parking  = req.body;
      await trail.save();
      res.redirect(`/trails/hike/${trailId}`);
    } catch (err) {
      res.redirect(`/`);
      console.log(err)
    }
  }
  
  
  
  
  module.exports = {
    create,
    edit,
    updateParking
  };
  