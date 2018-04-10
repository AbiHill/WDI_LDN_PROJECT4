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
  teamSize: { type: Number },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

//virtual is to tie your ids to your users - so you don't have to push the joinedUsers in to this data, it will just search the users collection below and try to find this particular events id and if it's a match it will pull it back. It's like connecting the collections. So if a user unjoins an event this will automatically update and you don't have to worry about sliceing it from the array.
eventSchema
  .virtual('joinedUsers', {
    localField: '_id',
    foreignField: 'events',
    ref: 'User'
  });

eventSchema
  .set('toJSON', { getters: true, virtuals: true });

module.exports = mongoose.model('Event', eventSchema);
