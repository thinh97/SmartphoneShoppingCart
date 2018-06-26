var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    Name: {
		type: String,
		required: [true,'Vui lòng điền tên đăng nhập'],
		maxlength: [200, 'Tên đăng nhập quá dài']
	},
	Comment: {
		type: String,
		required: [true,'Vui lòng điền nội dung']
	},
	Product: {
		ref: 'Product',
		type: Schema.Types.ObjectId
	},
	CreateOn: {
    	type: Date
	}
});

module.exports = mongoose.model('Comment', commentSchema);