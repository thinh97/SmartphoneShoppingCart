var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	_id: {
		type: String,
		required: [true,'Please enter id']
	},
    ImagePath: [{
		type: String, 
		required: [true,'Please enter image path']
	}],
    Title: {
		type: String, 
		required: [true,'Please enter title name']
	},
	Details: {
		Screen: String,
		OS: String,
		PrimaryCamera: {
			type: Number,
			min: 1
		},
		SecondaryCamera: {
			type: Number,
			min: 1
		},
		CPU: String,
		RAM:  {
			type: Number,
			min: 1
		},
		Memory:  {
			type: Number,
			min: 1
		},
		Sim: String,
		Battery:  {
			type: Number,
			min: 1
		}
	},
    Description: {
		type: String, 
		required: [true,'Please enter description']
	},
    Price: {
		type: Number, 
		min:1,
		required: [true,'Please enter a price']
	},
	Brand: {
		type: String, 
		required: [true,'Please enter a brand'],
		ref: 'Brand'
	},
	Views: {
		type: Number
	},
	Comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
});
productSchema.pre('save', function(next) {
    var product = this;
	mongoose.models["Product"].findOne({_id : product._id},function(err, results) {
		if(err) {
            next(err);
        } else if(results) {
            product.invalidate("ID","ID is already in use. Please choose another one");
            next(new Error("ID is already in use"));
        } else {
			next();
        }
	});
});
module.exports = mongoose.model('Product', productSchema);