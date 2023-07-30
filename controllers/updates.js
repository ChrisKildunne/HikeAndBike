const BikingTrail = require('../models/biketrails');
const Photo = require('../models/photo')
const multer = require('multer');
const sharp = require('sharp')

async function create(req, res) {
  const trailId = req.params.id;
  const userId = req.user._id.toString();
  try {
    const trail = await BikingTrail.findById(trailId);
    const { update, dateAdded, parking} = req.body;
    const newUpdate = {
      update,
      dateAdded: new Date(dateAdded),
      parking,
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
async function edit(req, res) {
  const trailId = req.params.id;
  const updateId = req.params.updateId;
  try {
    const trail = await BikingTrail.findById(trailId);
    const update = trail.update.id(updateId);
    res.render('trails/edit/editbike', { trail, update });
  } catch (err) {
    console.log(err)
    res.redirect(`/trails/bike/${trailId}`);
  }
}
async function updateBike(req,res){
  const trailId = req.params.id;
  const bike = await BikingTrail.findById(trailId);
  try {
    const updates = bike.update
    const index = updates.findIndex(function(update){
      return update.id===req.params.updateId
    })
    updates[index].update = req.body.update
    updates[index].dateAdded = req.body.dateAdded
    updates[index].parking = req.body.parking
    bike.update = updates
    await bike.save()
    res.redirect(`/trails/bike/${trailId}`);
  } catch (err) {
    res.redirect(`/`);
    console.log(err)
  }
}
async function photoPage(req, res) {
  const trailId = req.params.id;
  try {
    const trail = await BikingTrail.findById(trailId).populate('photos');
    let photo = null;
    res.render('photo/photo', { trail, photos: trail.photos,  urlPath: req.originalUrl });
  } catch (err) {
    console.log(err);
    res.redirect(`/trails/bike/${trailId}`);
  }
}
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  },
});
async function createPhoto(req, res) {
  const caption = req.body.caption;
  upload.single('photo')(req, res, async () => {
    const trailId = req.params.id;
        try {
      const { buffer, mimetype } = req.file;
      const resizeImg = await sharp(buffer).rotate().resize({ width: 400 }).toBuffer();
      const newPhoto = new Photo({
        data: resizeImg,
        contentType: mimetype,
        caption: caption
          });
      const savedPhoto = await newPhoto.save();
      const trail = await BikingTrail.findById(trailId);
      if (!trail.photos) {
        trail.photos = [savedPhoto._id];
      } else {
        trail.photos.push(savedPhoto._id);
      }
      const photos = await Photo.find({_id: trail.photos })
      await trail.save()
      res.render('photo/photo', { trail, photos, urlPath: req.originalUrl});
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  create,
  delete: deleteUpdate,
  edit,
  updateBike,
  createPhoto,
  photoPage,
  upload
  
};
