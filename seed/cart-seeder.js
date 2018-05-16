var Cart = require('../models/cart');

var mongoose = require('mongoose');

mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;
var carts = [
  new Cart({
    Orders:['5af8443d283c8c0f306fa68a'],
    UserId: 'hatich',
    Total: 9890000
  }),
  new Cart({
    Orders:['5af8443d283c8c0f306fa68b'],
    UserId: 'frochat',
    Total: 5000000,
  }),
  new Cart({
    Orders:['5af8443d283c8c0f306fa68c'],
    UserId: 'eparequir',
    Total: 9990000
  }),
];
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!');
  var count = 0;
  for (var i = 0; i < carts.length; i++) {
	carts[i].save(function (err) {
		if (err) 
			console.log(err);
		else
			console.log('saved!');
		count += 1;
		if (count === carts.length)
			mongoose.disconnect();
	});
  } 
});
