var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.Ctrl')

router.get('/', function(req, res){
	res.render('index');
})
router.get('/login', function(req, res){
	res.render('login');
})
router.get('/signup', function(req, res){
	res.render('signup');
})

router.post('/signup', userCtrl.signup);

module.exports = router;