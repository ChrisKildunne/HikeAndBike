
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const updateHikeSchema = new Schema ({
  update: String,
  dateAdded: Date,
  photo:{
     data: Buffer,
    contentType: String   
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
    updateHike :[updateHikeSchema]

  });

const HikingTrail = mongoose.model('HikingTrail', hikeSchema);
module.exports = HikingTrail;
