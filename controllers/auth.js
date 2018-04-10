const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const twilio = require('../lib/twilio');

function register(req, res, next) {
  console.log(req.body);
  req.body.location = req.body.address.location;
  req.body.address = req.body.address.address;
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      res.json({ user, token, message: 'Thank you for registering' });
    })
    .catch(next);
}

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      res.json({ user, token, message: `Welcome back ${user.username}` });
    })
    .catch(next);
}

// PROFILE PAGE
function show(req, res, next) {
  User.findById(req.currentUser._id)
    .populate('events')
    .then(user => res.json(user))
    .catch(next);
}


function update(req, res, next) {
  User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function joinEvent(req, res, next) {
  req.currentUser.events.push(req.params.eventId);
  req.currentUser.save()
    .then(user => {
      res.json(user);
      return twilio
        .sendSMS(user.tel, 'You have joined an event! Sick bruv, see you there yo!');
    })
    .catch(next);
}

function leaveEvent(req, res, next) {
  User.findById(req.currentUser._id)
    .then(user => {
      const index = user.events.indexOf(req.params.eventId);
      const updatedEvents = [...user.events.slice(0, index), ...user.events.slice(index + 1)];
      user.events = updatedEvents;
      return user.save();
    })
    .then(user => {
      res.json(user);
    })
    .catch(next);
}

module.exports = {
  register,
  login,
  show,
  update,
  joinEvent,
  leaveEvent
};
