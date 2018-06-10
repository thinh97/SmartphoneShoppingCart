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
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
                CreateDate: req.body.createDate,
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
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
            res.redirect('/users/signin');
        }
    }
    else{
        res.redirect('/users/signin');
    }
}

exports.file_upload_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            var imagePath = [];
            if (req.body.id){
                Product.findById(req.body.id, function (err, result) {
                   if (err){
                       res.status(500).send('Đã xảy ra lỗi khi tìm sản phẩm')
                       return;
                   }
                   else{
                       imagePath = result.ImagePath;
                       req.files.forEach(function (file) {
                           imagePath.push('/images/' + file.filename);
                       });
                       res.render('admin/image_list', {
                           layout: false,
                           imagePath: imagePath,
                       });
                   }
                });
            }
            else{
                req.files.forEach(function (file) {
                    imagePath.push('/images/' + file.filename);
                });
                res.render('admin/image_list', {
                    layout: false,
                    imagePath: imagePath,
                });
            }
        }
    }
    else
        res.status(496).send('Bạn không có quyền truy cập');
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