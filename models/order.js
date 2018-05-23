var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order =  new Schema({
    UserId: {type: String, ref: 'User', required: true, maxlength:50},
    Name: {
        type: String,
        required: [true,'Vui lòng điền tên người nhận'],
        maxlength: [200, 'Tên quả dài']
    },
	MobilePhone: {type: String, required: true, minlength:10, maxlength:11},
    BillAddress: {type: String, required: [true, 'Vui lòng điền địa chỉ nhận hàng']},
    Coupon: String,
    PaymentMethod:{
        type:String, 
        enum: ['Payment on delivery' , 'Online payment'],
        required:[ true, 'Vui lòng chọn kiểu thanh toán']
	},
    CreateDate: Date,
	DeliveryDate: Date,
	Amount:{type:Number,min:0, max:99, required: [true, 'Bạn mua quá nhiều']},
    Status:{
        type: String,
        enum: ['Completed','Pending','Failed'],
        required:[ true, 'Vui lòng chọn kiểu tình trạng đơn hàng']
    }
});

Order.pre('save', function(next) {
    this.CreateDate = new Date();
	next();
});

module.exports = mongoose.model('Order', Order);