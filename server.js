// load enviroment variables 
require('dotenv').config();

// grab our dependencies
const express =     require('express'),
  app =  express(),
  port = process.env.PORT || 3001,
  expressLayouts = require('express-ejs-layouts'),
  mongoose =       require('mongoose'),
  bodyParser =     require('body-parser');

// configure our application=================================================
//tell express where to look for static assets first
app.use(express.static(__dirname + '/public'));

//tell express to use ejs view engine
app.set('view engine', 'ejs');

//tell express to use express-ejs-layouts
app.use(expressLayouts);


// connect to mLab remote database 
mongoose.connect(process.env.DB_URI, ()=>{console.log('connected to mLab database !')});


//use body parser to get info from form 
app.use(bodyParser.urlencoded({extended: true}));



// set the routes===========================================================
app.use(require('./app/routes'));

// start our server=========================================================
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});