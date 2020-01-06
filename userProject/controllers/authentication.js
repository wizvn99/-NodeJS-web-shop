var dataconfig = require('../data/db');
var con = dataconfig.create;

var Cart = require('../models/cartModel');
var Product = require('../models/productModel')
var HoaDon = require('../models/hoadonModel')
var GiaoDich = require('../models/giaodichModel')

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
    }else{
    	res.render("blog", { logged: false  });
	}
};

module.exports.getCart = function(req, res, next) {
	if(!req.session.cart)
	{
		if(req.isAuthenticated()){
			res.render("cart", { user:req.user, logged: true, products: null });	
		}
		else res.render("cart", { logged: false, products: null });
	}
	let cart = new Cart(req.session.cart);
	if(req.isAuthenticated()){
		res.render("cart", { user:req.user, logged: true, products: cart.generateArray(), totalPrice: cart.totalPrice });
	}
	else res.render("cart", { logged: false, products: cart.generateArray(), totalPrice: cart.totalPrice });
};

module.exports.getCheckout =function(req, res, next) {
	if(req.isAuthenticated())
	{
    	res.render("checkout", { user:req.user, logged: true  });
    }else{
    	res.redirect('/login');
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
    backURL=req.header('Referer') || '/';
 	res.redirect(backURL);
};

module.exports.getClear = function(req, res, next){
	req.session.cart=null
	if(req.session.cart==null)
		res.redirect('/cart')
};

module.exports.postLogin = function(req, res) {
	if(req.body.remember){
		req.session.cookie.maxAge = 1000 * 60 * 3;
	}else{
		req.session.cookie.expires = false;
	}
	res.redirect('/login');
};
module.exports.getAddToCart = function(req, res, next) {
	let productId = req.params.id;
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	Product.singleId(productId).then(rows => {
		cart.add(rows[0], rows[0].magiay);
		req.session.cart = cart;
		console.log(req.session.cart);    
		backURL=req.header('Referer') || '/';
 		res.redirect(backURL);
	})
	.catch(function(err){
		console.log("Loi" + err);
		backURL=req.header('Referer') || '/';
 		res.redirect(backURL);
	});
};
module.exports.postCheckout = function(req, res, next) {
	if(req.isAuthenticated())
	{
		if(!req.session.cart)
			res.redirect('/')
		const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
		const cart = new Cart(req.session.cart);
		const products = cart.generateArray();
		const hoadon = {
			id: req.session.user.id,
			thanhtien: cart.totalPrice,
			ngaythanhtoan: date,
			name: req.param('name'),
			phonenumber: req.param('phonenumber'),
			email: req.param('email'),
			address: req.param('address')
		}
		HoaDon.add(hoadon).then(rows => {
			hoadon.mahoadon = rows.insertId;
			console.log(rows.insertId)
			for(let i=0; i<products.length;i++)
			{
				const giaodich = {
					magiay: products[i].item.magiay,
					soluong: products[i].qty,
					mahoadon: hoadon.mahoadon
				}
				GiaoDich.add(giaodich).then(rows => {})
				.catch(error => console.log(error.message))
			}
			console.log("Đặt hàng thành công!")
			req.session.cart = null
			res.redirect('/confirmation')
		}).catch(error => console.log(error.message))
	}
	else	res.redirect('/login')
}