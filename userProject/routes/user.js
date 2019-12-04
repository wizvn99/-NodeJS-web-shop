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
		        }else{
		        	res.render("index",{data:results , logged: false });
		        }
	        });
		}
	);

	router.get("/index.html", function getRoot(req,res, next){
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
		}
	);
	router.get("/category.html", function(req,res, next){
	    var sql = "SELECT * FROM shoe ";
	    con.query(sql, function(err, results) {
		    if (err) res.end();
		    console.log(results);
		    if(req.isAuthenticated()){
		    	res.render("category",{data:results, user:req.user, logged: true  });
		    }else{
		    	res.render("category",{data:results, logged: false  });
		    }
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
		    }else{
		    	res.render("single-product", {data:results, logged: false  });
		    }
		});
	});

	router.get('/registration.html', function(req, res, next) {
	    if(req.isAuthenticated())
	    {
	    	res.render("registration", { message: req.flash('signupMessage'), user:req.user, logged: true  });
	    }else{
	    	res.render("registration", { message: req.flash('signupMessage'), logged: false  });
	    }
	});

	router.get('/blog.html', function(req, res, next) {
	    if(req.isAuthenticated()){
	    	res.render("blog", { user:req.user, logged: true  });
	    	console.log(req.isAuthenticated());
	    }else{
	    	res.render("blog", { logged: false  });
	    	console.log(req.isAuthenticated());
		}
	});

	router.get('/cart.html', function(req, res, next) {
		if(req.isAuthenticated())
		{
	    	res.render("cart", { user:req.user, logged: true  });
		}else{
	    	res.render("cart", { logged: false  });
	    }
	});

	router.get('/checkout.html', function(req, res, next) {
		if(req.isAuthenticated())
		{
	    	res.render("checkout", { user:req.user, logged: true  });
	    }else{
	    	res.render("checkout", { logged: false  });
	    }
	});

	router.get('/contact.html', function(req, res, next) {
		if(req.isAuthenticated()){
	    	res.render("contact", { user:req.user, logged: true  });
	    }else{
	    	res.render("contact", { logged: false  });
	    }
	});

	router.get('/forgetPassword.html', function(req, res, next) {
	  res.render('forgetPassword');
	});

	router.get('/confirmation.html', function(req, res, next) {
		if(req.isAuthenticated()){
	    	res.render("confirmation", { user:req.user, logged: true  });
		}else{
	    	res.render("confirmation", { logged: false  });
		}
	});

	router.get('/login.html', function(req, res, next) {
	 	res.render("login", { message:req.flash('loginMessage'), logged: false  });
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
		function(req, res) {
			if(req.body.remember){
				req.session.cookie.maxAge = 1000 * 60 * 3;
			}else{
				req.session.cookie.expires = false;
			}
			res.redirect('/login.html');
		}
	);
	router.post('/registration.html', passport.authenticate('local-signup', {
		successRedirect: '/index.html',
		failureRedirect: '/registration.html',
		failureFlash: true
	}));
};
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/hehehe');
}