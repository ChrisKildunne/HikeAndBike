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
    const hike = await HikingTrail.findById(trailId);
    try {
      const updates = hike.updateHike
      const index = updates.findIndex(function(update){
        return update.id===req.params.updateId
      })
      updates[index].parking = req.body.parking
      updates[index].dateAdded = req.body.dateAdded
      hike.updateHike = updates
      await hike.save()
      res.redirect(`/trails/hike/${trailId}`);
    } catch (err) {
      res.redirect(`/`);
      console.log(err)
    }
  }
  
  async function deleteUpdate(req, res) {
    const trailId = req.params.id;
    try {
      const trail = await HikingTrail.findById(trailId);
      const reviewId = req.body.updateId; 
      const review= trail.updateHike.id(reviewId);
      trail.updateHike.remove({ _id: review });
      await trail.save(); 
      res.redirect(`/trails/hike/${trailId}`);
    } catch (err) {
      console.log(err)
      res.redirect(`/trails/hike/${trailId}`);
    }
  }
  
  
  module.exports = {
    create,
    edit,
    updateParking,
    delete: deleteUpdate
  };
  