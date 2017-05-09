var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(){
	passport.use(new LocalStrategy({
	        // by default, local strategy uses username, override this with email
	        usernameField : 'email',
	        passReqToCallback : true // allows us to pass back the entire request to the callback
	    },
	    function(req, email, password, done) { 
	        // find a user whose email is the same as the input email
	        User.findOne({ 'email' :  email }, function(err, user) {

	        	//an error occured while searching the database
	            if (err)
	                return done(err);

	            //the user is not found in the databse
	            if (!user)
	                return done(null, false, console.log('No user found.')); 

	            //user is found, but passwoed is wrong
	            if (!user.validPassword(password))
	                return done(null, false, console.log('Wrong password!')); 

	            //valid user
	            console.log(user);
	            return done(null, user), console.log('Log in succesful.');
	        });

	    }));

	passport.serializeUser(function(user, done) {
	  if (user) {
	    done(null, user._id);
	  }
	});

	passport.deserializeUser(function(id, done) {
	  User.findOne({
	    _id: id
	  }).exec(function(err, user) {
	    if (user) {
	      return done(null, user);
	    } else {
	      return done(null, false);
	    }
	  });
	});
}


