var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var Brand = require('./models/brand');
var Product = require('./models/product');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

var app = express();

app.set('views', path.join(__dirname, 'views'));
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
        }
    }
});

mongoose.connect('mongodb://shoppingcart:0123456789xxx@ds217970.mlab.com:17970/smartphoneshoppingcart');
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

function getPriceRange(){
    var arrayResults = [];
	Product.find({},'Price',function(err,results){
		var i = 0;
		var count = 0;
		var object = {};

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
	}).sort({Price: 1});
	return arrayResults;
}

app.use((req, res, next) => {
    req.handlebars = handlebars;
    Brand.find(function (err, results) {
        if (err)
            return null;
        req.menuBrand = results;
    });
    req.priceRange = getPriceRange();
    next();
});

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', adminRouter);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if(app.get('env') === 'development'){
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            helpers: handlebars.helpers
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
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
