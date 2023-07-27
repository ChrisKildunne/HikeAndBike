const BikingTrail = require('../models/biketrails');

async function create(req, res) {
  const trailId = req.params.id;
  const userId = req.user._id.toString();
  try {
    const trail = await BikingTrail.findById(trailId);
    const { update, dateAdded } = req.body;
    const newUpdate = {
      update,
      dateAdded: new Date(dateAdded),
      user: userId,
      userName: req.user.name,
      userAvatar: req.user.avatar
    };
    trail.update.push(newUpdate);
    await trail.save();
    res.redirect(`/trails/bike/${trailId}`);
  } catch (err) {
    console.log(err.message);
    res.redirect(`/trails/bike/${trailId}`)
  }
}
async function deleteUpdate(req, res) {
  const trailId = req.params.id;
  try {
    const trail = await BikingTrail.findById(trailId);
    const reviewId = req.body.updateId; 
    const review= trail.update.id(reviewId);
    console.log(review)
    trail.update.remove({ _id: review });
    await trail.save(); 
    res.redirect(`/trails/bike/${trailId}`);
  } catch (err) {
    res.redirect(`/trails/bike/${trailId}`);
  }
}


module.exports = {
  create,
  delete: deleteUpdate,
  
};
