var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {	
	Product.find(function(err,results){
		if (err) 
			console.log(err);
		else{
			var arrayResult = [];
			var threeItem = [];
			var count = 0;
			for (var i in results){
				threeItem.push(results[i]);
				count++;
				if (count === 3){
					arrayResult.push(threeItem);					
					count = 0;
					threeItem = [];
				}
			}
			res.render('index', { 
				session: req.session,
				results: arrayResult,
				helpers: req.handlebars.helpers
			});
		}
	});
});
 
router.get('/product/:id', (req, res) => {
	var productId = req.params.id;
	Product.findById(productId, function(err, product) {
		if (err) {
			return res.redirect('/');
		}
		else{
			console.log(product.details);
			res.render('product', { 
				session: req.session,
				result: product,
				helpers: req.handlebars.helpers
			});
		}
  });
});

module.exports = router;
