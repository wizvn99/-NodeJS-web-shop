var dataconfig = require('../data/db');
var con = dataconfig.create;

module.exports.getRoot = function(req, res, next)
{
	var sql = "SELECT * FROM shoe ";
	con.query(sql, function(err, results) {
	    if (err) res.end();
	    if(req.isAuthenticated())
	    {
	    	res.render("index",{ data:results, user:req.user, logged: true });
	    }else{
	    	res.render("index",{data:results , logged: false });
	    }
	});
};

module.exports.getChitiet = function(req,res, next){
    var sql = "SELECT * FROM shoe WHERE magiay=" + req.params.id ;
    con.query(sql, function(err, results) {
	    if (err) res.end();
	    console.log(results);
	    if(req.isAuthenticated())
	    {
	    	res.render("single-product", {data:results, user:req.user, logged: true  });
	    }else{
	    	res.render("single-product", {data:results, logged: false  });
	    }
	});
}

module.exports.getRegistration = function(req, res, next) {
    if(req.isAuthenticated())
    {
    	res.render("registration", { message: req.flash('signupMessage'), user:req.user, logged: true  });
    }else{
    	res.render("registration", { message: req.flash('signupMessage'), logged: false  });
    }
};

module.exports.getBlog = function(req, res, next) {
    if(req.isAuthenticated()){
    	res.render("blog", { user:req.user, logged: true  });
    	console.log(req.isAuthenticated());
    }else{
    	res.render("blog", { logged: false  });
    	console.log(req.isAuthenticated());
	}
};

module.exports.getCart = function(req, res, next) {
	if(req.isAuthenticated())
	{
    	res.render("cart", { user:req.user, logged: true  });
	}else{
		res.redirect('/');
    }
};

module.exports.getCheckout =function(req, res, next) {
	if(req.isAuthenticated())
	{
    	res.render("checkout", { user:req.user, logged: true  });
    }else{
    	res.redirect('/');
    }
};

module.exports.getContact = function(req, res, next) {
	if(req.isAuthenticated()){
    	res.render("contact", { user:req.user, logged: true  });
    }else{
    	res.render("contact", { logged: false  });
    }
};

module.exports.getForget = function(req, res, next) {
	res.render('forgetPassword');
};

module.exports.getConfirmation = function(req, res, next) {
	if(req.isAuthenticated()){
    	res.render("confirmation", { user:req.user, logged: true  });
	}else{
    	res.render("confirmation", { logged: false  });
	}
};

module.exports.getLogin = function(req, res, next) {
 	res.render("login", { message:req.flash('loginMessage'), logged: false  });
};

module.exports.getLogout = function(req, res){
	req.logout();
	req.session.isLoggedIn = 0;
	res.redirect('/');
};

module.exports.postLogin = function(req, res) {
	if(req.body.remember){
		req.session.cookie.maxAge = 1000 * 60 * 3;
	}else{
		req.session.cookie.expires = false;
	}
	res.redirect('/login');
};