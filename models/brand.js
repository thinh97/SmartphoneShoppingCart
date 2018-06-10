var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brandSchema = new Schema({
	_id: {
		type: String,
		required: [true,'Vui lòng điền id'],
	},
    Name: {
		type: String, 
		required: [true,'Vui lòng điền tên nhãn hiệu'],
		maxlength: [200, 'Tên nhãn hiệu quá dài']
	},
	Products: [{
		ref: 'Product',
		type: Schema.ObjectId
	}]
});
brandSchema.pre('save', function(next) {
    var brand = this;
	mongoose.models["Brand"].findOne({_id : brand._id},function(err, result) {
		if(err) {
            next(err);
        } else if(result) {
			if (brand._id === result._id)
            	next(new Error("ID đã được sử dụng"));
			else
				next();
        } else {
			next();
        }
	});
});

module.exports = mongoose.model('Brand', brandSchema);