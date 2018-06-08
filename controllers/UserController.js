var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

exports.index = function(req, res, next) {
    res.redirect('/users/profile');
}

exports.signin_get = function(req, res, next) {
    if (req.isUnauthenticated()){
        res.render('signin', {
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
            return res.render('signin', {
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
            return res.redirect(req.session.cookie.path);
        });
    })(req, res, next);
}

exports.signup_get = function(req, res, next) {
    var nowDate = new Date();
    var curentDate = (nowDate.getFullYear()-5) + '-' + (pad2(nowDate.getMonth()+1)) + '-' + pad2(nowDate.getDate());
    res.render('signup',{
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
            Role: "user",
            Cart: null
        });
        newUser.save(function (err) {
            var message = null;
            var flag = true;
            if (err) {
                errormessage = err.message;
                flag = null;
                console.log(flag);
            }
            res.render('signup', {
                New: flag,
                message: message,
                helpers: req.handlebars.helpers
            });
        });
    }
    else{
        res.render('signup', {
            New: flag,
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
        res.render('profile',{
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
                res.render('profile', {
                    errormessage: err.message,
                    user: req.session.passport.user,
                    helpers: req.handlebars.helpers
                });
            }
            else {
                res.render('profile', {
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

exports.profile_changepassword_post = function(req, res, next) {
    if (req.isAuthenticated()){
        var user = req.session.passport.user;
        if (bcrypt.compareSync(req.body.oldPassword, user.Password)){
            if (req.body.newPassword === req.body.newPasswordConfirm){
                User.findByIdAndUpdate(user._id, {Password: bcrypt.hashSync(req.body.newPassword)}, {new: true, runValidators: true}, function (err,updatedUser) {
                    if (err) {
                        console.log(err);
                        res.render('profile', {
                            errormessage: err.message,
                            user: req.session.passport.user,
                            helpers: req.handlebars.helpers
                        });
                    }
                    else {
                        res.render('profile', {
                            message: 'Thay đổi mật khẩu thành công',
                            user: updatedUser,
                            helpers: req.handlebars.helpers
                        });
                    }
                });
            }
            else{
                res.render('profile', {
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

function pad2(number) {

    return (number < 10 ? '0' : '') + number

}