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
  dateTime: { type: Date },
  description: { type: String },
  teamSize: { type: Number },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

//virtual set up to tie the user to an event
eventSchema
  .virtual('joinedUsers', {
    localField: '_id',
    foreignField: 'events',
    ref: 'User'
  });

eventSchema
  .set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('Event', eventSchema);
