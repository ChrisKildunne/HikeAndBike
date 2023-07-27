const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const updateSchema = new Schema ({
  update: String,
  dateAdded: {
    type: Date,
    required: true
  },
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
