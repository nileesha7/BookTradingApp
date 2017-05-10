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
	ISBN: {
		type: String,
		required:true
	},
	publishYear:{
		type: Number 
	},
	genre:{
		type:String
	},
	memberName:{
		type:String
	},
	createdOn:{
		type:Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Book', BookSchema);