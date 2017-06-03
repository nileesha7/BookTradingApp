var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	id:{
		type: String,
		unique: true,
		required: true
	},
	title:{
		type: String,
		required: true
	},
	thumbnail:{
		type:String
	},
	memberName:{ //who owns the book
		type:String
	},
	inTransit:{
		type:Boolean,
		default:false
	}
});

module.exports = mongoose.model('Book', BookSchema);
