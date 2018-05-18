var Product = require('../models/product');

exports.index = function(req, res, next) {	
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
};

exports.list_price = function(req, res, next) {	
	var start = req.params.start;
	var end = req.params.end;
	var query = {};
	if (end != 0)
		query = { $gt: start, $lt: end };
	else
		query = { $gt: start };
	Product.find({Price: query},function (err, results){
		if (err) 
			res.redirect('/');
		else{
			var arrayResult = [];
			var threeItem = [];
			var count = 0;
			for (var i=0;i<results.length;i++){
				threeItem.push(results[i]);
				count++;
				if (count === 3){
					arrayResult.push(threeItem);					
					count = 0;					
					threeItem = [];
				}
			}
			arrayResult.push(threeItem);
			res.render('index', { 
				session: req.session,
				results: arrayResult,
				helpers: req.handlebars.helpers
			});
		}
	}).sort({Price: 1});
};
 
exports.product_detail = function(req, res) {
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
};