var express = require('express');
var router = express.Router();
var con = require('../data/db');
var controller = require('../controllers/controller');

router.get("/", controller.getRoot);

router.get("/index.html", controller.getRoot);

router.get("/category.html", controller.getCategory);

router.get("/chitiet:id", controller.getChiTiet);

router.get('/registration.html', controller.getRegis);

router.get('/blog.html', controller.getBlog);

router.get('/cart.html', controller.getCart);

router.get('/checkout.html', controller.getCheckout);

router.get('/contact.html', controller.getContact);

router.get('/forgetPassword.html', controller.getForgetPassword);

router.get('/login.html', controller.getLogin);

router.get('/confirmation.html', controller.getConfirmation);

router.get('/registrationOK', controller.postRegis);

module.exports = router;
module.exports = function(router, passport){
    router.post('/login', passport.authenticate('local-login', 
		{
			successRedirect: '/loginOK',
			failureRedirect: '/login',
			failureFlash: true
		}), 
		function(req, res) {
			if(req.body.remember){
				req.session.cookie.maxAge = 1000 * 60 * 3;
			}else{
				req.session.cookie.expires = false;
			}
			res.redirect('/');
		}
	);

	router.post('/registration', passport.authenticate('local-signup', {
		successRedirect: '/index',
		failureRedirect: '/registration',
		failureFlash: true
	}));
}

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}