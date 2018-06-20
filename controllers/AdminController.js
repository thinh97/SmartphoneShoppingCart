var Product = require('../models/product');
var User = require('../models/user');
var Order = require('../models/order');
var Brand = require('../models/brand');

exports.index = function(req, res, next) {
    if (req.isAuthenticated()){
        if (req.session.passport.user.Role === 'admin'){
            res.render('admin/admin', {
                layout: 'layout_admin.hbs',
                user: req.session.passport.user,
                helpers: req.handlebars.helpers
            });
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.create_brand_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            res.render('admin/brand_new', {
                layout: 'layout_admin.hbs',
                user: req.session.passport.user,
                helpers: req.handlebars.helpers
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.create_brand_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            var brand= new Brand({
                Name: req.body.nameBr ,
                _id: req.body.nameBr.toLowerCase()
            });
            brand.save(function (err, createBrand) {
                if (err){
                    console.log(err);
                    res.render('admin/brand_new', {
                        errormessage: 'Lỗi khi tạo nhãn hiệu. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else{
                    res.render('admin/brand_new', {
                        message: 'Đã lưu',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.list_brands_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Brand.find(function (err, brands) {
                if (err) {
                    res.render('admin/brands', {
                        errormessage: 'Lỗi khi lấy danh sách nhãn hiệu. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/brands', {
                        brands: brands,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.edit_brand_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Brand.findOne({_id: req.params.id},function (err, brand) {
                if (err) {
                    res.render('admin/brand_edit', {
                        errormessage: 'Đã xảy ra lỗi khi tìm nhãn hiệu. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/brand_edit', {
                        brand: brand,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.edit_brand_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            var updateBrand = {
                Name: req.body.nameBr
            };
            Brand.find({Name: { $regex : new RegExp(updateBrand.Name, "i") }, _id: { $not: { $eq: req.body.id }}}, function (err, result) {
                if (err){
                    console.log(err);
                    res.render('admin/brand_edit', {
                        errormessage: 'Lỗi khi tìm nhãn hiệu. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else{
                    if (result.length === 0){
                        Brand.findByIdAndUpdate(req.body.id, updateBrand, {new: true, runValidators: true}, function (err,updatedBrand) {
                            if (err) {
                                console.log(err);
                                res.render('admin/brand_edit', {
                                    errormessage: 'Lỗi khi cập nhật nhãn hiệu. Vui lòng thử lại sau',
                                    layout: 'layout_admin.hbs',
                                    user: req.session.passport.user,
                                    helpers: req.handlebars.helpers
                                });
                            }
                            else {
                                res.render('admin/brand_edit', {
                                    brand: updatedBrand,
                                    message: 'Đã lưu',
                                    layout: 'layout_admin.hbs',
                                    user: req.session.passport.user,
                                    helpers: req.handlebars.helpers
                                });
                            }
                        });
                    }
                    else{
                        Brand.findOne({_id: req.params.id},function (err, brand) {
                            if (err) {
                                res.render('admin/brand_edit', {
                                    errormessage: 'Lỗi khi tìm nhãn hiệu. Vui lòng thử lại sau',
                                    layout: 'layout_admin.hbs',
                                    user: req.session.passport.user,
                                    helpers: req.handlebars.helpers
                                });
                            }
                            else {
                                res.render('admin/brand_edit', {
                                    brand: brand,
                                    errormessage: 'Tên nhãn hiệu đã được sử dụng',
                                    layout: 'layout_admin.hbs',
                                    user: req.session.passport.user,
                                    helpers: req.handlebars.helpers
                                });
                            }
                        });
                    }
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.delete_brand_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Brand.deleteOne({_id: req.params.id}, function (err) {
                if (err){
                    console.log(err);
                    res.redirect('/admin/brands/?error=Đã có lỗi xảy ra. Vui lòng thử lại');
                }
                else{
                    res.redirect('/admin/brands');
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.create_new_product_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            res.render('admin/product_new', {
                brands: req.menuBrand,
                layout: 'layout_admin.hbs',
                user: req.session.passport.user,
                helpers: req.handlebars.helpers
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.create_new_product_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            var product = new Product({
                Title: req.body.title,
                ImagePath: req.body.imagePath.split(','),
                Price: req.body.price,
                Description: req.body.description,
                Brand: req.body.brand,
                Details: []
            });
            product.Details.Screen = req.body.detailScreen;
            product.Details.OS = req.body.detailOS;
            product.Details.PrimaryCamera = req.body.detailPrimaryCamera;
            product.Details.SecondaryCamera = req.body.detailSecondaryCamera;
            product.Details.CPU = req.body.detailCPU;
            product.Details.RAM = req.body.detailRAM;
            product.Details.Memory = req.body.detailMemory;
            product.Details.Sim = req.body.detailSim;
            product.Details.Battery = req.body.detailBattery;
            product.save(function (err, newProduct) {
                if (err){
                    console.log(err);
                    res.render('admin/product_new', {
                        errormessage: 'Lỗi khi tạo sản phẩm. Vui lòng thử lại sau',
                        brands: req.menuBrand,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else{
                    res.render('admin/product_new', {
                        brands: req.menuBrand,
                        message: 'Đã lưu sản phẩm',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.list_products_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Product.find(function (err, results) {
                if (err) {
                    res.render('admin/products', {
                        errormessage: 'Lỗi khi lấy danh sách sản phẩm. Vui lòng thử lại sau\'',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/products', {
                        results: results,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.edit_product_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Product.findOne({_id: req.params.id},function (err, product) {
                if (err) {
                    res.render('admin/product_edit', {
                        errormessage: 'Lỗi khi tìm sản phẩm. Vui lòng thử lại sau\'',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/product_edit', {
                        product: product,
                        imagePath: product.ImagePath,
                        brands: req.menuBrand,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.edit_product_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            var updateProduct = {
                Title: req.body.title,
                ImagePath: req.body.imagePath.split(','),
                Price: req.body.price,
                Description: req.body.description,
                Brand: req.body.brand,
                Details: {}
            };
            updateProduct.Details.Screen = req.body.detailScreen;
            updateProduct.Details.OS = req.body.detailOS;
            updateProduct.Details.PrimaryCamera = req.body.detailPrimaryCamera;
            updateProduct.Details.SecondaryCamera = req.body.detailSecondaryCamera;
            updateProduct.Details.CPU = req.body.detailCPU;
            updateProduct.Details.RAM = req.body.detailRAM;
            updateProduct.Details.Memory = req.body.detailMemory;
            updateProduct.Details.Sim = req.body.detailSim;
            updateProduct.Details.Battery = req.body.detailBattery;

            Product.findByIdAndUpdate(req.body.id, updateProduct, {new: true, runValidators: true}, function (err,updatedProduct) {
                if (err) {
                    console.log(err);
                    res.render('admin/product_edit', {
                        errormessage: 'Lỗi khi cập nhật sản phẩm. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    if (req.body.oldBrand !== req.body.brand){
                        Brand.findOne({_id: req.body.oldBrand}, function (error, brand) {
                            if (error){
                                console.log(error);
                            }
                            else{
                                brand.Products.remove(updatedProduct._id);
                                Brand.findByIdAndUpdate(brand._id, brand, {}, function (err){
                                    if (err)
                                        console.log(err);
                                });
                            }
                        });
                        Brand.findOne({_id: req.body.brand}, function (error, brand) {
                            if (error){
                                console.log(error);
                            }
                            else{
                                brand.Products.push(updatedProduct._id);
                                Brand.findByIdAndUpdate(brand._id, brand, {}, function (err){
                                    if (err)
                                        console.log(err);
                                });
                            }
                        });
                    }
                    res.render('admin/product_edit', {
                        product: updatedProduct,
                        imagePath: updatedProduct.ImagePath,
                        brands: req.menuBrand,
                        message: 'Đã lưu',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.delete_product_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Product.deleteOne({_id: req.params.id}, function (err) {
                if (err){
                    console.log(err);
                    res.redirect('/admin/products/?error=Đã có lỗi xảy ra. Vui lòng thử lại');
                }
                else{
                    res.redirect('/admin/products');
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.list_orders_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Order.find(function (err, orders) {
                if (err) {
                    res.render('admin/orders', {
                        errormessage: 'Lỗi khi lấy danh sách đơn hàng. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/orders', {
                        orders: orders,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.edit_order_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Order.findById({_id: req.params.id}).
            populate('ProductId','Title Price _id').
            populate('UserId','UserName _id').
            exec(function (err, order) {
                if (err) {
                    res.render('admin/order_edit', {
                        errormessage: 'Lỗi khi tìm đơn hàng. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/order_edit', {
                        order: order,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.edit_order_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            var updateOrder = {
                Name: req.body.billerName,
                Amount: req.body.amount,
                BillAddress: req.body.billAddress,
                MobilePhone: req.body.mobilePhone,
                PaymentMethod: req.body.paymentMethod,
                DeliveryDate: req.body.deliveryDate,
                Status: req.body.status,
            };
            Order.findByIdAndUpdate(req.body.id, updateOrder, {new: true, runValidators: true}, function (err,updatedOrder) {
                if (err) {
                    console.log(err);
                    res.render('admin/order_edit', {
                        errormessage: 'Lỗi khi cập nhật đơn hàng. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    Order.findById({_id: req.body.id}).
                    populate('ProductId','Title Price _id').
                    populate('UserId','UserName _id').
                    exec(function (err, order) {
                        if (err) {
                            res.render('admin/order_edit', {
                                errormessage: 'Lỗi tìm đơn hàng. Vui lòng thử lại sau',
                                layout: 'layout_admin.hbs',
                                user: req.session.passport.user,
                                helpers: req.handlebars.helpers
                            });
                        }
                        else {
                            res.render('admin/order_edit', {
                                order: order,
                                message: 'Đã lưu',
                                layout: 'layout_admin.hbs',
                                user: req.session.passport.user,
                                helpers: req.handlebars.helpers
                            });
                        }
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.delete_order_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Order.deleteOne({_id: req.params.id}, function (err) {
                if (err){
                    console.log(err);
                    res.redirect('/admin/orders/?error=Đã có lỗi xảy ra. Vui lòng thử lại');
                }
                else{
                    res.redirect('/admin/orders');
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.list_users_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            User.find(function (err, users) {
                if (err) {
                    res.render('admin/users', {
                        errormessage: 'Lỗi khi lấy danh sách tài khoản. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/users', {
                        users: users,
                        message: req.query.error,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.edit_user_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            User.findById(req.params.id, function (err, result) {
                if (err) {
                    res.render('admin/user_edit', {
                        errormessage: 'Lỗi khi tìm tài khoản. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    var nowDate = new Date();
                    res.render('admin/user_edit', {
                        result: result,
                        currentDate: (nowDate.getFullYear()-5) + '-' + (pad2(nowDate.getMonth()+1)) + '-' + pad2(nowDate.getDate()),
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.edit_user_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            var newUpdate = {
                Name: req.body.name,
                Email: req.body.email,
                Gender: req.body.gender,
                Birthday: req.body.dob,
                Address: req.body.address,
                Phone: req.body.phone,
                Role: req.body.role
            };

            User.findByIdAndUpdate(req.body.id, newUpdate, {new: true, runValidators: true}, function (err,updatedUser) {
                if (err) {
                    console.log(err);
                    res.render('admin/user_edit', {
                        errormessage: 'Lỗi khi cập nhật tài khoản. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/user_edit', {
                        result: updatedUser,
                        message: 'Đã lưu',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.delete_user_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            User.deleteOne({_id: req.params.id}, function (err) {
                if (err){
                    console.log(err);
                    res.redirect('/admin/users?error=Đã có lỗi xảy ra. Vui lòng thử lại');
                }
                else{
                    res.redirect('/admin/users');
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.file_upload_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            var imagePath = [];
            req.files.forEach(function (file) {
                imagePath.push('/images/' + file.filename);
            });
            res.render('admin/image_list', {
                layout: false,
                imagePath: imagePath,
            });
        }
    }
    else
        res.status(496).send('Bạn không có quyền truy cập');
}

exports.statistics_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Order.findOne({},function (err, result) {
                if (err){
                    console.log(err);
                    res.render('admin/statistics',{
                        errormessage: 'Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else{
                    var minYear;
                    var nowDate = new Date();
                    if (result !== null)
                        minYear = result.CreateDate.getFullYear();
                    else
                        minYear = nowDate.getFullYear();
                    var maxYear = nowDate.getFullYear();
                    var yearArray = [];
                    for (var y=minYear;y<=maxYear;y++)
                        yearArray.push(y);
                    var min = {
                        Date: result.CreateDate.getFullYear() + '-' + (pad2(result.CreateDate.getMonth()+1)) + '-' + pad2(result.CreateDate.getDate()),
                        Week: result.CreateDate.getFullYear() + '-W' + (pad2(result.CreateDate.getWeek())),
                        Month: result.CreateDate.getFullYear() + '-' + (pad2(result.CreateDate.getMonth()+1)),
                        Year: result.CreateDate.getFullYear(),
                    };
                    var max = {
                        Date: nowDate.getFullYear() + '-' + (pad2(nowDate.getMonth()+1)) + '-' + pad2(nowDate.getDate()),
                        Week: nowDate.getFullYear() + '-W' + (pad2(nowDate.getWeek())),
                        Month: nowDate.getFullYear() + '-' + (pad2(nowDate.getMonth()+1)),
                        Year: nowDate.getFullYear(),
                    };
                    res.render('admin/statistics',{
                        year: yearArray,
                        minDate: result.CreateDate,
                        startDate: null,
                        endDate: null,
                        min: min,
                        max: max,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            }).sort({CreateDate: 1});
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.statistics_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            var minDate = new Date(req.body.minDate);
            var minYear = minDate.getFullYear();
            var nowDate = new Date();
            var maxYear = nowDate.getFullYear();
            var yearArray = [];
            for (var y=minYear;y<=maxYear;y++)
                yearArray.push(y);
            var min = {
                Date: minDate.getFullYear() + '-' + (pad2(minDate.getMonth()+1)) + '-' + pad2(minDate.getDate()),
                Week: minDate.getFullYear() + '-W' + (pad2(minDate.getWeek())),
                Month: minDate.getFullYear() + '-' + (pad2(minDate.getMonth()+1)),
                Year: minDate.getFullYear(),
            };
            var max = {
                Date: nowDate.getFullYear() + '-' + (pad2(nowDate.getMonth()+1)) + '-' + pad2(nowDate.getDate()),
                Week: nowDate.getFullYear() + '-W' + (pad2(nowDate.getWeek())),
                Month: nowDate.getFullYear() + '-' + (pad2(nowDate.getMonth()+1)),
                Year: nowDate.getFullYear(),
            };
            var selectStart = {
                Date: req.body.startDate,
                Week: req.body.startWeek,
                Month: req.body.startMonth,
                Year: req.body.startYear,
            };
            var selectEnd = {
                Date: req.body.endDate,
                Week: req.body.endWeek,
                Month: req.body.endMonth,
                Year: req.body.endYear,
            };
            var start, end, startDate, endDate;
            switch (req.body.groupBy){
                case '1':
                    start = new Date(req.body.startDate);
                    startDate = endDate = start;
                    end = new Date(req.body.endDate);
                    break;
                case '7':
                    startDate = start = getDateFromWeek(req.body.startWeek.substring(6, 8), req.body.startWeek.substring(0, 4));
                    console.log(start);
                    endDate = startDate.addDays(6);
                    end = getDateFromWeek(req.body.endWeek.substring(6, 8), req.body.endWeek.substring(0, 4)).addDays(6);
                    break;
                case '30':
                    startDate = start = new Date(req.body.startMonth);
                    endDate = getLastDateOfMonth(startDate.getMonth() + 1, startDate.getFullYear());
                    var tmp = new Date(req.body.endMonth);
                    end = new Date(tmp.getFullYear(), tmp.getMonth() + 1, 0);
                    break;
                case '365':
                    startDate = start = new Date(req.body.startYear);
                    endDate = getLastDateOfMonth(12, startDate.getFullYear());
                    end = new Date(req.body.endYear, 12, 0);
                    break;
                case '90':
                    startDate = start = getFirstDateOfMonth(1, req.body.year);
                    endDate = getLastDateOfMonth(3, req.body.year);
                    end = getLastDateOfMonth(12, req.body.year);
                    break;
            }
            Order.find({CreateDate: { $gte: start, $lte: end }, Status: { $in: ['Hoàn thành','Đang xử lý']}}).
            sort({CreateDate: 1}).
            populate('ProductId','Title Price _id').
            exec(function (err, orders) {
                if (err) {
                    console.log(err);
                    res.render('admin/statistics', {
                        year: yearArray,
                        minDate: minDate,
                        min: min,
                        max: max,
                        errormessage: 'Lỗi khi tìm đơn hàng. Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    if (orders.length === 0){
                        res.render('admin/statistics', {
                            year: yearArray,
                            minDate: minDate,
                            min: min,
                            max: max,
                            start: selectStart,
                            end: selectEnd,
                            groupBy: req.body.groupBy,
                            layout: 'layout_admin.hbs',
                            user: req.session.passport.user,
                            helpers: req.handlebars.helpers
                        });
                    }
                    else{
                        var result = [];
                        var array = [];
                        var totalAmount = 0;
                        var totalPrice = 0;
                        var quarter = 3;
                        var currentDate;
                        var i = 0;
                        var labelCharts = [];
                        var dataCharts = [];
                        var totalPriceInArray = 0;
                        while (i < orders.length) {
                            currentDate = new Date(orders[i].CreateDate.getFullYear() + '-' + (pad2(orders[i].CreateDate.getMonth()+1)) + '-' + pad2(orders[i].CreateDate.getDate()));
                            if (startDate.valueOf() <= currentDate.valueOf() && currentDate.valueOf() <= endDate.valueOf()){
                                var product = {
                                    id: orders[i].ProductId._id,
                                    name: orders[i].ProductId.Title,
                                    price: orders[i].ProductId.Price,
                                };
                                totalAmount += orders[i].Amount;
                                var total = orders[i].Amount * product.price;
                                totalPrice += total;
                                totalPriceInArray += total;
                                var item = {
                                    total: total,
                                    amount: orders[i].Amount,
                                    product: product,
                                };
                                array.push(item);
                                i += 1;
                            }
                            else{
                                var title = '';
                                switch (req.body.groupBy){
                                    case '1':
                                        title = pad2(startDate.getDate()) + '/' + (pad2(startDate.getMonth()+1)) + '/' + startDate.getFullYear();
                                        startDate = endDate = currentDate;
                                        break;
                                    case '7':
                                        title = pad2(startDate.getDate()) + '/' + (pad2(startDate.getMonth()+1)) + '/' + startDate.getFullYear() + ' - ' +
                                            pad2(endDate.getDate()) + '/' + (pad2(endDate.getMonth()+1)) + '/' + endDate.getFullYear();
                                        startDate = currentDate;
                                        endDate = startDate.addDays(6);
                                        break;
                                    case '30':
                                        title = (pad2(startDate.getMonth()+1)) + '/' + startDate.getFullYear();
                                        startDate = currentDate;
                                        endDate = getLastDateOfMonth(startDate.getMonth() + 1, startDate.getFullYear());
                                        break;
                                    case '365':
                                        title = startDate.getFullYear();
                                        startDate = currentDate;
                                        endDate = getLastDateOfMonth(12, startDate.getFullYear());
                                        break;
                                    case '90':
                                        title = 'Quý ' + quarter / 3;
                                        quarter += 3;
                                        startDate = getFirstDateOfMonth(quarter, req.body.year);
                                        endDate = getLastDateOfMonth(quarter + 3, req.body.year);
                                        break;
                                }
                                labelCharts.push(title);
                                dataCharts.push(totalPriceInArray);
                                totalPriceInArray = 0;
                                result.push({
                                    section: array,
                                    title: title,
                                });
                                array = [];
                            }
                        }
                        if (array.length > 0){
                            var title = '';
                            switch (req.body.groupBy){
                                case '1':
                                    title = pad2(startDate.getDate()) + '/' + (pad2(startDate.getMonth()+1)) + '/' + startDate.getFullYear();
                                    break;
                                case '7':
                                    title = pad2(startDate.getDate()) + '/' + (pad2(startDate.getMonth()+1)) + '/' + startDate.getFullYear() + ' - ' +
                                        pad2(endDate.getDate()) + '/' + (pad2(endDate.getMonth()+1)) + '/' + endDate.getFullYear();
                                    break;
                                case '30':
                                    title = (pad2(startDate.getMonth()+1)) + '/' + startDate.getFullYear();
                                    break;
                                case '365':
                                    title = startDate.getFullYear();
                                    break;
                                case '90':
                                    title = 'Quý ' + quarter / 3;
                                    break;
                            }
                            labelCharts.push(title);
                            dataCharts.push(totalPriceInArray);
                            totalPriceInArray = 0;
                            result.push({
                                section: array,
                                title: title,
                            });
                        }
                        res.render('admin/statistics', {
                            labelCharts: labelCharts,
                            dataCharts: dataCharts,
                            result: result,
                            totalAmount: totalAmount,
                            totalPrice: totalPrice,
                            year: yearArray,
                            minDate: minDate,
                            min: min,
                            max: max,
                            start: selectStart,
                            end: selectEnd,
                            groupBy: req.body.groupBy,
                            layout: 'layout_admin.hbs',
                            user: req.session.passport.user,
                            helpers: req.handlebars.helpers
                        });
                    }
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.top_get = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Order.findOne({},function (err, result) {
                if (err){
                    console.log(err);
                    res.render('admin/top',{
                        errormessage: 'Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else{
                    var minYear;
                    var nowDate = new Date();
                    if (result !== null)
                        minYear = result.CreateDate.getFullYear();
                    else
                        minYear = nowDate.getFullYear();
                    var maxYear = nowDate.getFullYear();
                    var yearArray = [];
                    for (var y=minYear;y<=maxYear;y++)
                        yearArray.push(y);
                    var min = {
                        Date: result.CreateDate.getFullYear() + '-' + (pad2(result.CreateDate.getMonth()+1)) + '-' + pad2(result.CreateDate.getDate()),
                        Week: result.CreateDate.getFullYear() + '-W' + (pad2(result.CreateDate.getWeek())),
                        Month: result.CreateDate.getFullYear() + '-' + (pad2(result.CreateDate.getMonth()+1)),
                        Year: result.CreateDate.getFullYear(),
                    };
                    var max = {
                        Date: nowDate.getFullYear() + '-' + (pad2(nowDate.getMonth()+1)) + '-' + pad2(nowDate.getDate()),
                        Week: nowDate.getFullYear() + '-W' + (pad2(nowDate.getWeek())),
                        Month: nowDate.getFullYear() + '-' + (pad2(nowDate.getMonth()+1)),
                        Year: nowDate.getFullYear(),
                    };
                    res.render('admin/top',{
                        year: yearArray,
                        minDate: result.CreateDate,
                        startDate: null,
                        endDate: null,
                        min: min,
                        max: max,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
            }).sort({CreateDate: 1});
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.top_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            var minDate = new Date(req.body.minDate);
            var minYear = minDate.getFullYear();
            var nowDate = new Date();
            var maxYear = nowDate.getFullYear();
            var yearArray = [];
            for (var y=minYear;y<=maxYear;y++)
                yearArray.push(y);
            var min = {
                Date: minDate.getFullYear() + '-' + (pad2(minDate.getMonth()+1)) + '-' + pad2(minDate.getDate()),
                Week: minDate.getFullYear() + '-W' + (pad2(minDate.getWeek())),
                Month: minDate.getFullYear() + '-' + (pad2(minDate.getMonth()+1)),
                Year: minDate.getFullYear(),
            };
            var max = {
                Date: nowDate.getFullYear() + '-' + (pad2(nowDate.getMonth()+1)) + '-' + pad2(nowDate.getDate()),
                Week: nowDate.getFullYear() + '-W' + (pad2(nowDate.getWeek())),
                Month: nowDate.getFullYear() + '-' + (pad2(nowDate.getMonth()+1)),
                Year: nowDate.getFullYear(),
            };
            var selectStart = {
                Date: req.body.startDate,
                Week: req.body.startWeek,
                Month: req.body.startMonth,
                Year: req.body.startYear,
            };
            var selectEnd = {
                Date: req.body.endDate,
                Week: req.body.endWeek,
                Month: req.body.endMonth,
                Year: req.body.endYear,
            };
            var start, end, startDate, endDate;
            switch (req.body.groupBy){
                case '1':
                    start = new Date(req.body.startDate);
                    startDate = endDate = start;
                    end = new Date(req.body.endDate);
                    break;
                case '7':
                    startDate = start = getDateFromWeek(req.body.startWeek.substring(6, 8), req.body.startWeek.substring(0, 4));
                    endDate = startDate.addDays(6);
                    end = getDateFromWeek(req.body.endWeek.substring(6, 8), req.body.endWeek.substring(0, 4)).addDays(6);
                    break;
                case '30':
                    startDate = start = new Date(req.body.startMonth);
                    endDate = getLastDateOfMonth(startDate.getMonth() + 1, startDate.getFullYear());
                    var tmp = new Date(req.body.endMonth);
                    end = new Date(tmp.getFullYear(), tmp.getMonth() + 1, 0);
                    break;
                case '365':
                    startDate = start = new Date(req.body.startYear);
                    endDate = getLastDateOfMonth(12, startDate.getFullYear());
                    end = new Date(req.body.endYear, 12, 0);
                    break;
                case '90':
                    startDate = start = getFirstDateOfMonth(1, req.body.year);
                    endDate = getLastDateOfMonth(3, req.body.year);
                    end = getLastDateOfMonth(12, req.body.year);
                    break;
            }
            Order.aggregate([
                {
                    $match: {
                        CreateDate: { $gte: start, $lte: end },
                        Status: {$in: ['Hoàn thành', 'Đang xử lý']},
                    }
                },
                {
                    $group: {
                        _id: '$ProductId',
                        total: {$sum: '$Amount'},
                    }
                },
                {
                    $sort : {
                        total : -1
                    }
                },
                {
                    $limit: 10
                }
            ], function (err, result) {
                if (err){
                    console.log(err);
                    res.render('admin/top',{
                        errormessage: 'Vui lòng thử lại sau',
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else{
                    if (result.length === 0){
                        res.render('admin/top',{
                            year: yearArray,
                            minDate: minDate,
                            min: min,
                            max: max,
                            start: selectStart,
                            end: selectEnd,
                            groupBy: req.body.groupBy,
                            layout: 'layout_admin.hbs',
                            user: req.session.passport.user,
                            helpers: req.handlebars.helpers
                        });
                    }
                    else {
                        var top10 = [];
                        var promises = [];
                        result.forEach(function (item) {
                            var promise = Product.findOne({_id: item._id}).exec()
                                .then(function (product) {
                                    var info = {
                                        productId: item._id,
                                        name: product.Title,
                                        price: product.Price,
                                        totalAmount: item.total,
                                        totalPrice: item.total * product.Price,
                                    };
                                    top10.push(info);
                                })
                                .then(undefined, function(err){
                                    console.log(err);
                                });
                            promises.push(promise);
                        });
                        Promise.all(promises).then(function () {
                            res.render('admin/top',{
                                result: top10,
                                year: yearArray,
                                minDate: minDate,
                                min: min,
                                max: max,
                                start: selectStart,
                                end: selectEnd,
                                groupBy: req.body.groupBy,
                                layout: 'layout_admin.hbs',
                                user: req.session.passport.user,
                                helpers: req.handlebars.helpers
                            });
                        });
                    }
                }
            });
        }
        else {
            res.redirect('/user/signin');
        }
    }
    else{
        res.redirect('/user/signin');
    }
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function getDateFromWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getFirstDateOfMonth(month, year){
    return new Date(year, month - 1, 1);
}

function getLastDateOfMonth(month, year) {
    return new Date(year, month, 0);
}

function getDaysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
};

function differentDays(d1, d2) {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}