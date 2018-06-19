var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
exports.index = function(req, res, next) {
    res.redirect('/users/profile');
}

exports.signin_get = function(req, res, next) {
    if (req.isUnauthenticated()){
        res.render('account/signin', {
            helpers: req.handlebars.helpers
        });
    }
    else
        res.redirect('/users/profile');
}

exports.signin_post = function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.render('account/signin', {
                message: info.message,
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
                            message: 'Đăng ký thành công! Gửi yêu cầu kích hoạt thất bại. Vui lòng thử lại sau',
                            helpers: req.handlebars.helpers
                        });
                    }
                    else{
                        res.render('account/signup', {
                            success: true,
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
            errormessage: "Mật khẩu không khớp",
            helpers: req.handlebars.helpers
        });
    }
}

exports.signout_get = function(req, res, next) {
    if (req.isAuthenticated()){
        req.logOut();
        res.redirect(req.session.cookie.path);
    }
    else{
        res.redirect('/users/signin');
    }
}

exports.profile_get = function(req, res, next) {
    if (req.isAuthenticated()){
        var nowDate = new Date();
        var curentDate = (nowDate.getFullYear()-5) + '-' + (pad2(nowDate.getMonth()+1)) + '-' + pad2(nowDate.getDate());
        res.render('account/profile',{
            CurentDate: curentDate,
            user: req.session.passport.user,
            helpers: req.handlebars.helpers
        });
    }
    else
        res.redirect('/users/signin');
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
                    user: req.session.passport.user,
                    helpers: req.handlebars.helpers
                });
            }
            else {
                res.render('account/profile', {
                    message: 'Đã lưu',
                    user: updatedUser,
                    helpers: req.handlebars.helpers
                });
            }
        });
    }
    else
        res.redirect('/users/signin');
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
                            user: req.session.passport.user,
                            helpers: req.handlebars.helpers
                        });
                    }
                    else {
                        res.render('account/profile', {
                            message: 'Thay đổi mật khẩu thành công',
                            user: updatedUser,
                            helpers: req.handlebars.helpers
                        });
                    }
                });
            }
            else{
                res.render('account/profile', {
                    errormessage: 'Mật khẩu không khớp',
                    user: updatedUser,
                    helpers: req.handlebars.helpers
                });
            }
        }
    }
    else
        res.redirect('/users/signin');
}

exports.forgot_password_get = function(req, res, next) {
    res.render('account/forgot_password',{
        New: true,
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
               errormessage: 'Yêu cầu thất bại. Vui lòng thử lại sau',
               helpers: req.handlebars.helpers
           });
       }
       if (result == null){
           res.render('account/forgot_password',{
               success: null,
               errormessage: 'Không tìm thấy tên đăng nhập hoặc email',
               helpers: req.handlebars.helpers
           });
       }
       else{
           if (result.AccessToken != null && result.TokenExpires == null){
               res.render('account/forgot_password',{
                   success: null,
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
                                   errormessage: 'Yêu cầu thất bại. Vui lòng thử lại sau',
                                   helpers: req.handlebars.helpers
                               });
                           }
                           else{
                               res.render('account/forgot_password', {
                                   success: true,
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
                       helpers: req.handlebars.helpers
                   });
               }
               else {
                   res.render('account/reset_password', {
                       success: null,
                       expire: true,
                       helpers: req.handlebars.helpers
                   });
               }
           }
           else {
               res.render('account/reset_password', {
                   success: null,
                   expire: true,
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
                helpers: req.handlebars.helpers
            });
        }
        else {
            if (result != null) {
                var hour = (Date.now() - result.TokenExpires.getTime()) / 3600000
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
                                    errormessage: 'Đã xảy ra lỗi. Vui lòng thử lại sau',
                                    helpers: req.handlebars.helpers
                                });
                            }
                            else {
                                res.render('account/reset_password', {
                                    success: true,
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
                        helpers: req.handlebars.helpers
                    });
                }
            }
            else {
                res.render('account/reset_password', {
                    success: null,
                    expire: true,
                    helpers: req.handlebars.helpers
                });
            }
        }
    });
}

exports.active_get = function(req, res, next) {
    res.render('account/active_account',{
        helpers: req.handlebars.helpers
    });
}

exports.active_post = function(req, res, next) {
    var email = req.body.email;
    User.findOne({Email: email}, function (err, result) {
       if (err){
           console.log(err);
           res.render('account/active_account',{
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
                                errormessage: 'Yêu cầu thất bại. Vui lòng thử lại sau',
                                helpers: req.handlebars.helpers
                            });
                        }
                        else{
                            res.render('account/active_account', {
                                success: true,
                                helpers: req.handlebars.helpers
                            });
                        }
                    });
                }
                else{
                    res.render('account/active_account',{
                        errormessage: 'Tài khoản đã kích hoạt rồi',
                        helpers: req.handlebars.helpers
                    });
                }
            }
            else{
                res.render('account/active_account',{
                    errormessage: 'Không tìm thấy email',
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
                            helpers: req.handlebars.helpers
                        });
                    }
                    else {
                        res.render('account/active_account', {
                            success: true,
                            active: true,
                            message: 'Kích hoạt tài khoản thành công',
                            helpers: req.handlebars.helpers
                        });
                    }
                });
            }
            else {
                res.render('account/active_account', {
                    errormessage: 'Tài khoản đã kích hoạt',
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

exports.get_check_out = function(req, res, next){
    var user= null;
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
        res.redirect('/users/signin');
    }
}

exports.post_check_out = function(req, res , next){ 
   if(req.isAuthenticated()){
    if(!req.session.cart){
        return res.redirect('shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var order = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        email: req.body.email_address,
        phonenumber: req.body.phone_number
    });
    order.save(function(err, result){
        req.session.cart= null;
        res.redirect('/');
    })
   }
}
function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

function generateString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
