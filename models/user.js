var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    name: {
		type: String, 
		required: [true,'Please enter your name'],
		maxlength: [200, 'Your name is to long']
	},
	username: {
		type: String, 
		required: [true,'Please enter user name'],
		maxlength: [50, 'Your user name is to long'],
		unique: true
	},
    email: {
		type: String, 
		required: [true,'Please enter your email'],
		unique: true,
		lowercase: true,
		match: [/\S+@\S+\.\S+/,'Please enter a valid email address']
	},
	gender: {
		type: String,
		enum: ['Male','Female']
	},
	birthday: {
		type: Date,
		required: [true,'Please enter your bithday']
	},
    address: {
		type: String, 
		required: [true,'Please enter your address']
	},
	phone: {
		type: String,
	},
    password: {
		type: String, 
		required: true
	},
	role: {
		type: String,
		enum: ['admin','user']
	}
});

userSchema.validPassword = function(password) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
        return isMatch;
    });
};

userSchema.pre('save', function(next) {
    var user = this;
	mongoose.models["User"].findOne({username : user.username},function(err, results) {
		if(err) {
            next(err);
        } else if(results) {
            user.invalidate("username","Username is already in use. Please choose another one");
            next(new Error("Username is already in use"));
        } else {
			mongoose.models["User"].findOne({email : user.email},function(err, results) {
				if(err) {
					next(err);
				} else if(results) {
					user.invalidate("email","Email is already in use. Please choose another one");
					next(new Error("Email is already in use"));
				} else {
					bcrypt.genSalt(4, function(err, salt) {
						if (err) 
							return next(err);
						bcrypt.hash(user.password, salt, null, function(err, hashed) {
							if (err) 
								return next(err);
							user.password = hashed;
							next();
						});
					});
				}
			});
        }
	});
});


module.exports = mongoose.model('User', userSchema);