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

    this.add = function(item,id, quantity){
        var storedItem =  this.items[id];
        if(!storedItem){
            storedItem = this.items[id] ={item: item, qty: 0, price: 0};
        }
        storedItem.qty += quantity;
        storedItem.Price = storedItem.item.Price * storedItem.qty;
        this.totalQty += quantity;
        this.totalPrice +=storedItem.item.Price;
    };

    this.generateArray = function(){
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }

    this.reduceByOne = function(id){
        this.items[id].qty--;
        this.items[id].Price -= this.items[id].item.Price;
        this.totalQty--;
        this.totalPrice -=this.items[id].item.Price;
        
        if(this.items[id].qty <=0){
            delete this.items[id];
        }
    };

    this.delete = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].Price;
        delete this.items[id];
    }
};
// module.exports = mongoose.model('Cart', Cart);