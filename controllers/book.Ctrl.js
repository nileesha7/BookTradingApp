'use strict'

var Book = require('../models/Book.model');

exports.addBook = function(req, res){
	var newBook = new Book();
	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.genre = req.body.genre;
	newBook.publishYear = req.body.publishYear;
	newBook.ISBN = req.body.ISBN;
	newBook.memberName = req.user.username;

	newBook.save(function(err){
		if(err){
			console.log(err.message);
		}else{
			console.log("New book has been saved");
			console.log(newBook);
			res.redirect(301, '/');
		}
	});
}

/*
exports.allBooks = function(req, res){
	Book.find().exec(function(err, books){
		if(err){
			console.log('Error while retrieving books');
		}else{
			res.render('/', {books:'books'});
		}
	});
}
*/