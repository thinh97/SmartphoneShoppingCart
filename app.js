var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var session = require('express-session');
let moment = require('moment');
var LocalStrategy = require('passport-local').Strategy;
var mailer = require('express-mailer');
var paginate = require('handlebars-paginate');

var Brand = require('./models/brand');
var Product = require('./models/product');
var User = require('./models/user');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

mongoose.Promise = global.Promise;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});

passport.use(new LocalStrategy(
    function (username,password,done) {
        User.findOne({
            UserName: username
        }, function (err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }
            else if (user != null) {
                if (bcrypt.compareSync(password, user.Password)) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: 'Sai tên tài khoản hoặc mật khẩu. Vui lòng hãy thử lại' });
                }
            }
            else {
                return done(null, false, { message: 'Sai tên tài khoản hoặc mật khẩu. Vui lòng hãy thử lại' });
            }
        });
    }
));

var app = express();

mailer.extend(app, {
    from: 'no-reply@smartphoneshoppingcart.herokuapp.com',
    host:  'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    transportMethod: 'SMTP',
    auth: {
        user: 'smartphoneshoppingcart@gmail.com',
        pass: '123456789@a'
    }
});

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    defaultLayout: 'layout.hbs',
    partialsDir: [ path.join(__dirname, 'views') ]
}));
app.set('view engine', 'hbs');

// helpers for the handlebar templating platform
handlebars = handlebars.create({
    helpers: {
        formatAmount: function(amount){
            if (amount === null || amount === undefined)
                return '';
			var amountString = amount.toString();
			var i = amountString.length - 3;
            while (i > 0){
				amountString = insertString(amountString,i,',');
				i -= 3;
			}
            return amountString;
        },
		formatAmountTitle: function(start, end){
			var amountString = '';
			if (start != 0 && end != 0)
				amountString = 'Từ ' + start/1000000 + ' - ' + end/1000000 + ' triệu';
			else
				if (start == 0)
					amountString = 'Dưới ' + end/1000000 + ' triệu';
				else
					amountString = 'Trên ' + start/1000000 + ' triệu';
            return amountString;
        },
        ifCond: function (v1, operator, v2, options){
            switch(operator){
            case'==':
                return(v1 === v2) ? options.fn(this) : options.inverse(this);
            case'!=':
                return(v1 !== v2) ? options.fn(this) : options.inverse(this);
            case'===':
                return(v1 === v2) ? options.fn(this) : options.inverse(this);
            case'<':
                return(v1 < v2) ? options.fn(this) : options.inverse(this);
            case'<=':
                return(v1 <= v2) ? options.fn(this) : options.inverse(this);
            case'>':
                return(v1 > v2) ? options.fn(this) : options.inverse(this);
            case'>=':
                return(v1 >= v2) ? options.fn(this) : options.inverse(this);
            case'&&':
                return(v1 && v2) ? options.fn(this) : options.inverse(this);
            case'||':
                return(v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
            }
        },
        formatDate: function (date, format){
            return moment(date).format(format);
        },
        getStatusColor: function (status){
            switch(status){
                case'Thất bại':
                case'Đã hủy':
                    return'danger';
                case'Hoàn thành':
                    return'success';
                case'Đang xử lý':
                    return'warning';
            }
        },
        calculate: function (a, operator, b){
            a = Number(a);
            b = Number(b);
            switch(operator){
                case'+':
                    return a + b;
                case'-':
                    return a - b;
                case'*':
                    return a * b;
                case'<':
                    return a / b;
            }
        },
        replaceString: function (src, str, newStr) {
            return src.replace(/str/g,newStr);
        },
        paginate: paginate
    }
});

mongoose.connect('mongodb://admin:123456789x@ds155192.mlab.com:55192/shopping');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('Connected!');
});

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret : "secret",
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    req.handlebars = handlebars;
    var cart = null;
    if (req.session.cart)
        cart = req.session.cart;
    req.cart = cart;
    var user = null;
    if (req.session.passport)
        user = req.session.passport.user;
    req.user = user;
    Brand.find(function (err, results) {
        if (err)
            return null;
        req.menuBrand = results;
        Product.find({},'Price',function(err,results){
            var i = 0;
            var count = 0;
            var object = {};
            var arrayResults = [];

            while (i<results.length && 0 <= results[i].Price && results[i].Price < 5000000){
                count += 1;
                i += 1;
            }
            object = {'start':0, 'end':5000000, 'count': count};
            arrayResults.push(object);

            count = 0;
            while (i<results.length && 5000000 <= results[i].Price && results[i].Price < 10000000){
                count += 1;
                i += 1;
            }
            object = {'start':5000000, 'end':10000000, 'count': count};
            arrayResults.push(object);

            count = 0;
            while (i<results.length && 10000000 <= results[i].Price && results[i].Price < 20000000){
                count += 1;
                i += 1;
            }
            object = {'start':10000000, 'end':20000000, 'count': count};
            arrayResults.push(object);

            count = 0;
            while (i<results.length && 20000000 <= results[i].Price && results[i].Price < 30000000){
                count += 1;
                i += 1;
            }
            object = {'start':20000000, 'end':30000000, 'count': count};
            arrayResults.push(object);

            count = 0;
            while (i<results.length && 30000000 <= results[i].Price){
                count += 1;
                i += 1;
            }
            object = {'start':30000000, 'end':0, 'count': count};
            arrayResults.push(object);

            req.priceRange = arrayResults;

            next();
        }).sort({Price: 1});
    });
});

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', adminRouter);

app.use((req, res, next) => {
    let err = new Error('Không tìm thấy URL');
    console.log(req.originalUrl);
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    var user = null;
    if (req.session.passport)
        user = req.session.passport.user;
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
        user: user,
        message: 'Đã xảy ra lỗi. Nếu bạn thấy lỗi này vẫn tiếp tục hãy liên hệ admin',
        error: {},
        helpers: handlebars.helpers
    });
});

function insertString(src,index,str){
	if (index > 0)
		return src.substring(0, index) + str + src.substring(index, src.length);
	else
		return src + str;
}

module.exports = app;
