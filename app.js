var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');

/*
var db = 'mongodb://localhost/bookTradingApp';
mongoose.connect(db);
*/
//Setup View Engine
var swig = require('swig');
app.engine('html', swig.renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var routes = require('./routes/index');
app.use('/', routes)

app.listen(3000, function(){
	console.log('App is listening on port 3000');
});