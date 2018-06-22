var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var Order = require('../models/order');
var Product = require('../models/product');
var Cart = require('../models/cart');

exports.index = function(req, res, next) {
    res.redirect('/user/profile');
}

exports.signin_get = function(req, res, next) {
    if (req.isUnauthenticated()){
        res.render('account/signin', {
            cart: req.cart,
            helpers: req.handlebars.helpers
        });
    }
    else
        res.redirect('/user/profile');
}

exports.signin_post = function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render('account/signin', {
                message: info.message,
                cart: req.cart,
                helpers: req.handlebars.helpers
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            if (user.Role === 'admin')
                return res.redirect('/admin');
            if (user.AccessToken != null && user.TokenExpires == null){
                return res.render('account/signin', {
                    active: true,
                    cart: req.cart,
                    message: 'Vui lòng kích hoạt tài khoản trước khi sử dụng',
                    helpers: req.handlebars.helpers
                });
            }
            return res.redirect(req.session.cookie.path);
        });
    })(req, res, next);
}

exports.signup_get = function(req, res, next) {
    var nowDate = new Date();
    var curentDate = (nowDate.getFullYear()-5) + '-' + (pad2(nowDate.getMonth()+1)) + '-' + pad2(nowDate.getDate());
    res.render('account/signup',{
        cart: req.cart,
        CurentDate: curentDate,
        New: true,
        helpers: req.handlebars.helpers
    });
}

exports.signup_post = function(req, res, next) {
    if (req.body.password === req.body.passwordConfirm) {
        var newUser = new User({
            Name: req.body.name,
            UserName: req.body.username,
            Email: req.body.email,
            Gender: req.body.gender,
            Birthday: req.body.dob,
            Address: req.body.address,
            Password: req.body.password,
            Phone: req.body.phone,
            Role: "user",
            Cart: null,
            AccessToken: generateString(),
            TokenExpires: null
        });
        newUser.save(function (err) {
            if (err) {
                console.log(err);
                res.render('account/signup', {
                    success: null,
                    cart: req.cart,
                    errormessage: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
                    helpers: req.handlebars.helpers
                });
            }
            else{
                res.mailer.send('account/email_active_account', {
                    to: newUser.Email,
                    subject: 'Kích hoạt tài khoản Smartphone Shopping Cart',
                    username: newUser.UserName,
                    hostname: req.hostname,
                    activeToken: newUser.AccessToken,
                    layout: '',
                    helpers: req.handlebars.helpers
                }, function (err) {
                    if (err) {
                        console.log(err);
                        res.render('error', {
                            cart: req.cart,
                            message: 'Đăng ký thành công! Gửi yêu cầu kích hoạt thất bại. Vui lòng thử lại sau',
                            helpers: req.handlebars.helpers
                        });
                    }
                    else{
                        res.render('account/signup', {
                            success: true,
                            cart: req.cart,
                            helpers: req.handlebars.helpers
                        });
                    }
                });
            }
        });
    }
    else{
        res.render('account/signup', {
            success: null,
            cart: req.cart,
            errormessage: "Mật khẩu không khớp",
            helpers: req.handlebars.helpers
        });
    }
}

exports.signout_get = function(req, res, next) {
    if (req.isAuthenticated()){
        req.logOut();
    }
    res.redirect('/user/signin');
}

exports.profile_get = function(req, res, next) {
    if (req.isAuthenticated()){
        var nowDate = new Date();
        var curentDate = (nowDate.getFullYear()-5) + '-' + (pad2(nowDate.getMonth()+1)) + '-' + pad2(nowDate.getDate());
        res.render('account/profile',{
            CurentDate: curentDate,
            cart: req.cart,
            user: req.session.passport.user,
            helpers: req.handlebars.helpers
        });
    }
    else
        res.redirect('/user/signin');
}

exports.profile_changeinfo_post = function(req, res, next) {
    if (req.isAuthenticated()){
        var user = req.session.passport.user;
        user.Name = req.body.name;
        user.UserName = req.body.username;
        user.Email = req.body.email;
        user.Gender = req.body.gender;
        user.Birthday = req.body.dob;
        user.Address = req.body.address;
        user.Phone = req.body.phone;
        User.findByIdAndUpdate(user._id, user, {new: true, runValidators: true}, function (err,updatedUser) {
            if (err) {
                console.log(err);
                res.render('account/profile', {
                    errormessage: err.message,
                    cart: req.cart,
                    user: req.session.passport.user,
                    helpers: req.handlebars.helpers
                });
            }
            else {
                res.render('account/profile', {
                    message: 'Đã lưu',
                    cart: req.cart,
                    user: updatedUser,
                    helpers: req.handlebars.helpers
                });
            }
        });
    }
    else
        res.redirect('/user/signin');
}

exports.profile_change_password_post = function(req, res, next) {
    if (req.isAuthenticated()){
        var user = req.session.passport.user;
        if (bcrypt.compareSync(req.body.oldPassword, user.Password)){
            if (req.body.newPassword === req.body.newPasswordConfirm){
                User.findByIdAndUpdate(user._id, {Password: bcrypt.hashSync(req.body.newPassword)}, {new: true, runValidators: true}, function (err,updatedUser) {
                    if (err) {
                        console.log(err);
                        res.render('account/profile', {
                            errormessage: err.message,
                            cart: req.cart,
                            user: req.session.passport.user,
                            helpers: req.handlebars.helpers
                        });
                    }
                    else {
                        res.render('account/profile', {
                            message: 'Thay đổi mật khẩu thành công',
                            cart: req.cart,
                            user: updatedUser,
                            helpers: req.handlebars.helpers
                        });
                    }
                });
            }
            else{
                res.render('account/profile', {
                    errormessage: 'Mật khẩu không khớp',
                    cart: req.cart,
                    user: updatedUser,
                    helpers: req.handlebars.helpers
                });
            }
        }
    }
    else
        res.redirect('/user/signin');
}

exports.forgot_password_get = function(req, res, next) {
    res.render('account/forgot_password',{
        New: true,
        cart: req.cart,
        helpers: req.handlebars.helpers
    });
}

exports.forgot_password_post = function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    User.findOne({UserName: username, Email: email},function (err, result) {
       if (err){
           console.log(err);
           res.render('account/forgot_password',{
               success: null,
               cart: req.cart,
               errormessage: 'Yêu cầu thất bại. Vui lòng thử lại sau',
               helpers: req.handlebars.helpers
           });
       }
       if (result == null){
           res.render('account/forgot_password',{
               success: null,
               cart: req.cart,
               errormessage: 'Không tìm thấy tên đăng nhập hoặc email',
               helpers: req.handlebars.helpers
           });
       }
       else{
           if (result.AccessToken != null && result.TokenExpires == null){
               res.render('account/forgot_password',{
                   success: null,
                   cart: req.cart,
                   errormessage: 'Tài khoản chưa được kích hoạt. Vui lòng kích hoạt tài khoản trước khi sử dụng',
                   helpers: req.handlebars.helpers
               });
           }
           else{
               var resetToken = generateString();
               var resetExpires = Date();
               User.findByIdAndUpdate(result._id, {AccessToken: resetToken, TokenExpires: resetExpires}, {}, function (err,updatedUser){
                   if (err) {
                       console.log(err);
                       res.render('account/forgot_password', {
                           errormessage: 'Yêu cầu thất bại. Vui lòng thử lại sau',
                           success: null,
                           cart: req.cart,
                           helpers: req.handlebars.helpers
                       });
                   }
                   else {
                       res.mailer.send('account/email_reset_password', {
                           to: email,
                           subject: 'Khôi phục mật khẩu tài khoản Smartphone Shopping Cart',
                           username: username,
                           hostname: req.hostname,
                           resetToken: resetToken,
                           layout: '',
                           helpers: req.handlebars.helpers
                       }, function (err) {
                           if (err) {
                               console.log(err);
                               res.render('account/forgot_password', {
                                   success: null,
                                   cart: req.cart,
                                   errormessage: 'Yêu cầu thất bại. Vui lòng thử lại sau',
                                   helpers: req.handlebars.helpers
                               });
                           }
                           else{
                               res.render('account/forgot_password', {
                                   success: true,
                                   cart: req.cart,
                                   helpers: req.handlebars.helpers
                               });
                           }
                       });
                   }
               });
           }
       }
    });
}

exports.reset_password_get = function(req, res, next) {
    var token = req.params.token;
    User.findOne({AccessToken: token}, function (err, result) {
       if (err){
           console.log(err);
           res.render('error',{
               message: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
               cart: req.cart,
               helpers: req.handlebars.helpers
           });
       }
       else {
           if (result != null) {
               var hour = (Date.now() - result.TokenExpires.getTime()) / 3600000
               if (hour <= 1) {
                   res.render('account/reset_password', {
                       success: null,
                       expire: null,
                       cart: req.cart,
                       helpers: req.handlebars.helpers
                   });
               }
               else {
                   res.render('account/reset_password', {
                       success: null,
                       expire: true,
                       cart: req.cart,
                       helpers: req.handlebars.helpers
                   });
               }
           }
           else {
               res.render('account/reset_password', {
                   success: null,
                   expire: true,
                   cart: req.cart,
                   helpers: req.handlebars.helpers
               });
           }
       }
    });
}

exports.reset_password_post = function(req, res, next) {
    var token = req.params.token;
    User.findOne({AccessToken: token}, function (err, result) {
        if (err){
            console.log(err);
            res.render('error',{
                message: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
                cart: req.cart,
                helpers: req.handlebars.helpers
            });
        }
        else {
            if (result != null) {
                var hour = (Date.now() - result.TokenExpires.getTime()) / 3600000;
                if (hour <= 1) {
                    if (req.body.password === req.body.passwordConfirm) {
                        User.findByIdAndUpdate(result._id, {Password: bcrypt.hashSync(req.body.password), TokenExpires: null, AccessToken: null}, {
                            new: true,
                            runValidators: true
                        }, function (err, updatedUser) {
                            if (err) {
                                console.log(err);
                                res.render('account/reset_password', {
                                    success: null,
                                    expire: null,
                                    cart: req.cart,
                                    errormessage: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
                                    helpers: req.handlebars.helpers
                                });
                            }
                            else {
                                res.render('account/reset_password', {
                                    success: true,
                                    cart: req.cart,
                                    helpers: req.handlebars.helpers
                                });
                            }
                        });
                    }
                }
                else {
                    res.render('account/reset_password', {
                        success: null,
                        expire: true,
                        cart: req.cart,
                        helpers: req.handlebars.helpers
                    });
                }
            }
            else {
                res.render('account/reset_password', {
                    success: null,
                    expire: true,
                    cart: req.cart,
                    helpers: req.handlebars.helpers
                });
            }
        }
    });
}

exports.active_get = function(req, res, next) {
    res.render('account/active_account',{
        cart: req.cart,
        helpers: req.handlebars.helpers
    });
}

exports.active_post = function(req, res, next) {
    var email = req.body.email;
    User.findOne({Email: email}, function (err, result) {
       if (err){
           console.log(err);
           res.render('account/active_account',{
               cart: req.cart,
               errormessage: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
               helpers: req.handlebars.helpers
           });
       }
       else{
            if (result != null){
                if (result.AccessToken != null && result.TokenExpires == null){
                    res.mailer.send('account/email_active_account', {
                        to: email,
                        subject: 'Kích hoạt tài khoản Smartphone Shopping Cart',
                        username: result.UserName,
                        hostname: req.hostname,
                        activeToken: result.AccessToken,
                        layout: '',
                        helpers: req.handlebars.helpers
                    }, function (err) {
                        if (err) {
                            console.log(err);
                            res.render('account/active_account', {
                                success: null,
                                cart: req.cart,
                                errormessage: 'Yêu cầu thất bại. Vui lòng thử lại sau',
                                helpers: req.handlebars.helpers
                            });
                        }
                        else{
                            res.render('account/active_account', {
                                success: true,
                                cart: req.cart,
                                helpers: req.handlebars.helpers
                            });
                        }
                    });
                }
                else{
                    res.render('account/active_account',{
                        errormessage: 'Tài khoản đã kích hoạt rồi',
                        cart: req.cart,
                        helpers: req.handlebars.helpers
                    });
                }
            }
            else{
                res.render('account/active_account',{
                    errormessage: 'Không tìm thấy email',
                    cart: req.cart,
                    helpers: req.handlebars.helpers
                });
            }
       }
    });
}

exports.active_account_get = function(req, res, next) {
    var token = req.params.token;
    User.findOne({AccessToken: token}, function (err, result) {
        if (err){
            console.log(err);
            res.render('error',{
                message: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
                cart: req.cart,
                helpers: req.handlebars.helpers
            });
        }
        else {
            if (result != null) {
                User.findByIdAndUpdate(result._id, {AccessToken: null}, {
                    new: true,
                    runValidators: true
                }, function (err, updatedUser) {
                    if (err) {
                        console.log(err);
                        res.render('account/active_account', {
                            errormessage: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
                            cart: req.cart,
                            helpers: req.handlebars.helpers
                        });
                    }
                    else {
                        res.render('account/active_account', {
                            success: true,
                            active: true,
                            message: 'Kích hoạt tài khoản thành công',
                            cart: req.cart,
                            helpers: req.handlebars.helpers
                        });
                    }
                });
            }
            else {
                res.render('account/active_account', {
                    errormessage: 'Tài khoản đã kích hoạt',
                    cart: req.cart,
                    helpers: req.handlebars.helpers
                });
            }
        }
    });
}

exports.add_to_cart = function(req, res , next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {});

    Product.findById(productId, function(err, product){
        if(err ){
            return  res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });

}

exports.get_shopping_cart = function(req, res , next){
    var user = null;
    if (req.session.passport)
        user = req.session.passport.user;
    if(!req.session.cart){
        return res.render('shopping-cart', {
            products: null,
            user: user,
            helpers: req.handlebars.helpers
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('shopping-cart', {products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        cart: req.session.cart,
        user:user,
        helpers: req.handlebars.helpers
    })
}

exports.get_delete_shopping_cart = function(req, res , next){
    var user = null;
    if (req.session.passport)
        user = req.session.passport.user;
    if(!req.session.cart){
        return res.render('shopping-cart', {
            products: null,
            user: user,
            helpers: req.handlebars.helpers
        });
    }
    var cart = new Cart(req.session.cart);
    console.log(req.params.id);
    cart.delete(req.params.id);
    req.session.cart = cart;
    res.render('shopping-cart', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice,
        cart: cart,
        user: user,
        helpers: req.handlebars.helpers
    })
}

exports.get_check_out = function(req, res, next){
    var user = null;
    if (req.session.passport)
        user = req.session.passport.user;
    if (req.isAuthenticated()){
        if(!req.session.cart){
            return res.redirect('shopping-cart');
        }
        var cart = new Cart(req.session.cart);

        res.render('checkout',{
            products: cart.generateArray(),
            cart: req.session.cart,
            user: user,
            totalPrice: cart.totalPrice,
            helpers: req.handlebars.helpers
        });
    }
    else{
        res.redirect('/user/signin');
    }
}

exports.post_check_out = function(req, res , next){
    if(req.isAuthenticated()){
        if(!req.session.cart){
            return res.redirect('shopping-cart');
        }
        var cart = new Cart(req.session.cart);
        var itemArray = cart.generateArray();
        itemArray.forEach(function (item) {
            var order = new Order({
                ProductId: item.item._id,
                DeliveryDate: new Date().addDays(7),
                UserId: req.session.passport.user._id,
                BillAddress: req.body.address,
                Name: req.body.name,
                email: req.body.email_address,
                MobilePhone: req.body.phone_number,
                PaymentMethod: 'Thanh toán khi nhận hàng',
                Amount: item.qty,
                Status: 'Đang xử lý',
            });
            order.save(function(err, result){
                if (err)
                    console.log(err);
                else
                    console.log('save!')
            });
        });
        req.session.cart = null;
        res.redirect('/user/history');
    }
}

exports.order_history_get = function(req, res, next) {
    if (req.isAuthenticated()){
        var user = req.session.passport.user;
        Order.find({UserId: user._id}).
        populate('ProductId','Title Price _id').
        exec(function (err, result) {
            if (err){
                console.log(err);
                res.render('account/order_history',{
                    errormessage: 'Vui lòng thử lại sau',
                    user: user,
                    cart: req.cart,
                    helpers: req.handlebars.helpers
                });
            }
            else{
                if (result != null){
                    var orders = {};
                    var pending = result.filter(filterStatusPending);
                    if (pending.length > 0){
                        orders.pending = mapData(pending);
                    }
                    var fail = result.filter(filterStatusFail);
                    if (fail.length > 0){
                        orders.fail = mapData(fail);
                    }
                    var complete = result.filter(filterStatusCompltete);
                    if (complete.length > 0){
                        orders.complete = mapData(complete);
                    }
                    var abort = result.filter(filterStatusAbort);
                    if (abort.length > 0){
                        orders.abort = mapData(abort);
                    }
                    res.render('account/order_history',{
                        orders: orders,
                        user: user,
                        cart: req.cart,
                        helpers: req.handlebars.helpers
                    });
                }
                else{
                    res.render('account/order_history',{
                        user: user,
                        cart: req.cart,
                        helpers: req.handlebars.helpers
                    });
                }
            }
        });
    }
    else
        res.redirect('/user/signin');

}

exports.cancel_order_get = function(req, res, next) {
    if (req.isAuthenticated()){
        Order.findByIdAndUpdate(req.params.id, {Status: 'Đã hủy'}, {}, function (err) {
            if (err) {
                console.log(err);
                res.render('account/order_history', {
                    errormessage: 'Vui lòng thử lại sau',
                    cart: req.cart,
                    user: req.session.passport.user,
                    helpers: req.handlebars.helpers
                });
            }
            else {
                res.redirect('/user/history');
            }
        });
    }
    else
        res.redirect('/user/signin');
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

function generateString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function filterStatusCompltete(item) {
    return item.Status === 'Hoàn thành';
}

function filterStatusPending(item) {
    return item.Status === 'Đang xử lý';
}

function filterStatusFail(item) {
    return item.Status === 'Thất bại';
}

function filterStatusAbort(item) {
    return item.Status === 'Đã hủy';
}

function mapData(array) {
    var arrayMap = [];
    array.forEach(function (item) {
        var product = {
            id: item.ProductId._id,
            name: item.ProductId.Title,
            price: item.ProductId.Price,
        };
        var order = {
            id: item._id,
            createDate: item.CreateDate,
            deliveryDate: item.DeliveryDate,
            address: item.BillAddress,
            paymentMethod: item.PaymentMethod,
            product: product,
            amount: item.Amount,
            total: item.Amount * product.price,
        };
        arrayMap.push(order);
    });
    return arrayMap;
}