const HikingTrail = require('../models/hiketrails');

async function create(req, res) {
    const trailId = req.params.id;
    const userId = req.user._id.toString();
    try {
      const trail = await HikingTrail.findById(trailId);
      const { update, dateAdded } = req.body;
      const newUpdate = {
        update,
        dateAdded: new Date(dateAdded),
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
    try {
      const updateId = req.params.id;
      const trail = await BikingTrail.findOne({ 'update._id': updateId });
      const update = trail.update.find(update => update._id.toString() === updateId);
      
      res.render(`/trails/hike/${updateId}`, {
        title: 'Edit Trail Update',
        update,
      });
    } catch (err) {
      console.error('Error fetching trail update:', err);
      res.redirect('/');
    }
  }
  
  
  
  
  module.exports = {
    create,
    edit
  };
  