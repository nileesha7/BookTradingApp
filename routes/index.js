var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.Ctrl');
var asyncCtrl = require('../controllers/async.Ctrl');
var passport = require('passport');
var User = require('../models/User.model');

router.get('/', asyncCtrl.homePage);

router.get('/login', function(req, res){
	res.render('login');
});

router.get('/signup', function(req, res){
	res.render('signup');
});

router.get('/logout', function(req, res){
	req.logout(); //passport function that terminates login session by removing res.user property
	res.redirect('/');
});

router.post('/signup', userCtrl.signup);

//authenicate user credentials
var authenticate = passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' });

router.post('/login', authenticate);



module.exports = router;