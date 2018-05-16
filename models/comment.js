var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    Name: {
		type: String,
		required: [true,'Please enter user name'],
		maxlength: [200, 'Your name is to long']
	},
	Comment: {
		type: String,
		required: [true,'Please enter comment']
	},
	Product: {
		ref: 'Product',
		type: String
	}
});

module.exports = mongoose.model('Comment', commentSchema);