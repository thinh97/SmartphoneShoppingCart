var Product = require('../models/product');
var Comment = require('../models/comment');

exports.index = function(req, res, next) {
    var perPage = 9;
    var page = req.query.p || 1;
	Product.find({}).
    skip((perPage * page) - perPage).
    limit(perPage).
    exec(function(err,results){
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
            Product.count().exec(function (err, count) {
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

exports.list_price = function(req, res, next) {	
	var start = req.params.start;
	var end = req.params.end;
	var query = {};
	if (end !== 0)
		query = { $gt: start, $lt: end };
	else
		query = { $gt: start };
    var perPage = 9;
    var page = req.query.p || 1;
	Product.find({Price: query}).
    skip((perPage * page) - perPage).
    limit(perPage).
    exec(function (err, results){
		if (err) 
			res.redirect('/');
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
            Product.count({Price: query}).exec(function (err, count) {
                if (err)
                    console.log(err);
                else {
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
 
exports.product_detail = function(req, res) {
	var productId = req.params.id;
	Product.findById(productId, function(err, product) {
		if (err) {
			return res.redirect('/');
		}
		else{
        	Product.update({ _id: productId }, { Views: product.Views + 1 }, function (err) {
				if (err)
					console.log(err);
            });
			res.render('product', {
                user: req.user,
                cart: req.cart,
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
    var perPage = 9;
    var page = req.query.p || 1;
    Product.find(query).
    skip((perPage * page) - perPage).
    limit(perPage).
    exec(function(err, results){
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
            Product.count(query).exec(function (err, count) {
                if (err)
                    console.log(err);
                else{
                    var pagination = {
                        page: page,
                        pageCount: Math.ceil(count / perPage)
                    };
                    res.render('search_advance', {
                        pagination: pagination,
                        productName: req.query.productName || '',
                        brandName: req.query.brandName || '',
                        priceStart: req.query.priceStart || 1000000,
                        priceEnd: req.query.priceEnd || 50000000,
                        detailRamStart: req.query.detailRamStart || 1,
                        detailRamEnd: req.query.detailRamEnd || 16,
                        detailMemoryStart: req.query.detailMemoryStart || 1,
                        detailMemoryEnd: req.query.detailMemoryEnd || 256,
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
        if (err)
            console.log(err);
        else{
            Comment.count({Product: req.params.productId}).exec(function (err, count) {
                if (err)
                    console.log(err);
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
        }
    });
};