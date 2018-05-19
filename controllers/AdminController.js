var Product = require('../models/product');
var User = require('../models/user');
var Order = require('../models/order');
var Brand = require('../models/brand');

exports.index = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.new_brand = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.get_brand = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.edit_brand = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.new_product = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.get_products = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.edit_product = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.get_orders = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.edit_order = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.new_user = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.get_users = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.edit_user = function(req, res, next) {
    //if

    res.render('admin', {
        layout: 'layout_admin.hbs',
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

