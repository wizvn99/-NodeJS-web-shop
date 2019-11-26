var express = require('express');
var router = express.Router();
var con = require('../db');
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


module.exports = router;