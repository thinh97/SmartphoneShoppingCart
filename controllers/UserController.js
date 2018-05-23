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
        var flag = null;
        if (err){
            message = err.message;
            flag = true;
            console.log(flag);
        }
        res.render('signup',{
            New: flag,
            message: message,
            helpers: req.handlebars.helpers
        });
    });
}

exports.signout = function(req, res, next) {
    if (req.isAuthenticated()){
        req.logOut();
        res.redirect(req.session.cookie.path);
    }
    else{
        res.redirect('/users/signin');
    }
}

exports.profile = function(req, res, next) {

}

function pad2(number) {

    return (number < 10 ? '0' : '') + number

}