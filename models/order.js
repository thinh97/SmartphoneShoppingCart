var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order =  new Schema({
	_id: {
		type: String,
		required: [true,'Please enter id']
	},
    UserName: {type: String, required: true, maxlength:50},
	MobilePhone: {type: String, required: true, minlength:10, maxlength:11},
    BillAddress: {type: String, required: [true, 'Please enter bill address']},
    Coupon: String,
    PaymentMethod:{
        type:String, 
        enum: ['Payment on delivery' , 'Online payment'],
        required:[ true, 'Please choose payment method']
	},
    CreateDate: Date,
	DeliveryDate: {type: Date, required: true} 
});

module.exports = mongoose.model('Order', Order);