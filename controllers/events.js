const Event = require('../models/event');

function indexRoute(req, res, next) {
  Event.find()
    .then(events => res.json(events))
    .catch(next);
}

function createRoute(req, res, next) {
  console.log(req.body);
  if (!req.body.createdBy) req.body.createdBy = req.currentUser;
  req.body.location = req.body.address.location;
  req.body.address = req.body.address.address;
  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
}

function showRoute(req, res, next) {
  Event.findById(req.params.id)
    .populate('joinedUsers')
    .populate('createdBy')
    .then(event => res.json(event))
    .catch(next);
}

function updateRoute(req, res, next) {
  Event.findById(req.params.id)
    .then(event => Object.assign(event, req.body))
    .then(event => event.save())
    .then(event => res.json(event))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Event.findById(req.params.id)
    .then(event => event.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
