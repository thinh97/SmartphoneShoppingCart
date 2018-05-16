var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cart =  new Schema({
    UserId:{type: String, ref: 'User', required: true, unique: true},
	Orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    Total: {type: Number, required: true},
});

module.exports = mongoose.model('Cart', Cart);