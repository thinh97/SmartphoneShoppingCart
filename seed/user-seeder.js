var User = require('../models/User');

var mongoose = require('mongoose');

mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;
var Users = [
  new User({
    Name: 'Nguyễn Minh Thịnh',
	UserName: 'thinh97',
	Email: 'nguyenminhthinh97@gmail.com',
	Gender: 'Male',
	Birthday: '1997/02/16',
	Address: 'Hồ Chí Minh',
	Password: '123456',
	Role: 'admin',
	Cart: null
  }),
  new User({
    Name: 'Charles M. Johnson',
	UserName: 'Haless',
	Email: 'CharlesMJohnson@dayrep.com',
	Gender: 'Male',
	Birthday: '1949/08/27',
	Address: '3726 Fire Access Road West Jefferson, NC 28694',
	Password: 'Aej5eephah',
	Role: 'user',
	Cart: null
  }),
  new User({
    Name: 'Edward L. Williams',
	UserName: 'Thromervair',
	Email: 'EdwardLWilliams@jourrapide.com',
	Gender: 'Male',
	Birthday: '195011/11',
	Address: '3692 Colonial Drive Houston, TX 77036',
	Password: 'Ri6eeleeNae',
	Role: 'user',
	Cart: null
  }),
  new User({
    Name: 'Alan M. Molino',
	UserName: 'Afty1950',
	Email: 'AlanMMolino@dayrep.com',
	Gender: 'Male',
	Birthday: '1950/08/27',
	Address: '3035 Buffalo Creek Road Nashville, TN 37209',
	Password: 'ohm1Iewah',
	Role: 'user',
	Cart: null
  }),
  new User({
    Name: 'Jane K. Rutland',
	UserName: 'Eparequir',
	Email: 'JaneKRutland@rhyta.com',
	Gender: 'Male',
	Birthday: '1965/04/25',
	Address: '1473 Abia Martin Drive Farmingdale, NY 11735',
	Password: 'mee7iiShe0ai',
	Role: 'user',
	Cart: null
  }),
  new User({
    Name: 'Brian D. Marcus',
	UserName: 'Wasm1941',
	Email: 'BrianDMarcus@dayrep.com',
	Gender: 'Male',
	Birthday: '1941/05/14',
	Address: '3780 Kyle Street Wallace, NE 69169',
	Password: 'Phiu8eepaix',
	Role: 'user',
	Cart: null
  }),
  new User({
    Name: 'Frank C. Vaccaro',
	UserName: 'Frochat',
	Email: 'FrankCVaccaro@armyspy.com',
	Gender: 'Male',
	Birthday: '1986/03/13',
	Address: '3486 Duck Creek Road Redwood City, CA 94063',
	Password: 'feevae5Ah',
	Role: 'user',
	Cart: null
  }),
  new User({
    Name: 'Melany D. Lopez',
	UserName: 'Didliverse',
	Email: 'MelanyDLopez@armyspy.com',
	Gender: 'Female',
	Birthday: '1934/10/07',
	Address: '1954 Oliver Street Fort Worth, TX 76102',
	Password: 'reing1thoSh',
	Role: 'user',
	Cart: null
  }),
  new User({
    Name: 'Fred C. Maag',
	UserName: 'Hatich',
	Email: 'FredCMaag@jourrapide.com',
	Gender: 'Male',
	Birthday: '1984/10/05',
	Address: '2905 East Avenue Phoenix, AZ 85003',
	Password: 'chaeK4LieJie',
	Role: 'user',
	Cart: null
  }),
  new User({
    Name: 'Vivian G. Clark',
	UserName: 'Comboden1953',
	Email: 'VivianGClark@rhyta.com',
	Gender: 'Female',
	Birthday: '1953/08/27',
	Address: '3702 Rosebud Avenue Marshall, AR 72650',
	Password: 'thuChoov5',
	Role: 'user',
	Cart: null
  })
];
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connected!');
  var count = 0;
  for (var i = 0; i < Users.length; i++) {
	Users[i].save(function (err) {
		if (err) 
			console.log(err);
		else
			console.log('saved!');
		count += 1;
		if (count === Users.length)
			mongoose.disconnect();
	});
  } 
  
});