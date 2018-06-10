var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;
var products = [
  new Product({
    ImagePath: ['/images/htc-u-ultra-1.jpg','/images/htc-u-ultra-2.jpg','/images/htc-u-ultra-3.jpg','/images/htc-u-ultra-4.jpg'],
    Title: 'Điện thoại HTC U Ultra',
	Details: {
		Screen: 'Super LCD, Chính: 5.7", phụ: 2.05", Quad HD (2K)',
		OS: 'Android 7.0 (Nougat)',
		PrimaryCamera: 16,
		SecondaryCamera: 12,
		CPU: 'Qualcomm Snapdragon 821 4 nhân 64-bit',
		RAM: 4,
		Memory: 64 ,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3000
	},
    Description: 'HTC U Ultra đánh dấu sự trở lại của HTC với triết lý thiết kế mới, đẹp hơn - sang trọng - bóng bẩy hơn và đặc biệt gắn bó với người dùng hơn thông qua trợ lý ảo HTC Sense Companion.',
    Price: 9890000,
	Brand: 'htc',
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/iphone-8-plus-hh-1.jpg','/images/iphone-8-plus-hh-2.jpg','/images/iphone-8-plus-hh-3.jpg','/images/iphone-8-plus-hh-4.jpg'],
    Title: 'Điện thoại iPhone 8 Plus 64GB',
	Details: {
		Screen: 'LED-backlit IPS LCD, 5.5", Retina HD',
		OS: 'iOS 11',
		PrimaryCamera: 12,
		SecondaryCamera: 7,
		CPU: 'Apple A11 Bionic 6 nhân',
		RAM: 3,
		Memory: 64,
		Sim: '1 Nano SIM, Hỗ trợ 4G',
		Battery: 2691
	},
    Description: 'Thừa hưởng thiết kế đã đạt đến độ chuẩn mực, thế hệ iPhone 8 Plus thay đổi phong cách bóng bẩy hơn và bổ sung hàng loạt tính năng cao cấp cho trải nghiệm sử dụng vô cùng tuyệt vời.',
    Brand: 'apple',
	Price: 23990000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/iphone-6s-32gb-vang-dong-1.jpg','/images/iphone-6s-32gb-vang-dong-2.jpg','/images/iphone-6s-32gb-vang-dong-3.jpg','/images/iphone-6s-32gb-vang-dong-4.jpg'],
    Title: 'Điện thoại iPhone 6s 32GB',
	Details: {
		Screen: 'LED-backlit IPS LCD, 4.7", Retina HD',
		OS: '	iOS 11',
		PrimaryCamera: 12,
		SecondaryCamera: 5,
		CPU: 'Apple A9 2 nhân 64-bit',
		RAM: 2,
		Memory: 32,
		Sim: '1 Nano SIM, Hỗ trợ 4G',
		Battery: 1715
	},
    Description: 'iPhone 6s 32 GB xứng đáng là phiên bản nâng cấp hoàn hảo từ iPhone 6 với nhiều tính năng mới hấp dẫn.',
	Brand: 'apple',
    Price: 12490000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/iphone-x-256gb-a1-1.jpg','/images/iphone-x-256gb-a1-2.jpg','/images/iphone-x-256gb-a1-3.jpg','/images/iphone-x-256gb-a1-4.jpg'],
    Title: 'Điện thoại iPhone X 256GB',
	Details: {
		Screen: 'OLED, 5.8", Super Retina',
		OS: 'iOS 11',
		PrimaryCamera: 12,
		SecondaryCamera: 7,
		CPU: 'Apple A11 Bionic 6 nhân',
		RAM: 3,
		Memory: 256,
		Sim: '1 Nano SIM, Hỗ trợ 4G',
		Battery: 2716
	},
    Description: 'iPhone X được Apple ra mắt ngày 12/9 vừa rồi đánh dấu chặng đường 10 năm lần đầu tiên iPhone ra đời. Sau một thời gian, giá iPhone X cũng được công bố. iPhone X mang trên mình thiết kế hoàn toàn mới với màn hình Super Retina viền cực mỏng và trang bị nhiều công nghệ hiện đại như nhận diện khuôn mặt Face ID, sạc pin nhanh và sạc không dây cùng khả năng chống nước bụi cao cấp.',
    Brand: 'apple',
	Price: 34790000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/motorola-moto-g5s-plus-hh-1.jpg','/images/motorola-moto-g5s-plus-hh-2.jpg','/images/motorola-moto-g5s-plus-hh-3.jpg','/images/motorola-moto-g5s-plus-hh-4.jpg'],
    Title: 'Điện thoại Motorola Moto G5S Plus',
	Details: {
		Screen: 'IPS LCD, 5.5", Full HD',
		OS: 'Android 7.1 (Nougat)',
		PrimaryCamera: 13,
		SecondaryCamera: 8,
		CPU: 'Snapdragon 625 8 nhân 64-bit',
		RAM: 4,
		Memory: 32,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3000
	},
    Description: 'Moto G5S Plus là smartphone kế thừa mẫu tiền nhiệm Moto G5 với nhiều nâng cấp đáng giá như camera kép và vẫn sở hữu cho mình mức giá hấp dẫn.',
    Brand: 'motorola',
	Price: 6990000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/oppo-f5-6gb-anhava-1.jpg','/images/oppo-f5-6gb-anhava-2.jpg','/images/oppo-f5-6gb-anhava-3.jpg','/images/oppo-f5-6gb-anhava-4.jpg'],
    Title: 'Điện thoại OPPO F5 6GB',
	Details: {
		Screen: 'IPS LCD, 6.0", Full HD+',
		OS: 'ColorOS 3.2 (Android 7.1)',
		PrimaryCamera: 16,
		SecondaryCamera: 20,
		CPU: 'Mediatek Helio P23',
		RAM: 6,
		Memory: 64,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3200
	},
    Description: 'OPPO F5 6GB là phiên bản nâng cấp cấu hình của chiếc OPPO F5, chuyên gia selfie làm đẹp thông minh và màn hình tràn viền tuyệt đẹp.',
    Brand: 'oppo',
	Price: 8990000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/oppo-f7-128gb-den-1.jpg','/images/oppo-f7-128gb-den-2.jpg','/images/oppo-f7-128gb-den-3.jpg','/images/oppo-f7-128gb-den-4.jpg'],
    Title: 'Điện thoại OPPO F7 128GB',
	Details: {
		Screen: 'LTPS LCD, 6.23", Full HD+',
		OS: 'ColorOS 5.0 (Android 8.1)',
		PrimaryCamera: 16,
		SecondaryCamera: 25,
		CPU: 'MediaTek Helio P60',
		RAM: 6,
		Memory: 128,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3400
	},
    Description: 'Tiếp nối sự thành công của OPPO F5 thì OPPO tiếp tục giới thiệu OPPO F7 128GB với mức giá tương đương nhưng mang trong mình thiết kế hoàn toàn mới cũng nhiều cải tiến đáng giá.',
    Brand: 'oppo',
	Price: 9990000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/samsung-galaxy-a8-plus-2018-hh-1.jpg','/images/samsung-galaxy-a8-plus-2018-hh-2.jpg','/images/samsung-galaxy-a8-plus-2018-hh-3.jpg','/images/samsung-galaxy-a8-plus-2018-hh-4.jpg'],
    Title: 'Điện thoại Samsung Galaxy A8+ (2018)',
	Details: {
		Screen: 'Super AMOLED, 5.6", Full HD+',
		OS: 'Android 7.1 (Nougat)',
		PrimaryCamera: 8,
		SecondaryCamera: 16,
		CPU: 'Exynos 7885 8 nhân 64-bit',
		RAM: 4,
		Memory: 32,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3000
	},
    Description: 'Samsung Galaxy A8+ (2018) là phiên bản lớn hơn của chiếc Samsung Galaxy A8 (2018) phù hợp với những bạn yêu thích một thiết bị có màn hình lớn và thời lượng pin bền bỉ.',
    Brand: 'samsung',
	Price: 13490000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/samsung-galaxy-j2-pro-2018-1.jpg','/images/samsung-galaxy-j2-pro-2018-2.jpg','/images/samsung-galaxy-j2-pro-2018-3.jpg','/images/samsung-galaxy-j2-pro-2018-4.jpg'],
    Title: 'Điện thoại Samsung Galaxy J2 Pro (2018)',
	Details: {
		Screen: 'Super AMOLED, 5", qHD',
		OS: 'Android 7.1 (Nougat)',
		PrimaryCamera: 8,
		SecondaryCamera: 5,
		CPU: 'Qualcomm Snapdragon 425 4 nhân 64-bit',
		RAM: 2,
		Memory: 16,
		Sim: '2 Micro SIM, Hỗ trợ 4G',
		Battery: 2600
	},
    Description: 'Đem đến nhiều lựa chọn cho người tiêu dùng hơn, dòng sản phẩm chuẩn bị ra mắt của Samsung là Samsung J2 Pro 2018 sở hữu thiết kế ánh kim thời thượng, đường nét thanh lịch, dù chỉ ở phân khúc giá rẻ.',
    Brand: 'samsung',
	Price: 8990000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/samsung-galaxy-j7-prime-1.jpg','/images/samsung-galaxy-j7-prime-2.jpg','/images/samsung-galaxy-j7-prime-3.jpg','/images/samsung-galaxy-j7-prime-4.jpg'],
    Title: 'Điện thoại Samsung Galaxy J7 Prime',
	Details: {
		Screen: 'PLS TFT LCD, 5.5", Full HD',
		OS: 'Android 6.0 (Marshmallow)',
		PrimaryCamera: 12,
		SecondaryCamera: 8,
		CPU: 'Exynos 7870 8 nhân 64-bit',
		RAM: 3,
		Memory: 32,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3300
	},
    Description: 'Galaxy J7 Prime xứng đáng là cái tên hàng đầu trong danh sách chọn smartphone phổ thông của giới trẻ khi nhận được nhiều đánh giá tích cực về thiết kế, thời lượng pin lâu dài và camera chụp hình chất lượng tốt.',
    Brand: 'samsung',
	Price: 4990000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/samsung-galaxy-j7-plus-1.jpg','/images/samsung-galaxy-j7-plus-2.jpg','/images/samsung-galaxy-j7-plus-3.jpg','/images/samsung-galaxy-j7-plus-4.jpg'],
    Title: 'Điện thoại Samsung Galaxy J7 Plus',
	Details: {
		Screen: 'Super AMOLED, 5.5", Full HD',
		OS: 'Android 7.0 (Nougat)',
		PrimaryCamera: 13,
		SecondaryCamera: 16,
		CPU: 'Mediatek Helio P25 Lite 8 nhân',
		RAM: 4,
		Memory: 32,
		Sim: '2 SIM Nano (SIM 2 chung khe thẻ nhớ), Hỗ trợ 4G',
		Battery: 3000
	},
    Description: 'Samsung Galaxy J7+ là dòng smartphone tầm trung nhưng được trang bị camera kép có khả năng chụp ảnh xóa phông chân dung cùng thiết kế đẹp và hiệu năng mạnh mẽ.',
    Brand: 'samsung',
	Price: 7290000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/samsung-galaxy-j7-pro-hh-1.jpg','/images/samsung-galaxy-j7-pro-hh-2.jpg','/images/samsung-galaxy-j7-pro-hh-3.jpg','/images/samsung-galaxy-j7-pro-hh-4.jpg'],
    Title: 'Điện thoại Samsung Galaxy J7 Pro',
	Details: {
		Screen: 'Super AMOLED, 5.5", Full HD',
		OS: '	Android 7.0 (Nougat)',
		PrimaryCamera: 13,
		SecondaryCamera: 13,
		CPU: '	Exynos 7870 8 nhân 64-bit',
		RAM: 3,
		Memory: 32,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3600
	},
    Description: 'Samsung Galaxy J7 Pro là một chiếc smartphone phù hợp với những người yêu thích một sản phẩm pin tốt, thích hệ điều hành mới cùng những tính năng đi kèm độc quyền của Samsung.',
    Brand: 'samsung',
	Price: 6090000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/samsung-galaxy-note8-hh-1.jpg','/images/samsung-galaxy-note8-hh-2.jpg','/images/samsung-galaxy-note8-hh-3.jpg','/images/samsung-galaxy-note8-hh-4.jpg'],
    Title: 'Điện thoại Samsung Galaxy Note 8',
	Details: {
		Screen: 'Super AMOLED, 6.3", Quad HD+ (2K+)',
		OS: 'Super AMOLED, 6.3", Quad HD+ (2K+)',
		PrimaryCamera: 12,
		SecondaryCamera: 8,
		CPU: 'Exynos 8895 8 nhân 64-bit',
		RAM: 6,
		Memory: 64,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3300
	},
    Description: 'Galaxy Note 8 là niềm hy vọng vực lại dòng Note danh tiếng của Samsung với diện mạo nam tính, sang trọng. Trang bị camera kép xóa phông thời thượng, màn hình vô cực như trên S8 Plus, bút Spen với nhiều tính năng mới và nhiều công nghệ được Samsung ưu ái đem lên Note 8.',
    Brand: 'samsung',
	Price: 22490000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/samsung-galaxy-s8-plus-hh-1.jpg','/images/samsung-galaxy-s8-plus-hh-2.jpg','/images/samsung-galaxy-s8-plus-hh-3.jpg','/images/samsung-galaxy-s8-plus-hh-4.jpg'],
    Title: 'Điện thoại Samsung Galaxy S8 Plus',
	Details: {
		Screen: 'Super AMOLED, 6.2", Quad HD+ (2K+)',
		OS: 'Android 7.0 (Nougat)',
		PrimaryCamera: 12,
		SecondaryCamera: 8,
		CPU: 'Exynos 8895 8 nhân 64-bit',
		RAM: 4,
		Memory: 64,
		Sim: '2 SIM Nano (SIM 2 chung khe thẻ nhớ), Hỗ trợ 4G',
		Battery: 3500
	},
    Description: 'Galaxy S8 và S8 Plus hiện đang là chuẩn mực smartphone về thiết kế trong tương lai. Sau nhiều ngày được sử dụng, mình xin chia sẻ những cảm nhận chi tiết nhất về chiếc Galaxy S8 Plus - thiết bị đang có doanh số đặt hàng khủng nhất hiện tại.',
    Brand: 'samsung',
	Price: 17990000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/samsung-galaxy-s9-plus-64gb-1.jpg','/images/samsung-galaxy-s9-plus-64gb-2.jpg','/images/samsung-galaxy-s9-plus-64gb-3.jpg','/images/samsung-galaxy-s9-plus-64gb-4.jpg'],
    Title: 'Điện thoại Samsung Galaxy S9+ 64GB',
	Details: {
		Screen: 'Super AMOLED, 6.2", Quad HD+ (2K+)',
		OS: 'Android 8.0 (Oreo)',
		PrimaryCamera: 12,
		SecondaryCamera: 8,
		CPU: 'Exynos 9810 8 nhân 64 bit',
		RAM: 6,
		Memory: 64,
		Sim: '2 SIM Nano (SIM 2 chung khe thẻ nhớ), Hỗ trợ 4G',
		Battery: 3500
	},
    Description: 'Samsung Galaxy S9 Plus, siêu phẩm smartphone hàng đầu trong thế giới Android đã ra mắt với màn hình vô cực, camera chuyên nghiệp như máy ảnh và hàng loạt những tính năng cao cấp đầy hấp dẫn.',
    Brand: 'samsung',
	Price: 23490000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/sony-xperia-xa1-ultra-pink-hh-1.jpg','/images/sony-xperia-xa1-ultra-pink-hh-2.jpg','/images/sony-xperia-xa1-ultra-pink-hh-3.jpg','/images/sony-xperia-xa1-ultra-pink-hh-4.jpg'],
    Title: 'Điện thoại Sony Xperia XA1 Ultra Pink',
	Details: {
		Screen: 'IPS LCD, 6.0", Full HD',
		OS: 'Android 7.0 (Nougat)',
		PrimaryCamera: 23,
		SecondaryCamera: 16,
		CPU: 'Mediatek Helio P20',
		RAM: 4,
		Memory: 64,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 2700
	},
    Description: 'Sau một thời gian xuất hiện tại Việt Nam và nhận được nhiều sự quan tâm từ người dùng thì mới đây Sony đã tung ra phiên bản màu hồng cho chiếc Sony Xperia XA1 Ultra để phục vụ riêng cho "phái đẹp".',
    Brand: 'sony',
	Price: 6990000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/sony-xperia-xz2-1.jpg','/images/sony-xperia-xz2-2.jpg','/images/sony-xperia-xz2-3.jpg','/images/sony-xperia-xz2-4.jpg'],
    Title: 'Điện thoại Sony Xperia XZ2',
	Details: {
		Screen: 'IPS HDR LCD, 5.7", Full HD+',
		OS: 'Android 8.0 (Oreo)',
		PrimaryCamera: 19,
		SecondaryCamera: 5,
		CPU: 'Snapdragon 845 8 nhân',
		RAM: 4,
		Memory: 64,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3180
	},
    Description: 'Xperia XZ2 là chiếc flagship mới được Sony giới thiệu tại MWC 2018 với sự thay đổi lớn về thiết kế so với những người tiền nhiệm.',
    Brand: 'sony',
	Price: 19990000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/vivo-v9-1.jpg','/images/vivo-v9-2.jpg','/images/vivo-v9-3.jpg','/images/vivo-v9-4.jpg'],
    Title: 'Điện thoại Vivo V9',
	Details: {
		Screen: 'IPS LCD, 6.3", Full HD+',
		OS: 'Android 8.1 (Oreo)',
		PrimaryCamera: 16,
		SecondaryCamera: 24,
		CPU: 'Snapdragon 626 8 nhân 64-bit',
		RAM: 6,
		Memory: 64,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3260
	},
    Description: 'Vivo V9 là chiếc smartphone tầm trung cận cao cấp với điểm nhấn là máy có camera kép phía sau và camera selfie độ phân giải cao 24 MP.',
    Brand: 'vivo',
	Price: 7990000,
	Views: 0,
	Comments:[]
  }),
  new Product({
    ImagePath: ['/images/bkav-bphone-2-1.jpg','/images/bkav-bphone-2-2.jpg','/images/bkav-bphone-2-3.jpg','/images/bkav-bphone-2-4.jpg','/images/bkav-bphone-2-5.jpg','/images/bkav-bphone-2-6.jpg'],
    Title: 'Điện thoại Bphone 2017',
	Details: {
		Screen: 'IPS LCD, 5.5", Full HD',
		OS: 'BOS (Android 7.1)',
		PrimaryCamera: 16,
		SecondaryCamera: 8,
		CPU: 'Snapdragon 625 8 nhân 64-bit',
		RAM: 3,
		Memory: 32,
		Sim: '2 Nano SIM, Hỗ trợ 4G',
		Battery: 3200
	},
    Description: 'Bphone 2017 là chiếc smartphone thế hệ thứ 2 được nhà sản xuất Việt Nam Bkav trình làng với hàng loạt cải tiến vượt trội, tối ưu tốt nhất cho người Việt và giá bán rất tốt.',
    Brand: 'bkav',
	Price: 9790000,
	Views: 0,
	Comments:[]
  })
];
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connected!');
  var count = 0;
  for (var i = 0; i < products.length; i++) {
	products[i].save(function (err) {
		if (err) 
			console.log(err);
		else
			console.log('saved!');
		count += 1;
		if (count === products.length)
			mongoose.disconnect();
	});
  } 
});