var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

exports.signin_get = function(req, res, next) {
    res.render('signin', {
        session: req.session,
        helpers: req.handlebars.helpers
    });
}

exports.signin_post = function(req, res, next) {
    User.findOne({
        UserName: req.body.username
    }, function (err, user){
        //res.status(200).json({message: 'Đăng nhập thành công'});
        if (err){
            res.status(400).json({message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau'});
        }
        if (user != null){
            if (bcrypt.compareSync(req.body.password, user.Password)){
                //res.session.userId = user._id;
                res.userName = user.UserName;
                res.login =  true;
                var url = '';
                if (user.Role == 'admin') {
                    url = '/admin';
                }
                else {
                    url = '/';
                }
                res.status(200).json({message: 'Đăng nhập thành công', url: url});
            }
            else{
                res.status(400).json({message: 'Sai tên tài khoản hoặc mật khẩu. Vui lòng hãy thử lại'});
            }
        }
        else{
            res.status(400).json({message: 'Sai tên tài khoản hoặc mật khẩu. Vui lòng hãy thử lại'});
        }
    });
}

exports.signup = function(req, res, next) {

}

exports.signout = function(req, res, next) {

}