// create a new express router
const express = require('express'),
  router = express.Router(),
  mainController = require('./controllers/main.controller'),
  eventController = require('./controllers/events.controller');
 

// export router
module.exports = router;

// define routes
router.get('/', mainController.showHome);

// events route
router.get('/events', eventController.showEvents);

// event route
router.get('/events/:slug', eventController.showEvent);
