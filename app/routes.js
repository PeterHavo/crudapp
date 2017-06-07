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



//seed database route 
// router.get('/events/seed',eventController.seedEvents);

// event route
router.get('/events/:slug', eventController.showEvent);

// create an event
router.get('/event/create', eventController.showCreate);
router.post('/event/create', eventController.processCreate);



// edit an event

router.get('/event/:slug/edit', eventController.showEdit);
router.post('/event/:slug', eventController.processEdit);
// delete an event 
