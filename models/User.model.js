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

//capitalize username before saving user
UserSchema.pre('save', function(next){
  this.username.charAt(0).toLocalUpperCase + this.username.slice(1);
  next();
});

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//encrypt the password and save user in db
module.exports.createUser = function(newUser, cb) {
  bcrypt.hash(newUser.password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null, function(err, hash) {
    if(err) throw err;
    newUser.password = hash;
    console.log('User is being saved');
    // Save user to the database, save method takes parameter callback
    newUser.save(cb);
  })
}

module.exports = mongoose.model('User', UserSchema);


