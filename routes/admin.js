var express = require('express');
var router = express.Router();
var admin_controller = require('../controllers/AdminController');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(/ /g, '-'));
    }
})

var upload = multer({ storage: storage })

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

router.post('/admin/file/upload', upload.array('imagesUpload'), admin_controller.file_upload_post);

router.get('/admin/statistics', admin_controller.statistics_get);

router.post('/admin/statistics', admin_controller.statistics_post);

router.get('/admin/top', admin_controller.top_get);

router.post('/admin/top', admin_controller.top_post);

module.exports = router;