var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.Ctrl');
var bookCtrl = require('../controllers/book.Ctrl');
var asyncCtrl = require('../controllers/async.Ctrl');
var passport = require('passport');
var User = require('../models/User.model');

//This is used to authenticate user credentials while logging in
var authenticate = passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' });

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated())
		return next(); 	//User is logged in allow access to the page
	else{
		console.log('Access not allowed');
		res.redirect('/'); //User is not logged in redirect to the homepage
	}
}

//***GET REQUESTS***//
router.get('/', asyncCtrl.homePage); //home page

router.get('/login', function(req, res){
	res.render('login'); //login page
});

router.get('/signup', function(req, res){
	res.render('signup'); //signup page
});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/'); //logout
});

router.get('/addBook', ensureAuthenticated, function(req, res){
	//BACK BUTTON PROBLEM - when I click the back button after logging out, it goes back to the restricted page
	//res.header('Cache-Control', 'no-cache');
	//res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');
	res.render('newBook', {user:req.user});
});
//****//

//***POST REQUESTS***//
//router.post('/', bookCtrl.allBooks);

router.post('/signup', userCtrl.signup); //signup

router.post('/login', authenticate); //login

router.post('/addBook', bookCtrl.addBook); //Add Book
//****//



module.exports = router;