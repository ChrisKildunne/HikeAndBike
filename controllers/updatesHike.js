const HikingTrail = require('../models/hiketrails');
const Photo = require('../models/photo')
const multer = require('multer');
const sharp = require('sharp')

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
      res.render('trails/edit/editParking', { trail, update });
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
      updates[index].update = req.body.update
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
  async function photoPage(req, res) {
    const trailId = req.params.id;
    try {
      const trail = await HikingTrail.findById(trailId).populate('photos');
      let photo = null;
      res.render('photo/photo', { trail, photos: trail.photos, urlPath: req.originalUrl });
    } catch (err) {
      console.log(err);
      res.redirect(`/trails/hike/${trailId}`);
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
        const trail = await HikingTrail.findById(trailId);
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
    edit,
    updateParking,
    delete: deleteUpdate,
    createPhoto,
    photoPage,
    upload
  };
  