var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order =  new Schema({
    UserId: {type: String, ref: 'User', required: true, maxlength:50},
	MobilePhone: {type: String, required: true, minlength:10, maxlength:11},
    BillAddress: {type: String, required: [true, 'Please enter bill address']},
    Coupon: String,
    PaymentMethod:{
        type:String, 
        enum: ['Payment on delivery' , 'Online payment'],
        required:[ true, 'Please choose payment method']
	},
    CreateDate: Date,
	DeliveryDate: {type: Date, required: true},
	Amount:{type:Number,min:0, max:99, required: true}
});

Order.pre('save', function(next) {
    this.CreateDate = new Date();
	next();
});

module.exports = mongoose.model('Order', Order);