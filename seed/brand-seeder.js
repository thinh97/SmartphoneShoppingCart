var Brand = require('../models/brand');
var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected!');
    var count = 0;
    var htcBrand = new Brand({
        _id: 'htc',
        Name: 'HTC',
    });
    Product.find({Brand: htcBrand._id}, function (err, result) {
        if (err)
            console.log(err);
        else{
            result.forEach(function (product) {
                htcBrand.Products.push(product._id);
            });
            htcBrand.save(function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 8)
                        mongoose.disconnect();
                }
            });
        }
    });

    var appleBrand = new Brand({
        _id: 'apple',
        Name: 'Apple',
    });
    Product.find({Brand: appleBrand._id}, function (err, result) {
        if (err)
            console.log(err);
        else{
            result.forEach(function (product) {
                appleBrand.Products.push(product._id);
            });
            appleBrand.save(function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 8)
                        mongoose.disconnect();
                }
            });
        }
    });

    var motorolaBrand = new Brand({
        _id: 'motorola',
        Name: 'Motorola',
    });
    Product.find({Brand: motorolaBrand._id}, function (err, result) {
        if (err)
            console.log(err);
        else{
            result.forEach(function (product) {
                motorolaBrand.Products.push(product._id);
            });
            motorolaBrand.save(function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 8)
                        mongoose.disconnect();
                }
            });
        }
    });

    var oppoBrand = new Brand({
        _id: 'oppo',
        Name: 'Oppo',
    });
    Product.find({Brand: oppoBrand._id}, function (err, result) {
        if (err)
            console.log(err);
        else{
            result.forEach(function (product) {
                oppoBrand.Products.push(product._id);
            });
            oppoBrand.save(function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 8)
                        mongoose.disconnect();
                }
            });
        }
    });

    var samsungBrand = new Brand({
        _id: 'samsung',
        Name: 'Samsung',
    });
    Product.find({Brand: samsungBrand._id}, function (err, result) {
        if (err)
            console.log(err);
        else{
            result.forEach(function (product) {
                samsungBrand.Products.push(product._id);
            });
            samsungBrand.save(function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 8)
                        mongoose.disconnect();
                }
            });
        }
    });

    var bkavBrand = new Brand({
        _id: 'bkav',
        Name: 'Bkav',
    });
    Product.find({Brand: bkavBrand._id}, function (err, result) {
        if (err)
            console.log(err);
        else{
            result.forEach(function (product) {
                bkavBrand.Products.push(product._id);
            });
            bkavBrand.save(function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 8)
                        mongoose.disconnect();
                }
            });
        }
    });

    var sonyBrand = new Brand({
        _id: 'sony',
        Name: 'Sony',
    });
    Product.find({Brand: sonyBrand._id}, function (err, result) {
        if (err)
            console.log(err);
        else{
            result.forEach(function (product) {
                sonyBrand.Products.push(product._id);
            });
            sonyBrand.save(function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 8)
                        mongoose.disconnect();
                }
            });
        }
    });

    var vivoBrand = new Brand({
        _id: 'vivo',
        Name: 'Vivo',
    });
    Product.find({Brand: vivoBrand._id}, function (err, result) {
        if (err)
            console.log(err);
        else{
            result.forEach(function (product) {
                vivoBrand.Products.push(product._id);
            });
            vivoBrand.save(function (err) {
                if (err)
                    console.log(err);
                else{
                    console.log('saved!');
                    count += 1;
                    if (count === 8)
                        mongoose.disconnect();
                }
            });
        }
    });
});
