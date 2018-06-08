var express = require('express');
var router = express.Router();
var admin_controller = require('../controllers/AdminController');

router.get('/admin', admin_controller.index);

router.get('/admin/brand/new', admin_controller.create_brand_get);

router.post('/admin/brand/new', admin_controller.create_brand_post);

router.get('/admin/brands', admin_controller.list_brands_get);

router.get('/admin/brand/edit/:id', admin_controller.edit_brand_get);

router.post('/admin/brand/edit/:id', admin_controller.edit_brand_post);

router.get('/admin/brand/delete/:id', admin_controller.delete_brand_get);

router.get('/admin/product/new', admin_controller.create_new_product_get);

router.post('/admin/product/new', admin_controller.create_new_product_post);

router.get('/admin/products', admin_controller.list_products_get);

router.get('/admin/product/edit/:id', admin_controller.edit_product_get);

router.post('/admin/product/edit/:id', admin_controller.edit_product_post);

router.get('/admin/product/delete/:id', admin_controller.delete_product_get);

router.get('/admin/orders', admin_controller.list_orders_get);

router.get('/admin/order/edit/:id', admin_controller.edit_order_get);

router.post('/admin/order/edit/:id', admin_controller.edit_order_post);

router.get('/admin/order/delete/:id', admin_controller.delete_order_get);

router.get('/admin/users', admin_controller.list_users_get);

router.get('/admin/user/edit/:id', admin_controller.edit_user_get);

router.post('/admin/user/edit/:id', admin_controller.edit_user_post);

router.get('/admin/user/delete/:id', admin_controller.delete_user_get);

module.exports = router;