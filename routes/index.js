var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/ProductController');
var brand_controller = require('../controllers/BrandController');

/* GET home page. */
router.get('/', product_controller.index);

router.post('/search', product_controller.search_post);

router.get('/filter/brand/:id', brand_controller.list_brand);

router.get('/filter/price/:start/:end',product_controller.list_price);	

router.get('/product/:id', product_controller.product_detail);

module.exports = router;
