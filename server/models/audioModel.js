const mongoose = require('mongoose');
const { Schema } = mongoose;

const Audio = new Schema({
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('audio', Audio);
