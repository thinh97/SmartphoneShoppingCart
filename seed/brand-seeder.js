var Brand = require('../models/brand');

var mongoose = require('mongoose');

mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;
var Brands = [
  new Brand({
	_id: 'htc',
    Name: 'HTC',
    Products: ['001']
  }),
  new Brand({
	_id: 'apple',
    Name: 'Apple',
    Products: ['002','003','004']
  }),
  new Brand({
	_id: 'motorola',
    Name: 'Motorola',
    Products: ['005']
  }),
  new Brand({
	_id: 'oppo',
    Name: 'OPPO',
    Products: ['006','007']
  }),
  new Brand({
	_id: 'samsung',
    Name: 'Samsung',
    Products: ['008','009','010','011','012','013','014','015']
  }),
  new Brand({
	_id: 'bkav',
    Name: 'Bkav',
    Products: ['019']
  }),
  new Brand({
	_id: 'sony',
    Name: 'Sony',
    Products: ['016','017']
  }),
  new Brand({
	_id: 'vivo',
    Name: 'Vivo',
    Products: ['018']
  })
];
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!');
  var count = 0;
  for (var i = 0; i < Brands.length; i++) {
	Brands[i].save(function (err) {
		if (err) 
			console.log(err);
		else
			console.log('saved!');
		count += 1;
		if (count === Brands.length)
			mongoose.disconnect();
	});
  } 
});
