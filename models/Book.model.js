var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	title:{
		type: String,
		required: true
	},
	author:{
		type: String
	},
	publishYear:{
		type: Date 
	},
	genre:{
		type:String
	},
	thumbnail:{
		type:String
	},
	memberName:{ //who owns the book
		type:String
	},
	createdOn:{ //when did the owner add the book
		type:Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Book', BookSchema);