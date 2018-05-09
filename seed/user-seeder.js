var User = require('../models/user');

var mongoose = require('mongoose');

mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;
var users = [
  new User({
    name: 'Nguyễn Minh Thịnh',
	username: 'thinh97',
	email: 'nguyenminhthinh97@gmail.com',
	gender: 'Male',
	birthday: '02/19/1997',
	address: 'Hồ Chí Minh',
	password: '123456',
	role: 'admin'
  }),
  new User({
    name: 'Charles M. Johnson',
	username: 'Haless',
	email: 'CharlesMJohnson@dayrep.com',
	gender: 'Male',
	birthday: '08/27/1949',
	address: '3726 Fire Access Road West Jefferson, NC 28694',
	password: 'Aej5eephah',
	role: 'user'
  }),
  new User({
    name: 'Edward L. Williams',
	username: 'Thromervair',
	email: 'EdwardLWilliams@jourrapide.com',
	gender: 'Male',
	birthday: '11/11/1950',
	address: '3692 Colonial Drive Houston, TX 77036',
	password: 'Ri6eeleeNae',
	role: 'user'
  }),
  new User({
    name: 'Alan M. Molino',
	username: 'Afty1950',
	email: 'AlanMMolino@dayrep.com',
	gender: 'Male',
	birthday: '08/27/1950',
	address: '3035 Buffalo Creek Road Nashville, TN 37209',
	password: 'ohm1Iewah',
	role: 'user'
  }),
  new User({
    name: 'Jane K. Rutland',
	username: 'Eparequir',
	email: 'JaneKRutland@rhyta.com',
	gender: 'Male',
	birthday: '04/25/1965',
	address: '1473 Abia Martin Drive Farmingdale, NY 11735',
	password: 'mee7iiShe0ai',
	role: 'user'
  }),
  new User({
    name: 'Brian D. Marcus',
	username: 'Wasm1941',
	email: 'BrianDMarcus@dayrep.com',
	gender: 'Male',
	birthday: '05/14/1941',
	address: '3780 Kyle Street Wallace, NE 69169',
	password: 'Phiu8eepaix',
	role: 'user'
  }),
  new User({
    name: 'Frank C. Vaccaro',
	username: 'Frochat',
	email: 'FrankCVaccaro@armyspy.com',
	gender: 'Male',
	birthday: '03/13/1986',
	address: '3486 Duck Creek Road Redwood City, CA 94063',
	password: 'feevae5Ah',
	role: 'user'
  }),
  new User({
    name: 'Melany D. Lopez',
	username: 'Didliverse',
	email: 'MelanyDLopez@armyspy.com',
	gender: 'Female',
	birthday: '10/07/1934',
	address: '1954 Oliver Street Fort Worth, TX 76102',
	password: 'reing1thoSh',
	role: 'user'
  }),
  new User({
    name: 'Fred C. Maag',
	username: 'Hatich',
	email: 'FredCMaag@jourrapide.com',
	gender: 'Male',
	birthday: '10/05/1984',
	address: '2905 East Avenue Phoenix, AZ 85003',
	password: 'chaeK4LieJie',
	role: 'user'
  }),
  new User({
    name: 'Vivian G. Clark',
	username: 'Comboden1953',
	email: 'VivianGClark@rhyta.com',
	gender: 'Female',
	birthday: '08/27/1953',
	address: '3702 Rosebud Avenue Marshall, AR 72650',
	password: 'thuChoov5',
	role: 'user'
  })
];
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connected!');

  for (var i = 0; i < users.length; i++) {
	users[i].save(function (err) {
		if (err) 
			console.log(err);
		else
			console.log('saved!');
		console.log(i);
		if (i === users.length)
			mongoose.disconnect();
	});
  } 
  
});