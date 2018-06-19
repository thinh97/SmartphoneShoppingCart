var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var Order =  new Schema({
//     UserId: {type: String, ref: 'User', required: true, maxlength:50},
//     ProductId: {type: String, ref: 'Product', required: true, maxlength:50},
//     Name: {
//         type: String,
//         required: [true,'Vui lòng điền tên người nhận'],
//         maxlength: [200, 'Tên quả dài']
//     },
// 	MobilePhone: {type: String, required: true, minlength:10, maxlength:11},
//     BillAddress: {type: String, required: [true, 'Vui lòng điền địa chỉ nhận hàng']},
//     PaymentMethod:{
//         type:String, 
//         enum: ['Thanh toán khi nhận hàng' , 'Thanh toán online'],
//         required:[ true, 'Vui lòng chọn kiểu thanh toán']
// 	},
//     CreateDate: Date,
// 	DeliveryDate: Date,
// 	Amount:{type:Number,min:0, max:99, required: [true, 'Bạn mua quá nhiều']},
//     Status:{
//         type: String,
//         enum: ['Hoàn thành','Đang xử lý','Thất bại', 'Đã hủy'],
//         required:[ true, 'Vui lòng chọn tình trạng đơn hàng']
//     }
// });

// Order.pre('save', function(next) {
//     this.CreateDate = new Date();
// 	next();
// });

var Order = new Schema({
    user: {type :Schema.Types.ObjectId , ref:'User'},
    cart: {type: Object, required:true},
    name: {type: String, required : true},
    address:{type: String, required: true},
    email: {type: String, required: true},
    phonenumber: {type: String, required: true, minlength:10, maxlength:11}
})
module.exports = mongoose.model('Order', Order);