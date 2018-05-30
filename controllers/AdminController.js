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

exports.new_brand_get = function(req, res, next) {

}

exports.new_brand_post = function(req, res, next) {

}

exports.get_brand = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Brand.find(function (err, brands) {
                if (err) {
                    res.render('admin/brands', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/brands', {
                        brands: brands,
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

exports.edit_brand = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Brand.findOne({_id: req.params.id},function (err, brand) {
                if (err) {
                    res.render('admin/brand_edit', {
                        errormessage: err.message,
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

exports.update_brand = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            Brand.findById(req.body.id, function (err, brand) {
                if (err) {
                    console.log(err);
                    res.render('admin/brand_edit', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    brand.Name = req.body.nameBr;
                    brand.save(function (err, updatedBrand) {
                        if (err){
                            console.log(err);
                            res.render('admin/brand_edit', {
                                errormessage: err.message,
                                layout: 'layout_admin.hbs',
                                user: req.session.passport.user,
                                helpers: req.handlebars.helpers
                            });
                        }
                        else{
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

exports.delete_brand = function(req, res, next) {
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

exports.new_product = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Product.findOne({_id: req.params.id},function (err, product) {
                if (err) {
                    res.render('admin/product', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/product', {
                        product: product,
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

exports.get_products = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Product.find(function (err, results) {
                if (err) {
                    res.render('admin/products', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/products', {
                        results: results,
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

exports.edit_product = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Product.findOne({_id: req.params.id},function (err, product) {
                if (err) {
                    res.render('admin/product_edit', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/product_edit', {
                        product: product,
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

exports.update_product = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            Product.findById(req.body.id, function (err, product) {
                if (err) {
                    console.log(err);
                    res.render('admin/product_edit', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    product.Title = req.body.title;
                    product.Price = req.body.price;
                    product.Description = req.body.description;
                    product.Details.Screen = req.body.detailScreen;
                    product.Details.OS = req.body.detailOS;
                    product.Details.PrimaryCamera = req.body.detailPrimaryCamera;
                    product.Details.SecondaryCamera = req.body.detailSecondaryCamera;
                    product.Details.CPU = req.body.detailCPU;
                    product.Details.RAM = req.body.detailRAM;
                    product.Details.Memory = req.body.detailMemory;
                    product.Details.Sim = req.body.detailSim;
                    product.Details.Bettery = req.body.detailBattery;
                    product.save(function (err, updatedProduct) {
                        if (err){
                            console.log(err);
                            res.render('admin/product_edit', {
                                errormessage: err.message,
                                layout: 'layout_admin.hbs',
                                user: req.session.passport.user,
                                helpers: req.handlebars.helpers
                            });
                        }
                        else{
                            res.render('admin/product_edit', {
                                product: updatedProduct,
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

exports.delete_product = function(req, res, next) {
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

exports.get_orders = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Order.find(function (err, orders) {
                if (err) {
                    res.render('admin/orders', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/orders', {
                        orders: orders,
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

exports.edit_order = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            Order.findById({_id: req.params.id}).
            populate('ProductId','Title Price _id').
            populate('UserId','UserName _id').
            exec(function (err, order) {
                if (err) {
                    res.render('admin/order_edit', {
                        errormessage: err.message,
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

exports.update_order = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            Order.findById(req.body.id, function (err, order) {
                if (err) {
                    console.log(err);
                    res.render('admin/order_edit', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    order.Name = req.body.billerName;
                    order.Amount = req.body.amount;
                    order.BillAddress = req.body.billAddress;
                    order.MobilePhone = req.body.mobilePhone;
                    order.PaymentMethod = req.body.paymentMethod;
                    order.DeliveryDate = req.body.deliveryDate;
                    order.Status = req.body.status;
                    order.save(function (err, updatedOrder) {
                        if (err){
                            console.log(err);
                            res.render('admin/order_edit', {
                                errormessage: err.message,
                                layout: 'layout_admin.hbs',
                                user: req.session.passport.user,
                                helpers: req.handlebars.helpers
                            });
                        }
                        else{
                            Order.findById({_id: req.params.id}).
                            populate('ProductId','Title Price _id').
                            populate('UserId','UserName _id').
                            exec(function (err, order) {
                                if (err) {
                                    res.render('admin/order_edit', {
                                        errormessage: err.message,
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

exports.delete_order = function(req, res, next) {
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

exports.new_user = function(req, res, next) {
    //if

    var user = null;
    if (req.session.passport)
        user = req.session.passport.user;
    res.render('admin', {
        layout: 'layout_admin.hbs',
        user: user,
        helpers: req.handlebars.helpers
    });
}

exports.get_users = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            User.find(function (err, users) {
                if (err) {
                    res.render('admin/users', {
                        errormessage: err.message,
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

exports.edit_user = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            User.findById(req.params.id, function (err, result) {
                if (err) {
                    res.render('admin/user_edit', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/user_edit', {
                        result: result,
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

exports.update_user = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            User.findById(req.body.id,function (err, user) {
                if (err) {
                    console.log(err);
                    res.render('admin/product_edit', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    user.Role = req.body.role;
                    user.save(function (err, updatedUser) {
                        if (err){
                            console.log(err);
                            res.render('admin/user_edit', {
                                errormessage: err.message,
                                layout: 'layout_admin.hbs',
                                user: req.session.passport.user,
                                helpers: req.handlebars.helpers
                            });
                        }
                        else{
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

exports.delete_user = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin') {
            User.deleteOne({_id: req.params.id}, function (err) {
                if (err){
                    console.log(err);
                    res.redirect('/admin/users/?error=Đã có lỗi xảy ra. Vui lòng thử lại');
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

