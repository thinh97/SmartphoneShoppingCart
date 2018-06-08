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
		required: [true,'Vui lòng điền tên'],
		maxlength: [200, 'Tên quả dài']
	},
	UserName: {
		type: String, 
		required: [true,'Vui lòng điền tên đăng nhập'],
		maxlength: [50, 'Tên đăng nhập quá dài'],
		unique: true
	},
    Email: {
		type: String, 
		required: [true,'Vui lòng điền email'],
		unique: true,
		lowercase: true,
		match: [/\S+@\S+\.\S+/,'Vui lòng điền đúng định dạng email']
	},
	Gender: {
		type: String,
		enum: ['Male','Female']
	},
	Birthday: {
		type: Date,
		required: [true,'Vui lòng điền ngày tháng năm sinh']
	},
    Address: {
		type: String, 
		required: [true,'Vui lòng điền địa chỉ']
	},
	Phone: {
		type: String,
	},
    Password: {
		type: String, 
		required: [true,'Vui lòng điền mật khẩu']
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
	mongoose.models["User"].findOne({UserName : user.UserName},function(err, result) {
		if(err) {
            next(err);
        } else if(result) {
			if (user.UserName === result.UserName)
            	next(new Error('Tên tài khoản đã được sử dụng'));
        } else {
			mongoose.models['User'].findOne({email : user.Email},function(err, result) {
				if(err) {
					next(err);
				} else if(result) {
					if (user.Email === result.Email)
						next(new Error('Email đã được sử dụng'));
				}
			});
        }
        user.Password = bcrypt.hashSync(user.Password);
        user._id = user.UserName.toLowerCase();
        next();
	});
});


module.exports = mongoose.model('User', userSchema);