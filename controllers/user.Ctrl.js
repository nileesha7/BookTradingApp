'use strict'

var User = require('../models/User.model');

//signup new user
exports.signup = function(req, res, next){
	var username = req.body.username; 
	var email = req.body.email;
	var password = req.body.password;

	var newUser = new User({
		username: username,
		email: email,
		password: password
	});

	//callback for mongoose save method
	var cb = function(err, user){ 
		if (err) throw err;
		console.log(user);
		res.redirect('/login');
	}

	User.createUser(newUser, cb);
}

