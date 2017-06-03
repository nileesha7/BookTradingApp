var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TradesRequestedSchema = new Schema({
	recipient:{
		type:String,
		required:true
	},
	donor:{
		type:String,
		required:true
	},
	bookId:{
		type:String,
		required:true
	},
	thumbnail:{
		type:String
	}
});

module.exports = mongoose.model('TradesRequested', TradesRequestedSchema);