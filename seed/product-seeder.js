var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;
var products = [
  new Product({
	_id: '001',
    imagePath: ['/images/htc-u-ultra-1.jpg','/images/htc-u-ultra-2.jpg','/images/htc-u-ultra-3.jpg','/images/htc-u-ultra-4.jpg'],
    title: 'Điện thoại HTC U Ultra',
	details: {
		screen: 'Super LCD, Chính: 5.7", phụ: 2.05", Quad HD (2K)',
		os: 'Android 7.0 (Nougat)',
		primaryCamera: 16,
		secondaryCamera: 12,
		cpu: 'Qualcomm Snapdragon 821 4 nhân 64-bit',
		ram: 4,
		memory: 64 ,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3000
	},
    description: 'HTC U Ultra đánh dấu sự trở lại của HTC với triết lý thiết kế mới, đẹp hơn - sang trọng - bóng bẩy hơn và đặc biệt gắn bó với người dùng hơn thông qua trợ lý ảo HTC Sense Companion.',
    price: 9890000,
	producer: 'HTC',
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '002',
    imagePath: ['/images/iphone-8-plus-hh-1.jpg','/images/iphone-8-plus-hh-2.jpg','/images/iphone-8-plus-hh-3.jpg','/images/iphone-8-plus-hh-4.jpg'],
    title: 'Điện thoại iPhone 8 Plus 64GB',
	details: {
		screen: 'LED-backlit IPS LCD, 5.5", Retina HD',
		os: 'iOS 11',
		primaryCamera: 12,
		secondaryCamera: 7,
		cpu: 'Apple A11 Bionic 6 nhân',
		ram: 3,
		memory: 64,
		sim: '1 Nano SIM, Hỗ trợ 4G',
		battery: 2691
	},
    description: 'Thừa hưởng thiết kế đã đạt đến độ chuẩn mực, thế hệ iPhone 8 Plus thay đổi phong cách bóng bẩy hơn và bổ sung hàng loạt tính năng cao cấp cho trải nghiệm sử dụng vô cùng tuyệt vời.',
    producer: 'Apple',
	price: 23990000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '003',
    imagePath: ['/images/iphone-6s-32gb-vang-dong-1.jpg','/images/iphone-6s-32gb-vang-dong-2.jpg','/images/iphone-6s-32gb-vang-dong-3.jpg','/images/iphone-6s-32gb-vang-dong-4.jpg'],
    title: 'Điện thoại iPhone 6s 32GB',
	details: {
		screen: 'LED-backlit IPS LCD, 4.7", Retina HD',
		os: '	iOS 11',
		primaryCamera: 12,
		secondaryCamera: 5,
		cpu: 'Apple A9 2 nhân 64-bit',
		ram: 2,
		memory: 32,
		sim: '1 Nano SIM, Hỗ trợ 4G',
		battery: 1715
	},
    description: 'iPhone 6s 32 GB xứng đáng là phiên bản nâng cấp hoàn hảo từ iPhone 6 với nhiều tính năng mới hấp dẫn.',
	producer: 'Apple',
    price: 12490000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '004',
    imagePath: ['/images/iphone-x-256gb-a1-1.jpg','/images/iphone-x-256gb-a1-2.jpg','/images/iphone-x-256gb-a1-3.jpg','/images/iphone-x-256gb-a1-4.jpg'],
    title: 'Điện thoại iPhone X 256GB',
	details: {
		screen: 'OLED, 5.8", Super Retina',
		os: 'iOS 11',
		primaryCamera: 12,
		secondaryCamera: 7,
		cpu: 'Apple A11 Bionic 6 nhân',
		ram: 3,
		memory: 256,
		sim: '1 Nano SIM, Hỗ trợ 4G',
		battery: 2716
	},
    description: 'iPhone X được Apple ra mắt ngày 12/9 vừa rồi đánh dấu chặng đường 10 năm lần đầu tiên iPhone ra đời. Sau một thời gian, giá iPhone X cũng được công bố. iPhone X mang trên mình thiết kế hoàn toàn mới với màn hình Super Retina viền cực mỏng và trang bị nhiều công nghệ hiện đại như nhận diện khuôn mặt Face ID, sạc pin nhanh và sạc không dây cùng khả năng chống nước bụi cao cấp.',
    producer: 'Apple',
	price: 34790000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '005',
    imagePath: ['/images/motorola-moto-g5s-plus-hh-1.jpg','/images/motorola-moto-g5s-plus-hh-2.jpg','/images/motorola-moto-g5s-plus-hh-3.jpg','/images/motorola-moto-g5s-plus-hh-4.jpg'],
    title: 'Điện thoại Motorola Moto G5S Plus',
	details: {
		screen: 'IPS LCD, 5.5", Full HD',
		os: 'Android 7.1 (Nougat)',
		primaryCamera: 13,
		secondaryCamera: 8,
		cpu: 'Snapdragon 625 8 nhân 64-bit',
		ram: 4,
		memory: 32,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3000
	},
    description: 'Moto G5S Plus là smartphone kế thừa mẫu tiền nhiệm Moto G5 với nhiều nâng cấp đáng giá như camera kép và vẫn sở hữu cho mình mức giá hấp dẫn.',
    producer: 'Motorola',
	price: 6990000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '006',
    imagePath: ['/images/oppo-f5-6gb-anhava-1.jpg','/images/oppo-f5-6gb-anhava-2.jpg','/images/oppo-f5-6gb-anhava-3.jpg','/images/oppo-f5-6gb-anhava-4.jpg'],
    title: 'Điện thoại OPPO F5 6GB',
	details: {
		screen: 'IPS LCD, 6.0", Full HD+',
		os: 'ColorOS 3.2 (Android 7.1)',
		primaryCamera: 16,
		secondaryCamera: 20,
		cpu: 'Mediatek Helio P23',
		ram: 6,
		memory: 64,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3200
	},
    description: 'OPPO F5 6GB là phiên bản nâng cấp cấu hình của chiếc OPPO F5, chuyên gia selfie làm đẹp thông minh và màn hình tràn viền tuyệt đẹp.',
    producer: 'OPPO',
	price: 8990000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '007',
    imagePath: ['/images/oppo-f7-128gb-den-1.jpg','/images/oppo-f7-128gb-den-2.jpg','/images/oppo-f7-128gb-den-3.jpg','/images/oppo-f7-128gb-den-4.jpg'],
    title: 'Điện thoại OPPO F7 128GB',
	details: {
		screen: 'LTPS LCD, 6.23", Full HD+',
		os: 'ColorOS 5.0 (Android 8.1)',
		primaryCamera: 16,
		secondaryCamera: 25,
		cpu: 'MediaTek Helio P60',
		ram: 6,
		memory: 128,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3400
	},
    description: 'Tiếp nối sự thành công của OPPO F5 thì OPPO tiếp tục giới thiệu OPPO F7 128GB với mức giá tương đương nhưng mang trong mình thiết kế hoàn toàn mới cũng nhiều cải tiến đáng giá.',
    producer: 'OPPO',
	price: 9990000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '008',
    imagePath: ['/images/samsung-galaxy-a8-plus-2018-hh-1.jpg','/images/samsung-galaxy-a8-plus-2018-hh-2.jpg','/images/samsung-galaxy-a8-plus-2018-hh-3.jpg','/images/samsung-galaxy-a8-plus-2018-hh-4.jpg'],
    title: 'Điện thoại Samsung Galaxy A8+ (2018)',
	details: {
		screen: 'Super AMOLED, 5.6", Full HD+',
		os: 'Android 7.1 (Nougat)',
		primaryCamera: 8,
		secondaryCamera: 16,
		cpu: 'Exynos 7885 8 nhân 64-bit',
		ram: 4,
		memory: 32,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3000
	},
    description: 'Samsung Galaxy A8+ (2018) là phiên bản lớn hơn của chiếc Samsung Galaxy A8 (2018) phù hợp với những bạn yêu thích một thiết bị có màn hình lớn và thời lượng pin bền bỉ.',
    producer: 'Samsung',
	price: 13490000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '009',
    imagePath: ['/images/samsung-galaxy-j2-pro-2018-1.jpg','/images/samsung-galaxy-j2-pro-2018-2.jpg','/images/samsung-galaxy-j2-pro-2018-3.jpg','/images/samsung-galaxy-j2-pro-2018-4.jpg'],
    title: 'Điện thoại Samsung Galaxy J2 Pro (2018)',
	details: {
		screen: 'Super AMOLED, 5", qHD',
		os: 'Android 7.1 (Nougat)',
		primaryCamera: 8,
		secondaryCamera: 5,
		cpu: 'Qualcomm Snapdragon 425 4 nhân 64-bit',
		ram: 2,
		memory: 16,
		sim: '2 Micro SIM, Hỗ trợ 4G',
		battery: 2600
	},
    description: 'Đem đến nhiều lựa chọn cho người tiêu dùng hơn, dòng sản phẩm chuẩn bị ra mắt của Samsung là Samsung J2 Pro 2018 sở hữu thiết kế ánh kim thời thượng, đường nét thanh lịch, dù chỉ ở phân khúc giá rẻ.',
    producer: 'Samsung',
	price: 8990000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '010',
    imagePath: ['/images/samsung-galaxy-j7-prime-1.jpg','/images/samsung-galaxy-j7-prime-2.jpg','/images/samsung-galaxy-j7-prime-3.jpg','/images/samsung-galaxy-j7-prime-4.jpg'],
    title: 'Điện thoại Samsung Galaxy J7 Prime',
	details: {
		screen: 'PLS TFT LCD, 5.5", Full HD',
		os: 'Android 6.0 (Marshmallow)',
		primaryCamera: 12,
		secondaryCamera: 8,
		cpu: 'Exynos 7870 8 nhân 64-bit',
		ram: 3,
		memory: 32,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3300
	},
    description: 'Galaxy J7 Prime xứng đáng là cái tên hàng đầu trong danh sách chọn smartphone phổ thông của giới trẻ khi nhận được nhiều đánh giá tích cực về thiết kế, thời lượng pin lâu dài và camera chụp hình chất lượng tốt.',
    producer: 'Samsung',
	price: 4990000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '011',
    imagePath: ['/images/samsung-galaxy-j7-plus-1.jpg','/images/samsung-galaxy-j7-plus-2.jpg','/images/samsung-galaxy-j7-plus-3.jpg','/images/samsung-galaxy-j7-plus-4.jpg'],
    title: 'Điện thoại Samsung Galaxy J7 Plus',
	details: {
		screen: 'Super AMOLED, 5.5", Full HD',
		os: 'Android 7.0 (Nougat)',
		primaryCamera: 13,
		secondaryCamera: 16,
		cpu: 'Mediatek Helio P25 Lite 8 nhân',
		ram: 4,
		memory: 32,
		sim: '2 SIM Nano (SIM 2 chung khe thẻ nhớ), Hỗ trợ 4G',
		battery: 3000
	},
    description: 'Samsung Galaxy J7+ là dòng smartphone tầm trung nhưng được trang bị camera kép có khả năng chụp ảnh xóa phông chân dung cùng thiết kế đẹp và hiệu năng mạnh mẽ.',
    producer: 'Samsung',
	price: 7290000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '012',
    imagePath: ['/images/samsung-galaxy-j7-pro-hh-1.jpg','/images/samsung-galaxy-j7-pro-hh-2.jpg','/images/samsung-galaxy-j7-pro-hh-3.jpg','/images/samsung-galaxy-j7-pro-hh-4.jpg'],
    title: 'Điện thoại Samsung Galaxy J7 Pro',
	details: {
		screen: 'Super AMOLED, 5.5", Full HD',
		os: '	Android 7.0 (Nougat)',
		primaryCamera: 13,
		secondaryCamera: 13,
		cpu: '	Exynos 7870 8 nhân 64-bit',
		ram: 3,
		memory: 32,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3600
	},
    description: 'Samsung Galaxy J7 Pro là một chiếc smartphone phù hợp với những người yêu thích một sản phẩm pin tốt, thích hệ điều hành mới cùng những tính năng đi kèm độc quyền của Samsung.',
    producer: 'Samsung',
	price: 6090000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '013',
    imagePath: ['/images/samsung-galaxy-note8-hh-1.jpg','/images/samsung-galaxy-note8-hh-2.jpg','/images/samsung-galaxy-note8-hh-3.jpg','/images/samsung-galaxy-note8-hh-4.jpg'],
    title: 'Điện thoại Samsung Galaxy Note 8',
	details: {
		screen: 'Super AMOLED, 6.3", Quad HD+ (2K+)',
		os: 'Super AMOLED, 6.3", Quad HD+ (2K+)',
		primaryCamera: 12,
		secondaryCamera: 8,
		cpu: 'Exynos 8895 8 nhân 64-bit',
		ram: 6,
		memory: 64,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3300
	},
    description: 'Galaxy Note 8 là niềm hy vọng vực lại dòng Note danh tiếng của Samsung với diện mạo nam tính, sang trọng. Trang bị camera kép xóa phông thời thượng, màn hình vô cực như trên S8 Plus, bút Spen với nhiều tính năng mới và nhiều công nghệ được Samsung ưu ái đem lên Note 8.',
    producer: 'Samsung',
	price: 22490000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '014',
    imagePath: ['/images/samsung-galaxy-s8-plus-hh-1.jpg','/images/samsung-galaxy-s8-plus-hh-2.jpg','/images/samsung-galaxy-s8-plus-hh-3.jpg','/images/samsung-galaxy-s8-plus-hh-4.jpg'],
    title: 'Điện thoại Samsung Galaxy S8 Plus',
	details: {
		screen: 'Super AMOLED, 6.2", Quad HD+ (2K+)',
		os: 'Android 7.0 (Nougat)',
		primaryCamera: 12,
		secondaryCamera: 8,
		cpu: 'Exynos 8895 8 nhân 64-bit',
		ram: 4,
		memory: 64,
		sim: '2 SIM Nano (SIM 2 chung khe thẻ nhớ), Hỗ trợ 4G',
		battery: 3500
	},
    description: 'Galaxy S8 và S8 Plus hiện đang là chuẩn mực smartphone về thiết kế trong tương lai. Sau nhiều ngày được sử dụng, mình xin chia sẻ những cảm nhận chi tiết nhất về chiếc Galaxy S8 Plus - thiết bị đang có doanh số đặt hàng khủng nhất hiện tại.',
    producer: 'Samsung',
	price: 17990000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '015',
    imagePath: ['/images/samsung-galaxy-s9-plus-64gb-1.jpg','/images/samsung-galaxy-s9-plus-64gb-2.jpg','/images/samsung-galaxy-s9-plus-64gb-3.jpg','/images/samsung-galaxy-s9-plus-64gb-4.jpg'],
    title: 'Điện thoại Samsung Galaxy S9+ 64GB',
	details: {
		screen: 'Super AMOLED, 6.2", Quad HD+ (2K+)',
		os: 'Android 8.0 (Oreo)',
		primaryCamera: 12,
		secondaryCamera: 8,
		cpu: 'Exynos 9810 8 nhân 64 bit',
		ram: 6,
		memory: 64,
		sim: '2 SIM Nano (SIM 2 chung khe thẻ nhớ), Hỗ trợ 4G',
		battery: 3500
	},
    description: 'Samsung Galaxy S9 Plus, siêu phẩm smartphone hàng đầu trong thế giới Android đã ra mắt với màn hình vô cực, camera chuyên nghiệp như máy ảnh và hàng loạt những tính năng cao cấp đầy hấp dẫn.',
    producer: 'Samsung',
	price: 23490000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '016',
    imagePath: ['/images/sony-xperia-xa1-ultra-pink-hh-1.jpg','/images/sony-xperia-xa1-ultra-pink-hh-2.jpg','/images/sony-xperia-xa1-ultra-pink-hh-3.jpg','/images/sony-xperia-xa1-ultra-pink-hh-4.jpg'],
    title: 'Điện thoại Sony Xperia XA1 Ultra Pink',
	details: {
		screen: 'IPS LCD, 6.0", Full HD',
		os: 'Android 7.0 (Nougat)',
		primaryCamera: 23,
		secondaryCamera: 16,
		cpu: 'Mediatek Helio P20',
		ram: 4,
		memory: 64,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 2700
	},
    description: 'Sau một thời gian xuất hiện tại Việt Nam và nhận được nhiều sự quan tâm từ người dùng thì mới đây Sony đã tung ra phiên bản màu hồng cho chiếc Sony Xperia XA1 Ultra để phục vụ riêng cho "phái đẹp".',
    producer: 'Sony',
	price: 6990000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '017',
    imagePath: ['/images/sony-xperia-xz2-1.jpg','/images/sony-xperia-xz2-2.jpg','/images/sony-xperia-xz2-3.jpg','/images/sony-xperia-xz2-4.jpg'],
    title: 'Điện thoại Sony Xperia XZ2',
	details: {
		screen: 'IPS HDR LCD, 5.7", Full HD+',
		os: 'Android 8.0 (Oreo)',
		primaryCamera: 19,
		secondaryCamera: 5,
		cpu: 'Snapdragon 845 8 nhân',
		ram: 4,
		memory: 64,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3180
	},
    description: 'Xperia XZ2 là chiếc flagship mới được Sony giới thiệu tại MWC 2018 với sự thay đổi lớn về thiết kế so với những người tiền nhiệm.',
    producer: 'Sony',
	price: 19990000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '018',
    imagePath: ['/images/vivo-v9-1.jpg','/images/vivo-v9-2.jpg','/images/vivo-v9-3.jpg','/images/vivo-v9-4.jpg'],
    title: 'Điện thoại Vivo V9',
	details: {
		screen: 'IPS LCD, 6.3", Full HD+',
		os: 'Android 8.1 (Oreo)',
		primaryCamera: 16,
		secondaryCamera: 24,
		cpu: 'Snapdragon 626 8 nhân 64-bit',
		ram: 6,
		memory: 64,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3260
	},
    description: 'Vivo V9 là chiếc smartphone tầm trung cận cao cấp với điểm nhấn là máy có camera kép phía sau và camera selfie độ phân giải cao 24 MP.',
    producer: 'Sony',
	price: 7990000,
	views: 0,
	comments:[]
  }),
  new Product({
	_id: '019',
    imagePath: ['/images/bkav-bphone-2-1.jpg','/images/bkav-bphone-2-2.jpg','/images/bkav-bphone-2-3.jpg','/images/bkav-bphone-2-4.jpg','/images/bkav-bphone-2-5.jpg','/images/bkav-bphone-2-6.jpg'],
    title: 'Điện thoại Bphone 2017',
	details: {
		screen: 'IPS LCD, 5.5", Full HD',
		os: 'BOS (Android 7.1)',
		primaryCamera: 16,
		secondaryCamera: 8,
		cpu: 'Snapdragon 625 8 nhân 64-bit',
		ram: 3,
		memory: 32,
		sim: '2 Nano SIM, Hỗ trợ 4G',
		battery: 3200
	},
    description: 'Bphone 2017 là chiếc smartphone thế hệ thứ 2 được nhà sản xuất Việt Nam Bkav trình làng với hàng loạt cải tiến vượt trội, tối ưu tốt nhất cho người Việt và giá bán rất tốt.',
    producer: 'Bkav',
	price: 9790000,
	views: 0,
	comments:[]
  })
];
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connected!');

  for (var i = 0; i < products.length; i++) {
	products[i].save(function (err) {
		if (err) 
			console.log(err);
		else
			console.log('saved!');

		if (i === products.length)
			mongoose.disconnect();
	});
  } 
});