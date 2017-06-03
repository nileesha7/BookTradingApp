'use strict'

var Book = require('../models/Book.model');
var RequestedTrades = require('../models/RequestedTrades.model');
var bookSearch = require('google-books-search');
var async = require('async');

//request a book
exports.requestBook = function(req, res){

	//if user is logged in
	if(req.user){

		//create a new trade request
		var requestedTrades = new RequestedTrades({
			recipient:req.user.username, 
			donor: req.body.user, 
			bookId: req.body.id,
			thumbnail: req.body.thumbnail
		});

		//add trade request to the database
		requestedTrades.save(function (err, requestedTrades){
			if(err){
				console.log(err);
			}else{
				console.log('New trade request saved!');
			}
		});

		//redirect to the activity page
		res.redirect('/activity');

	//if user is not logged in
	}else{

		//redirect to the login page
		res.redirect('/login');
	}
};

//search books using the google books api
exports.searchBook = function(req, res){
	var query = req.body.bookQuery;
	var options = {
	    limit: 5,
	    type: 'books',
	    order: 'relevance',
	    lang: 'en'
	};
	bookSearch.search(query, options, function(err, results){
		if(err){
			console.log(err);
		}else{
			res.render('newBook',{
				user: req.user,
				books: results
			});
		}
	});
};

//add book to the database
exports.addBook = function(req, res){

	//create a new book object with values from the req body
	var newBook = new Book({
		id:req.body.id,
		title: req.body.title,
		thumbnail:req.body.thumbnail,
		memberName: req.body.memberName
	});

	//save the newBook object into the database
	newBook.save(function (err, newBook){
		if(err){
			console.log(err);
		}else{
			console.log('Newbook saved!');
			//redirect to the login page
			res.redirect('/');
		}
	});
};

exports.getRequestedBooks = function(req, res){

	async.parallel([
		function(cb){
			var user = req.user.username;	
			RequestedTrades.find({'recipient':user}).exec(function(err, results){
				cb(err, results);
			});
		},
		function(cb){
			var user = req.user.username;	
			RequestedTrades.find({'donor':user}).exec(function(err, results){
				cb(err, results);
			});
		}
	], function(err, results){
		if(err){
			console.log(err.message);
		}else{
			res.render('activity',{user:req.user, requestedBooks:results[0], booksAwaitingApproval:results[1]});
		}
	});
};

