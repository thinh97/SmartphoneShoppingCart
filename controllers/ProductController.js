var Product = require('../models/product');
var Comment = require('../models/comment');

exports.index = function(req, res, next) {	
	Product.find(function(err,results){
		if (err) 
			console.log(err);
		else{
            var arrayResult = [];
			var threeItem = [];
			var count = 0;
			results.forEach(function (item) {
                threeItem.push(item);
                count++;
                if (count === 3){
                    arrayResult.push(threeItem);
                    count = 0;
                    threeItem = [];
                }
            });
            arrayResult.push(threeItem);
			var user = null;
            var cart = null;
            if (req.session.cart)
                cart= req.session.cart;
			if (req.session.passport)
				user = req.session.passport.user;
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
            var user = null;
            if (req.session.passport)
                user = req.session.passport.user;
            var cart = null;
            if (req.session.cart)
                cart= req.session.cart;
			res.render('index', {
                user: user,
                cart: cart,
				results: arrayResult,
                menuBrand: req.menuBrand,
                priceRange: req.priceRange,
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
            var user = null;
            if (req.session.passport)
                user = req.session.passport.user;
            var cart = null;
            if (req.session.cart)
                cart= req.session.cart;
        	Product.update({ _id: productId }, { Views: product.Views + 1 }, function (err) {
				if (err)
					console.log(err);
            });
			res.render('product', {
                user: user,
                cart: cart,
				result: product,
                menuBrand: req.menuBrand,
                priceRange: req.priceRange,
				helpers: req.handlebars.helpers
			});
		}
    });
};

exports.search_get = function(req, res, next) {
    var query = {};
    if (req.query.productName)
        query['Title'] = {$regex: req.query.productName, $options: 'ig'};
    if (req.query.brandName)
        query['Brand'] = {$regex: req.query.brandName, $options: 'ig'};
    if (req.query.priceStart){
        if (query['Price'] === undefined)
            query['Price'] = {};
        query['Price']['$gte'] = req.query.priceStart;
    }
    if (req.query.priceEnd){
        if (query['Price'] === undefined)
            query['Price'] = {};
        query['Price']['$lte'] = req.query.priceEnd;
    }
    if (req.query.detailRamStart){
        if (query['Details.RAM'] === undefined)
            query['Details.RAM'] = {};
        query['Details.RAM']['$gte'] = req.query.detailRamStart;
    }
    if (req.query.detailRamEnd){
        if (query['Details.RAM'] === undefined)
            query['Details.RAM'] = {};
        query['Details.RAM']['$lte'] = req.query.detailRamEnd;
    }
    if (req.query.detailMemoryStart){
        if (query['Details.Memory'] === undefined)
            query['Details.Memory'] = {};
        query['Details.Memory']['$gte'] = req.query.detailMemoryStart;
    }
    if (req.query.detailMemoryEnd){
        if (query['Details.Memory'] === undefined)
            query['Details.Memory'] = {};
        query['Details.Memory']['$lte'] = req.query.detailMemoryEnd;
    }
    Product.find(query, function(err, results){
        if (err)
            console.log(err);
        else{
            var arrayResult = [];
            var threeItem = [];
            var count = 0;
            results.forEach(function (item) {
                threeItem.push(item);
                count++;
                if (count === 3){
                    arrayResult.push(threeItem);
                    count = 0;
                    threeItem = [];
                }
            });
            if (threeItem.length > 0)
                arrayResult.push(threeItem);
            var user = null;
            if (req.session.passport)
                user = req.session.passport.user;
            console.log(req.query.productName || '');
            console.log(req.query.brandName || '');
            res.render('search_advance', {
                productName: req.query.productName || '',
                brandName: req.query.brandName || '',
                priceStart: req.query.priceStart || 1000000,
                priceEnd: req.query.priceEnd || 50000000,
                detailRamStart: req.query.detailRamStart || 1,
                detailRamEnd: req.query.detailRamEnd || 16,
                detailMemoryStart: req.query.detailMemoryStart || 1,
                detailMemoryEnd: req.query.detailMemoryEnd || 256,
                user: user,
                results: arrayResult,
                menuBrand: req.menuBrand,
                priceRange: req.priceRange,
                helpers: req.handlebars.helpers
            });
        }
    });
};

exports.search_advance_get = function(req, res, next) {
    var regex = req.query.searchKey;
    Product.find({Title: {$regex: regex, $options: 'ig'}}, function(err, results){
        if (err)
            console.log(err);
        else{
            var arrayResult = [];
            var threeItem = [];
            var count = 0;
            results.forEach(function (item) {
                threeItem.push(item);
                count++;
                if (count === 3){
                    arrayResult.push(threeItem);
                    count = 0;
                    threeItem = [];
                }
            });
            arrayResult.push(threeItem);
            var user = null;
            if (req.session.passport)
                user = req.session.passport.user;
            res.render('search_advance', {
                user: user,
                results: arrayResult,
                menuBrand: req.menuBrand,
                priceRange: req.priceRange,
                helpers: req.handlebars.helpers
            });
        }
    });
};

exports.comment_post = function(req, res, next) {
    Product.findById(req.body.productId, function(err, result){
        if (err) {
            console.log(err);
            res.status(404).send('Không tìm thấy sản phẩm');
        }
        else{
            if (result != null){
                var comment = new Comment({
                    Name: req.body.name,
                    Comment: req.body.comment,
                    Product: result._id,
                    CreateOn: new Date()
                });
                comment.save(function (err) {
                    if (err)
                        console.log(err);
                });
                result.Comments.push(comment);
                Product.findByIdAndUpdate(result._id, {Comments: result.Comments}, {}, function (err) {
                    if (err){
                        console.log(err);
                        res.status(500).send('Không cập nhật được comment');
                    }
                    else
                        res.status(200).send('Thành công');
                });
            }
            else
                res.status(404).send('Không tìm thấy sản phẩm');
        }
    });
};

exports.comments_get = function(req, res, next) {
    var perPage = 10;
    var page = req.params.page || 1;
    Comment.find({Product: req.params.productId}).
    sort({CreateOn: -1}).
    skip((perPage * page) - perPage).
    limit(perPage).
    exec(function(err, comments) {
        Comment.count().exec(function(err, count) {
            if (err) {
                console.log(err);
                res.status(500).send('Không lấy được comment');
            }
            else{
                var pagination = {
                    page: page,
                    pageCount: Math.ceil(count / perPage)
                };
                res.render('partials/comments', {
                    comments : comments,
                    pagination: pagination,
                    layout: '',
                    helpers: req.handlebars.helpers
                });
            }
        });
    });
};