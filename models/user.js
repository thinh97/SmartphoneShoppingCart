var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Cart = require('../models/cart');

var userSchema = new Schema({
	_id: {
		type: String
	},
    Name: {
		type: String, 
		required: [true,'Please enter your name'],
		maxlength: [200, 'Your name is to long']
	},
	UserName: {
		type: String, 
		required: [true,'Please enter user name'],
		maxlength: [50, 'Your user name is to long'],
		unique: true
	},
    Email: {
		type: String, 
		required: [true,'Please enter your email'],
		unique: true,
		lowercase: true,
		match: [/\S+@\S+\.\S+/,'Please enter a valid email address']
	},
	Gender: {
		type: String,
		enum: ['Male','Female']
	},
	Birthday: {
		type: Date,
		required: [true,'Please enter your bithday']
	},
    Address: {
		type: String, 
		required: [true,'Please enter your address']
	},
	Phone: {
		type: String,
	},
    Password: {
		type: String, 
		required: true
	},
	Role: {
		type: String,
		enum: ['admin','user']
	},
	Cart: {
		type: Schema.Types.ObjectId,
		ref: 'Cart'
	}
});

userSchema.validPassword = function(password) {
  bcrypt.compare(password, this.Password, function(err, isMatch) {
        return isMatch;
    });
};

userSchema.pre('save', function(next) {
    var user = this;
	mongoose.models["User"].findOne({UserName : user.UserName},function(err, results) {
		if(err) {
            next(err);
        } else if(results) {
            user.invalidate("UserName","Username is already in use. Please choose another one");
            next(new Error("UserName is already in use"));
        } else {
			mongoose.models["User"].findOne({email : user.Email},function(err, results) {
				if(err) {
					next(err);
				} else if(results) {
					user.invalidate("Email","Email is already in use. Please choose another one");
					next(new Error("Email is already in use"));
				} else {	
                    user.Password = bcrypt.hashSync(user.Password);		
                    user._id = user.UserName.toLowerCase();
					next();
				}
			});
        }
	});
});


module.exports = mongoose.model('User', userSchema);