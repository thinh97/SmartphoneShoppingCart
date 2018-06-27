var Brand = require('../models/brand');
exports.list_brand = function(req, res, next) {	
	var brandId = req.params.id;
    var perPage = 9;
    var page = req.query.p || 1;
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
			if (threeItem.length > 0)
				arrayResult.push(threeItem);
            Brand.count({_id: brandId}).exec(function (err, count) {
				if (err)
					console.log(err);
				else{
                    var pagination = {
                        page: page,
                        pageCount: Math.ceil(count / perPage)
                    };
                    res.render('index', {
                        pagination: pagination,
                        user: req.user,
                        cart: req.cart,
                        results: arrayResult,
                        menuBrand: req.menuBrand,
                        priceRange: req.priceRange,
                        helpers: req.handlebars.helpers
                    });
				}
            });
		}
	});
};