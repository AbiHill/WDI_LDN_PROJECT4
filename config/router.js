const router = require('express').Router();
const secureRoute = require('../lib/secureRoute');
const events = require('../controllers/events');
const auth = require('../controllers/auth');

//EVENTS ROUTES
router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create);

router.route('/events/:id')
  .get(events.show)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete);


//USERS
router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.get('/me', secureRoute, auth.show);

router.put('/me', secureRoute, auth.update);
router.put('/me/join/:eventId', secureRoute, auth.joinEvent);

router.put('/me/leave/:eventId', secureRoute, auth.leaveEvent);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
