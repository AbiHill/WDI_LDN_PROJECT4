const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const User = require('../models/user');

function secureRoute(req, res, next) {
  console.log(req.headers.authorization);
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verifyAsync(token, secret)
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if(!user) return res.status(401).json({ message: 'Unauthorized' });
      req.currentUser = user;
      console.log('secure currentUser', req.currentUser);
      next();
    })
    .catch(next);
}

module.exports = secureRoute;
