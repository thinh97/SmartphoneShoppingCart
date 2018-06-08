var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');

router.get('/users', user_controller.index);

router.get('/users/signin', user_controller.signin_get);

router.post('/users/signin', user_controller.signin_post);

router.get('/users/signup', user_controller.signup_get);

router.post('/users/signup', user_controller.signup_post);

router.get('/users/signout', user_controller.signout_get);

router.get('/users/profile', user_controller.profile_get);

router.post('/users/profile', user_controller.profile_changeinfo_post);

router.post('/users/profile/changepassword', user_controller.profile_changepassword_post);

module.exports = router;