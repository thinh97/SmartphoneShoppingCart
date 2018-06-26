var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/ProductController');
var brand_controller = require('../controllers/BrandController');

router.get('/', product_controller.index);

router.get('/search', product_controller.search_get);

router.post('/search-advance', product_controller.search_advance_get);

router.get('/filter/brand/:id', brand_controller.list_brand);

router.get('/filter/price/:start/:end',product_controller.list_price);	

router.get('/product/:id', product_controller.product_detail);

router.post('/product/add-comment', product_controller.comment_post);

router.get('/product/:productId/:page', product_controller.comments_get);

module.exports = router;
