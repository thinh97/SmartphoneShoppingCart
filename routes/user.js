var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');

router.get('/user', user_controller.index);

router.get('/user/signin', user_controller.signin_get);

router.post('/user/signin', user_controller.signin_post);

router.get('/user/signup', user_controller.signup_get);

router.post('/user/signup', user_controller.signup_post);

router.get('/user/signout', user_controller.signout_get);

router.get('/user/profile', user_controller.profile_get);

router.post('/user/profile', user_controller.profile_changeinfo_post);

router.post('/user/profile/change-password', user_controller.profile_change_password_post);

router.get('/user/forgot-password', user_controller.forgot_password_get);

router.post('/user/forgot-password', user_controller.forgot_password_post);

router.get('/user/reset-password/:token', user_controller.reset_password_get);

router.post('/user/reset-password/:token', user_controller.reset_password_post);

router.get('/user/active', user_controller.active_get);

router.post('/user/active', user_controller.active_post);

router.get('/user/active/:token', user_controller.active_account_get);

router.get('/user/add-to-cart/:id',user_controller.add_to_cart);

router.get('/user/shopping-cart/',user_controller.get_shopping_cart);

router.get('/user/checkout',user_controller.get_check_out);

router.post('/user/checkout', user_controller.post_check_out);

router.get('/user/history', user_controller.order_history_get);

module.exports = router;