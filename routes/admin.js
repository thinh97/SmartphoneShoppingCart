var express = require('express');
var router = express.Router();
var admin_controller = require('../controllers/AdminController');

router.get('/admin', admin_controller.index);

router.get('/admin/brand/new', admin_controller.new_brand);

router.get('/admin/brands', admin_controller.get_brand);

router.get('/admin/brand/edit/:id', admin_controller.edit_brand);

router.get('/admin/product/new', admin_controller.new_product);

router.get('/admin/products', admin_controller.get_products);

router.get('/admin/product/edit/:id', admin_controller.edit_product);

router.get('/admin/orders', admin_controller.get_orders);

router.get('/admin/order/edit/:id', admin_controller.edit_order);

router.get('/admin/user/new', admin_controller.new_user);

router.get('/admin/users', admin_controller.get_users);

router.get('/admin/user/edit/:id', admin_controller.edit_user);

module.exports = router;