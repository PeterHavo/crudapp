// load enviroment variables 
require('dotenv').config();

// grab our dependencies
const express =     require('express'),
  app =  express(),
  port = process.env.PORT || 3001,
  expressLayouts = require('express-ejs-layouts'),
  mongoose       = require('mongoose'),
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  flash          = require('connect-flash'),
  expressValidator= require('express-validator');

// configure our application=================================================

//set sessions and cookie parser
app.use(cookieParser());
//session needs to have some default configuration
app.use(session({
    secret:process.env.SECRET,
    cookie: {maxAge: 60000},
    resave: false, //forces the session to be saved back to the store
    saveUninitialized: false //dont save unmodified sessions
}));

app.use(flash());

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

//express validator base on documentation must be under body parser !! it use to grao information from form and validate it !
app.use(expressValidator());


// set the routes===========================================================
app.use(require('./app/routes'));

// start our server=========================================================
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});