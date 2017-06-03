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

//determine if a user can access a route based on whether they are logged in or not
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated())
		return next(); 	//User is logged in allow access to the page
	else{
		console.log('Access not allowed');
		res.redirect('/'); //User is not logged in redirect to the homepage
	}
}

router.get('/', asyncCtrl.homePage); //load home page

//render login page
router.get('/login', function(req, res){
	res.render('login'); 
});
//authenticte user credentials and login
router.post('/login', authenticate); 

//render signup page
router.get('/signup', function(req, res){
	res.render('signup'); 
});
//sign up user
router.post('/signup', userCtrl.signup); 

//logout user
router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/'); 
});

//render newbook page
router.get('/newBook', ensureAuthenticated, function(req, res){
	res.render('newBook', {user:req.user});
});

//search books to add
router.post('/searchBook', bookCtrl.searchBook);

//add book details into database
router.post('/addBook', bookCtrl.addBook); 

router.get('/activity', ensureAuthenticated, bookCtrl.getRequestedBooks);

router.post('/requestBook', bookCtrl.requestBook);



/*
router.get('/activity', ensureAuthenticated, function(req, res){
	res.render('activity', {user:req.user});
});
*/
//****//

//***POST REQUESTS***//



/*
router.post('/book', bookCtrl.bookInfo); //Get book information.

router.get('/requestBook',bookCtrl.requestBook);
*/
//****//



module.exports = router;