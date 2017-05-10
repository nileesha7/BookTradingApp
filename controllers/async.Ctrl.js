'use strict'

exports.homePage = function(req, res){
	//if the user is logged in
	if(req.user){ 
		console.log('logged in');
		res.render('index',{user:req.user});
	}else{ //if user is not logged in
		console.log('not logged in');
		res.render('index');
	}
}