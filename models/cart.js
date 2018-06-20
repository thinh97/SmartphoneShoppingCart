// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var Cart =  new Schema({
//     UserId:{type: String, ref: 'User', required: true, unique: true},
// 	Orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
//     Total: {type: Number, required: true},
// });
module.exports = function Cart(oldCart){
    this.items= oldCart.items || {};
    this.totalQty= oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0 ;

    this.add = function(item,id){
        var storedItem =  this.items[id];
        if(!storedItem){
            storedItem = this.items[id] ={item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.Price = storedItem.item.Price * storedItem.qty;
        this.totalQty++;
        this.totalPrice +=storedItem.item.Price;
    };

    this.generateArray = function(){
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
}
// module.exports = mongoose.model('Cart', Cart);