
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hikeSchema = new Schema({
    name: String,
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Hard']
    },
    mileage: Number,
    rating: Number
  });

const HikingTrail = mongoose.model('HikingTrail', hikeSchema);
module.exports = HikingTrail;
