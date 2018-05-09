var Cart = require('../models/cart');

var mongoose = require('mongoose');

mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;
var carts = [
  new Cart({
    Orders:['0001'],
    UserName: 'Hatich',
    Amount: 2,
    Total: 9890000
  }),
  new Cart({
    Orders:['0002'],
    UserName: 'Frochat',
    Amount: 1,
    Total: 5000000,
  }),
  new Cart({
    Orders:['0003'],
    UserName: 'Eparequir',
    Amount: 1,
    Total: 9990000
  }),
];
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!');

  for (var i = 0; i < carts.length; i++) {
	carts[i].save(function (err) {
		if (err) 
			console.log(err);
		else
			console.log('saved!');

		if (i === carts.length)
			mongoose.disconnect();
	});
  } 
});
