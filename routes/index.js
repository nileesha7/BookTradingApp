var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.Ctrl');
var passport = require('passport');
var User = require('../models/User.model');

router.get('/', function(req, res){
	res.render('index');
});
router.get('/login', function(req, res){
	res.render('login');
});
router.get('/signup', function(req, res){
	res.render('signup');
});

router.post('/signup', userCtrl.signup);

//authenicate user credentials
var authenticate = passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' });
router.post('/login', authenticate);


module.exports = router;