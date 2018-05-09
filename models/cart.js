var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cart =  new Schema({
    UserName:{type: String, required: true, unique: true},
	Orders: [{type: String, required: true}],
    Amount:{type:Number,min:1, max:20, required: true},
    Total: {type: Number, required: true}
});

module.exports = mongoose.model('Cart', Cart);