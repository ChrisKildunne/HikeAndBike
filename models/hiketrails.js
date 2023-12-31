
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const updateHikeSchema = new Schema ({
  update: String,
  dateAdded: Date,
  parking: {
    type: String,
    enum: ['Lot Full','Almost Full', 'Half Full', 'Pretty Much Empty','Empty']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});


const hikeSchema = new Schema({
    name: String,
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Hard']
    },
    mileage: Number,
    rating: Number,
    description: String,
    photos: [{ 
      type: Schema.Types.ObjectId,
      ref: 'Photo',
        }],
    updateHike :[updateHikeSchema]

  });

const HikingTrail = mongoose.model('HikingTrail', hikeSchema);
module.exports = HikingTrail;
