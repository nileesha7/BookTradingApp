'use strict'

var Book = require('../models/Book.model');

//loading home page
exports.homePage = function(req, res, next){
	//Find all books from database
	Book.find().exec(function(err, results){ 
		if(err){
			console.log('Error while retrieving books');
		}else{
			 var books = results;
			 //if the user is logged in
			 if(req.user){ 
			 	res.render('index', {books:books, user:req.user});//Pass the book and user json objects
			 }
			 //if user is not logged in
			 else{ 
			 	console.log('not logged in');
			 	res.render('index', {books:books}); //Only pass books, not user
			 }
		}
	});
}