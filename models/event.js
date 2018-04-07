const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  name: { type: String },
  sport: { type: String },
  address: { type: String },
  image: { type: String },
  date: { type: Date },
  time: { type: Number },
  description: { type: String },
  teamSize: { type: Number }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
