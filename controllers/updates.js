const BikingTrail = require('../models/biketrails');

// async function newUpdate(req, res) {
//   try {
//     const trailId = req.params.id;
//     const trail = await BikingTrail.findById(trailId);
//     console.log(trail)
//     const updates = trail.updates; 
//     res.render('trails/show', { trail, updates }); 
//   } catch (err) {
//     console.error('Error fetching biking trail:', err);
//   }
// }
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
    console.error('Error creating new update:', err);
    res.redirect('/');
  }
}


module.exports = {
  //new: newUpdate,
  create
};
