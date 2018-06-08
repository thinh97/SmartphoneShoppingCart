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
            Brand.findOne({Name: req.body.nameBr}, function (err, brand) {
                if (err) {
                    console.log(err);
                    res.render('admin/brand_new', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    var brand= new Brand(
                        {Name: req.body.nameBr ,
                        _id: req.body.id
                        }
                    )
                   
                    brand.save(function (err, createBrand) {
                        if (err){
                            console.log(err);
                            res.render('admin/brand_new', {
                                errormessage: err.message,
                                layout: 'layout_admin.hbs',
                                user: req.session.passport.user,
                                helpers: req.handlebars.helpers
                            });
                        }
                        else{
                            res.render('admin/brand_new', {
                                brand: createBrand,
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

exports.list_brands_get = function(req, res, next) {
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

exports.edit_brand_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            var updateBrand = new Brand({
                _id: req.body.id,
                Name: req.body.nameBr
            });
            Brand.findByIdAndUpdate(req.body.id, updateBrand, {new: true, runValidators: true}, function (err,updatedBrand) {
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
            Brand.find(function (error, brands) {
                if (error){
                    res.render('admin/product_edit', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else{
                    res.render('admin/product_new', {
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

exports.create_new_product_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            Product.findById(req.body.id, function (err, product) {
                if (err) {
                    console.log(err);
                    res.render('admin/product_new', {
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    var product = new Product(
                        {
                            _id: req.body.id,
                            Title: req.body.title,
                            Price: req.body.price,
                            Description: req.body.description,
                        }
                    )                  
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
                    product.Details.Battery = req.body.detailBattery;
                    product.save(function (err, updatedProduct) {
                        if (err){
                            console.log(err);
                            res.render('admin/product_new', {
                                errormessage: err.message,
                                layout: 'layout_admin.hbs',
                                user: req.session.passport.user,
                                helpers: req.handlebars.helpers
                            });
                        }
                        else{
                            Brand.find(function (error, brands) {
                                if (error){
                                    res.render('admin/product_edit', {
                                        errormessage: err.message,
                                        layout: 'layout_admin.hbs',
                                        user: req.session.passport.user,
                                        helpers: req.handlebars.helpers
                                    });
                                }
                                else{
                                    res.render('admin/product_new', {
                                        product: updatedProduct,
                                        brands: brands,
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

exports.list_products_get = function(req, res, next) {
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
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    Brand.find(function (error, brands) {
                        if (error){
                            res.render('admin/product_edit', {
                                errormessage: err.message,
                                layout: 'layout_admin.hbs',
                                user: req.session.passport.user,
                                helpers: req.handlebars.helpers
                            });
                        }
                        else{
                            res.render('admin/product_edit', {
                                product: product,
                                brands: brands,
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

exports.edit_product_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            var updateProduct = new Product({
                _id: req.body.id,
                ImagePath: req.body.imagepath.split(","),
                Title: req.body.title,
                Price: req.body.price,
                Description: req.body.description,
                Brand: req.body.brand,
            });
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
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    Brand.find(function (error, brands) {
                        if (error){
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
                                brands: brands,
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
                        errormessage: err.message,
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

exports.edit_order_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            var updateOrder = new Order({
                _id: req.body.id,
                Name: req.body.billerName,
                Amount: req.body.amount,
                BillAddress: req.body.billAddress,
                MobilePhone: req.body.mobilePhone,
                PaymentMethod: req.body.paymentMethod,
                CreateDate: req.body.createDate,
                DeliveryDate: req.body.deliveryDate,
                Status: req.body.status,
            });
            Order.findByIdAndUpdate(req.body.id, updateOrder, {new: true, runValidators: true}, function (err,updatedOrder) {
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
                    Order.findById({_id: req.body.id}).
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
                        errormessage: err.message,
                        layout: 'layout_admin.hbs',
                        user: req.session.passport.user,
                        helpers: req.handlebars.helpers
                    });
                }
                else {
                    res.render('admin/users', {
                        users: users,
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

exports.edit_user_post = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.Role === 'admin'){
            User.findByIdAndUpdate(req.body.id, {Role: req.body.role}, {new: true, runValidators: true}, function (err,updatedUser) {
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

