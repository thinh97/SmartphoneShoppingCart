var Order = require('../models/order');

var mongoose = require('mongoose');

mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;
var orders = [
  new Order({
	_id: '0001',
    UserName: 'Hatich',
    MobilePhone: '01659032295',
    BillAddress: '135 Trần Hưng Đạo, quận 1, TPHCM',
    Coupon: '153A91F',
    PaymentMethod:'Payment on delivery',
    DeliveryDate: 03/05/2018
  }),
  new Order({
	_id: '0002',
    UserName: 'Frochat',
    MobilePhone: '01659032255',
    BillAddress: '13a Lý Thường Kiệt, quận 1, TPHCM',
    Coupon: '',
    PaymentMethod:'Payment on delivery',
    DeliveryDate: 04/05/2018
  }),
  new Order({
	_id: '0003',
    UserName: 'Eparequir',
    MobilePhone: '0566345955',
    BillAddress: '135 Nguyễn Thái Học, quận Thủ Đức, TPHCM',
    Coupon: '153A91FD',
    PaymentMethod:'Online payment',
    DeliveryDate: 03/05/2018
  })
];
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!');

  for (var i = 0; i < orders.length; i++) {
	orders[i].save(function (err) {
		if (err) 
			console.log(err);
		else
			console.log('saved!');

		if (i === orders.length)
			mongoose.disconnect();
	});
  } 
});