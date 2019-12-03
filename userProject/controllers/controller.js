var con = require('../data/db');
console.log(con.database);
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
  var sql = "SELECT * FROM user";
    con.query(sql, function(err, results) {
    if (err) res.end();
    console.log(results);
    res.render("registration",{data:results});
  });
  
};
module.exports.postRegis = function(req,res, next)
{
  res.send("ok");
}

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

var db = require('../data/db');

exports.loadAll = () => {
	var sql=`select username from user`;
	return db.load(sql);
}


exports.login = user => {
	var sql=`select * from user where username='${user.username}' and password='${user.password}';`;
	return db.load(sql);
}

// exports.update = user => {
// 	var sql=`update users set name='${user.name}' where id=${user.id};`;
// 	return db.save(sql);
// }

exports.singleId = (id) => {
    var sql = `select * from user where id=${id};`;
    return db.load(sql);
}

exports.singleUsername = (username) => {
    var sql = `select * from user where username='${username}';`;
    return db.load(sql);
}