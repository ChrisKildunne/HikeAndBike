const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema(
  {
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    caption: {
      type: String
    }
   },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
