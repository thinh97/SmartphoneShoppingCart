var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brandSchema = new Schema({
	_id: {
		type: String,
		required: [true,'Please enter id'],
	},
    Name: {
		type: String, 
		required: [true,'Please enter brand name'],
		maxlength: [200, 'Your name is to long']
	},
	Products: [{
		ref: 'Product',
		type: String
	}]
});
brandSchema.pre('save', function(next) {
    var brand = this;
	mongoose.models["Brand"].findOne({_id : brand._id},function(err, results) {
		if(err) {
            next(err);
        } else if(results) {
            brand.invalidate("ID","ID is already in use. Please choose another one");
            next(new Error("ID is already in use"));
        } else {
			next();
        }
	});
});

module.exports = mongoose.model('Brand', brandSchema);