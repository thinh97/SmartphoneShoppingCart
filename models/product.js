var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	_id: {
		type: String,
		required: [true,'Please enter id']
	},
    imagePath: [{
		type: String, 
		required: [true,'Please enter image path']
	}],
    title: {
		type: String, 
		required: [true,'Please enter title name']
	},
	details: {
		screen: String,
		os: String,
		primaryCamera: {
			type: Number,
			min: 1
		},
		secondaryCamera: {
			type: Number,
			min: 1
		},
		cpu: String,
		ram:  {
			type: Number,
			min: 1
		},
		memory:  {
			type: Number,
			min: 1
		},
		sim: String,
		battery:  {
			type: Number,
			min: 1
		}
	},
    description: {
		type: String, 
		required: [true,'Please enter description']
	},
    price: {
		type: Number, 
		min:1,
		required: [true,'Please enter a price']
	},
	producer: {
		type: String, 
		required: [true,'Please enter a producer']
	},
	views: {
		type: Number
	},
	comments: [{
		name: {
			type: String,
			required: [true,'Please enter user name'],
			maxlength: [200, 'Your name is to long']
		},
		comment: {
			type: String,
			required: [true,'Please enter user name']
		}
	}],
});
productSchema.pre('save', function(next) {
    var user = this;
	mongoose.models["Product"].findOne({username : user.username},function(err, results) {
		if(err) {
            next(err);
        } else if(results) {
            user.invalidate("username","Id is already in use. Please choose another one");
            next(new Error("Id is already in use"));
        } else {
			next();
        }
	});
});
module.exports = mongoose.model('Product', productSchema);