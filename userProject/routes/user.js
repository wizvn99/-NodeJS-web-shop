var dataconfig = require('../data/db');
var con = dataconfig.create;

module.exports = function(router, passport){
	router.get("/", function getRoot(req,res, next){
	         var sql = "SELECT * FROM shoe ";
	        con.query(sql, function(err, results) {
	        if (err) res.end();
	        if(req.isAuthenticated())
	        {
	        	res.render("index",{ data:results, user:req.user, logged: true });
	        }
	        res.render("index",{data:results , logged: false });
	        });
		}
	);

	router.get("/index.html", function getRoot(req,res, next){
	         var sql = "SELECT * FROM shoe ";
	        con.query(sql, function(err, results) {
	        if (err) res.end();
	        if(req.isAuthenticated()){
	        	res.render("index",{ data:results, user:req.user, logged: true });
	        }
	        res.render("index",{data:results , logged: false });
	        });
		}
	);

	router.get("/category.html", function(req,res, next){
	    var sql = "SELECT * FROM shoe ";
	    con.query(sql, function(err, results) {
	    if (err) res.end();
	    console.log(results);
	    if(req.isAuthenticated()){
	    	res.render("category",{data:results, user:req.user, logged: true  });
	    }
	    res.render("category",{data:results, logged: false  });
		});
	});

	router.get("/chitiet:id", function(req,res, next){
	    var sql = "SELECT * FROM shoe WHERE magiay=" + req.params.id ;
	    con.query(sql, function(err, results) {
	    if (err) res.end();
	    console.log(results);
	    if(req.isAuthenticated())
	    {
	    	res.render("single-product", {data:results, user:req.user, logged: true  });
	    }
	    	res.render("single-product", {data:results, logged: false  });
		});
	});

	router.get('/registration.html', function(req, res, next) {
	    if(req.isAuthenticated())
	    {
	    	res.render("registration", { message: req.flash('signupMessage'), user:req.user, logged: true  });
	    }
	    res.render("registration", { message: req.flash('signupMessage'), logged: false  });
	});

	router.get('/blog.html', function(req, res, next) {
	    if(req.isAuthenticated()){
	    	res.render("blog", { user:req.user, logged: true  });
	    }
	    res.render("blog", { logged: false  });
	});

	router.get('/cart.html', function(req, res, next) {
		if(req.isAuthenticated())
		{
	    	res.render("cart", { user:req.user, logged: true  });
		}
	    res.render("cart", { logged: false  });
	});

	router.get('/checkout.html', function(req, res, next) {
		if(req.isAuthenticated())
		{
	    	res.render("checkout", { user:req.user, logged: true  });
	    }
	    	res.render("checkout", { logged: false  });
	});

	router.get('/contact.html', function(req, res, next) {
		if(req.isAuthenticated()){
	    	res.render("contact", { user:req.user, logged: true  });
	    }
	    	res.render("contact", { logged: false  });
	});

	router.get('/forgetPassword.html', function(req, res, next) {
	  res.render('forgetPassword');
	});

	router.get('/confirmation.html', function(req, res, next) {
		if(req.isAuthenticated()){
	    	res.render("confirmation", { user:req.user, logged: true  });
		}
	    	res.render("confirmation", { logged: false  });
	});

	router.get('/login.html', function(req, res, next) {
	 	res.render("login", { message:req.flash('loginMessage'), logged: true  });
	});

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	//POST

	router.post('/login.html', passport.authenticate('local-login', 
		{
			successRedirect: '/index.html',
			failureRedirect: '/login.html',
			failureFlash: true
		}), 
		function(req, res, next) {
			if(req.body.remember){
				req.session.cookie.maxAge = 1000 * 60 * 3;
			}else{
				req.session.cookie.expires = false;
			}
			res.redirect('/login.html');
		}
	);
}