var Brand = require('../models/brand');
exports.list_brand = function(req, res, next) {	
	var brandId = req.params.id;
	Brand.findOne({_id: brandId}).populate('Products').exec(function (err, result){
		if (err) 
			res.redirect('/');
		else{
			var arrayResult = [];
			var threeItem = [];
			var count = 0;
			for (var i=0;i<result.Products.length;i++){
				threeItem.push(result.Products[i]);
				count++;
				if (count === 3){
					arrayResult.push(threeItem);					
					count = 0;					
					threeItem = [];
				}
			}
			arrayResult.push(threeItem);
            var user = null;
            if (req.session.passport)
                user = req.session.passport.user;
            var cart = null;
            if (req.session.cart)
                cart = req.session.cart;
			res.render('index', {
				user: user,
				cart: cart,
				results: arrayResult,
				menuBrand: req.menuBrand,
				priceRange: req.priceRange,
				helpers: req.handlebars.helpers
			});
		}
	});
};