var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var path = require('path');

var port = 8080;
var db = 'mongodb://localhost/bookTradingApp';

var routes = require('./routes/index');

mongoose.connect(db);

//Setup View Engine
var swig = require('swig');
app.engine('html', swig.renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'super duper secret',
  saveUninitialized: true,
  resave: true
}));

require('./config/passport')();

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(port, function() {
  console.log('app listening on port ' + port);
});