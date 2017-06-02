'use strict'

var Book = require('../models/Book.model');
var bookSearch = require('google-books-search');

exports.requestBook = function(req, res){
	if(req.user){
		res.render('requestBook', {user: req.user,
			ISBN: req.body.ISBN,
			author: req.body.author,
			title: req.body.title,
			genre: req.body.genre,
			publishYear:req.body.publishYear,
			memberName:req.body.memberName
		});
	}else{
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
	var user = req.body.memberName;
	var query = req.body.id;

	//search for the book that the user selected using the google books api again
	var options = {
		limit: 1,
		type: 'books',
		order: 'relevance',
		lang: 'en'
	};
	bookSearch.search(query, options, function(err, results){
		if(err){
			console.log(err);
		}else{
			var results = results[0];

			var newBook = new Book({
				title: results.title,
				author: results.authors,
				publishYear: results.publishedDate,
				genre: results.categories,
				memberName: user
			});
			//save the results into the database
			newBook.save(function (err, newBook){
				if(err){
					console.log(err);
				}else{
					console.log('Newbook saved!');
				}
			});
			res.redirect('/newBook');
		}
	});
	
};


