var Order = require('../models/order');
var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected!');

  Product.find(function (err, result) {
     if (err){
         console.log(err);
     }
     else{
         var orders = [
             new Order({
                 UserId: 'hatich',
                 Name: 'Hatich AA',
                 MobilePhone: '01659032295',
                 BillAddress: '135 Trần Hưng Đạo, quận 1, TPHCM',
                 ProductId: result[0]._id,
                 PaymentMethod:'Thanh toán khi nhận hàng',
                 DeliveryDate: '2018-12-30',
                 Status: 'Đang xử lý',
                 Amount: 2
             }),
             new Order({
                 UserId: 'frochat',
                 Name: 'Frochat BB',
                 MobilePhone: '01659032255',
                 BillAddress: '13a Lý Thường Kiệt, quận 1, TPHCM',
                 ProductId: result[1]._id,
                 PaymentMethod:'Thanh toán khi nhận hàng',
                 DeliveryDate: '2018-11-25',
                 Status: 'Hoàn thành',
                 Amount: 3
             }),
             new Order({
                 UserId: 'eparequir',
                 Name: 'Eparequir DD',
                 MobilePhone: '0566345955',
                 BillAddress: '135 Nguyễn Thái Học, quận Thủ Đức, TPHCM',
                 ProductId: result[2]._id,
                 PaymentMethod:'Thanh toán online',
                 DeliveryDate: '2018-10-30',
                 Status: 'Thất bại',
                 Amount: 4
             })
         ];
         var count = 0;
         for (var i = 0; i < orders.length; i++) {
             orders[i].save(function (err) {
                 if (err)
                     console.log(err);
                 else
                     console.log('saved!');
                 count += 1;
                 if (count === orders.length)
                     mongoose.disconnect();
             });
         }
     }
  });
});