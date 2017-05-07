var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10; //encrypted pw of length 10

var UserSchema = new Schema({
	username:{
		type:String,
		required: true
	},
	email:{
		type:String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
});

module.exports = mongoose.model('User', UserSchema);