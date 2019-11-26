var con = require('../db');

module.exports.getRoot = function(req,res){
         var sql = "SELECT * FROM shoe ";
        con.query(sql, function(err, results) {
        if (err) res.end();
        console.log(results);
        res.render("index",{data:results});
        });
};

module.exports.getCategory = function(req,res){
    var sql = "SELECT * FROM shoe ";
    con.query(sql, function(err, results) {
    if (err) res.end();
    console.log(results);
    res.render("category",{data:results});
	});
};

module.exports.getChiTiet = function(req,res){
    var sql = "SELECT * FROM shoe WHERE magiay=" + req.params.id ;
    con.query(sql, function(err, results) {
    if (err) res.end();
    console.log(results);
    res.render("single-product",{data:results});
	});
};

module.exports.getRegis = function(req, res, next) {
  res.render('registration');
};

module.exports.getBlog = function(req, res, next) {
  res.render('blog');
};

module.exports.getCart = function(req, res, next) {
  res.render('cart');
};

module.exports.getCheckout = function(req, res, next) {
  res.render('checkout');
};

module.exports.getContact = function(req, res, next) {
  res.render('contact');
};

module.exports.getForgetPassword = function(req, res, next) {
  res.render('forgetPassword');
};

module.exports.getConfirmation = function(req, res, next) {
  res.render('confirmation');
};

module.exports.getLogin = function(req, res, next) {
  res.render('login');
};