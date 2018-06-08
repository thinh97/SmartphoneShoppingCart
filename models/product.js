var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
	_id: {
		type: String,
		required: [true,'Vui lòng điền id']
	},
    ImagePath: [{
		type: String, 
		required: [true,'Vui lòng thêm hình ảnh']
	}],
    Title: {
		type: String, 
		required: [true,'Vui lòng điền tiêu đề']
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
		required: [true,'Vui lòng điền mô tả']
	},
    Price: {
		type: Number, 
		min:1,
		required: [true,'Vui lòng điền giá sản phẩm']
	},
	Brand: {
		type: String, 
		required: [true,'Vui lòng điền mã nhãn hiệu'],
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
	mongoose.models['Product'].findOne({_id : product._id},function(err, result) {
		if(err) {
            next(err);
        } else if(result) {
			if (result._id === product._id)
            	next(new Error('ID đã được sử dụng'));
			else
				next();
        } else {
			next();
        }
	});
});
module.exports = mongoose.model('Product', productSchema);