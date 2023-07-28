const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img:
  {
      data: Buffer,
      contentType: String
  }
});


const updateSchema = new Schema ({
  update: String,
  dateAdded: {
    type: Date,
    required: true
  },
  photo: [imageSchema],
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


const bikeSchema = new Schema({
  name: String,
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Hard']
  },
  mileage: Number,
  rating: {
    type: Number,
    enum:[1 , 2 , 3 , 4 , 5]
  },
  trailStyle: {
    type: String,
    enum: ['Tech', 'Flow', 'Jump']
  },
  description: String,
  update:[updateSchema]
}, {
    timestamps: true
});

const BikingTrail = mongoose.model('BikingTrail', bikeSchema);
module.exports = BikingTrail;
