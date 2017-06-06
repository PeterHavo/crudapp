// grab our dependencies
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  expressLayouts = require('express-ejs-layouts');

// configure our application
//tell express where to look for static assets first
app.use(express.static(__dirname + 'public'));

//tell express to use ejs view engine
app.set('view engine', 'ejs');

//tell express to use express-ejs-layouts
app.use(expressLayouts);

// set the routes
app.use(require('./app/routes'));

// start our server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});