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

router.post('/users/profile/changepassword', user_controller.profile_change_password_post);

router.get('/users/forgotpassword', user_controller.forgot_password_get);

router.post('/users/forgotpassword', user_controller.forgot_password_post);

router.get('/users/resetpassword/:token', user_controller.reset_password_get);

router.post('/users/resetpassword/:token', user_controller.reset_password_post);

router.get('/users/active', user_controller.active_get);

router.post('/users/active', user_controller.active_post);

router.get('/users/active/:token', user_controller.active_account_get);

router.get('/user/add-to-cart/:id',user_controller.add_to_cart);

router.get('/user/shopping-cart/',user_controller.get_shopping_cart);

router.get('/user/checkout',user_controller.get_check_out);

router.post('/user/checkout', user_controller.post_check_out);

module.exports = router;