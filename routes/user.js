var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');

router.get('/users/signin', user_controller.signin_get);

router.post('/users/signin', user_controller.signin_post);

router.get('/users/signup', user_controller.signup);

router.get('/users/signout', user_controller.signout);

module.exports = router;