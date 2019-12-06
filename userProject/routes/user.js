var authControl = require('../controllers/authentication');


module.exports = function(router, passport){
	router.get("/", function(req, res, next){ authControl.getRoot(req, res, next) });

	router.get("/index", function(req, res, next){ authControl.getRoot(req, res, next) });

	router.get("/category", function(req, res, next){ authControl.getCategory(req, res, next) });

	router.get("/chitiet:id", function(req, res, next){ authControl.getCategory(req, res, next) });

	router.get('/registration', function(req, res, next){ authControl.getRegistration(req, res, next) });

	router.get('/blog', function(req, res, next){ authControl.getBlog(req, res, next) });

	router.get('/cart', function(req, res, next){ authControl.getCart(req, res, next) });

	router.get('/checkout',function(req, res, next){ authControl.getCheckout(req, res, next) });

	router.get('/contact', function(req, res, next){ authControl.getContact(req, res, next) });

	router.get('/forgetPassword', function(req, res, next){ authControl.getForget(req, res, next) });

	router.get('/confirmation', function(req, res, next){ authControl.getConfirmation(req, res, next) });

	router.get('/login', function(req, res, next){ authControl.getLogin(req, res, next) });

	router.get('/logout', function(req, res, next){ authControl.getLogout(req, res) });

	//POST

	router.post('/login', passport.authenticate('local-login', 
		{
			successRedirect: '/index',
			failureRedirect: '/login',
			failureFlash: true
		}), function(req, res) { authControl.postLogin(req, res) });

	router.post('/registration', passport.authenticate('local-signup', {
		successRedirect: '/index',
		failureRedirect: '/registration',
		failureFlash: true
	}));
};