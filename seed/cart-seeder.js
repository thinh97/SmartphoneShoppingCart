var Cart = require('../models/cart');
var Order = require('../models/order');

var mongoose = require('mongoose');

mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected!');
    var count = 0;

    Order.find({UserId: 'hatich'}, function (err, result) {
        if (err)
            console.log(err);
        else{
            var cart = {
                Total: 9890000,
                Orders: []
            };
            result.forEach(function (order) {
                cart.Orders.push(order._id);
            });
            Cart.updateOne({UserId: 'hatich'}, cart, function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 3)
                        mongoose.disconnect();
                }
            });
        }
    });

    Order.find({UserId: 'frochat'}, function (err, result) {
        if (err)
            console.log(err);
        else{
            var cart = {
                Total: 5000000,
                Orders: []
            };
            result.forEach(function (order) {
                cart.Orders.push(order._id);
            });
            Cart.updateOne({UserId: 'frochat'}, cart, function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 3)
                        mongoose.disconnect();
                }
            });
        }
    });

    Order.find({UserId: 'eparequir'}, function (err, result) {
        if (err)
            console.log(err);
        else{
            var cart = {
                Total: 9890000,
                Orders: []
            };
            result.forEach(function (order) {
                cart.Orders.push(order._id);
            });
            Cart.updateOne({UserId: 'eparequir'}, cart, function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 3)
                        mongoose.disconnect();
                }
            });
        }
    });
});
