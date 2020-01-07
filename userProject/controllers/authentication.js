const randomstring = require('randomstring');
const bcrypt = require('bcrypt-nodejs');
var dataconfig = require('../data/db');
var con = dataconfig.create;

const accountRepo = require('../models/accountRepo');
const mailer = require('../models/mailer');
var Cart = require('../models/cartModel');
var Product = require('../models/productModel')
var HoaDon = require('../models/hoadonModel')
var GiaoDich = require('../models/giaodichModel')
const commentModel = require('../models/commentModel');
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
	var sql = "SELECT s.* FROM shoe s  WHERE s.magiay=" + req.params.id;
	var sqlSPLQ = "Select DISTINCT s1.* from shoe as s1, giaodich as gd1,giaodich as gd2 where gd1.mahoadon=gd2.mahoadon and (gd1.magiay != gd2.magiay and s1.magiay = gd2.magiay) and gd1.magiay =" + req.params.id;
	var sqlBL = "SELECT b.* FROM binhluan as b  WHERE b.magiay=" + req.params.id  + " ORDER BY b.mabinhluan DESC";
    con.query(sql, function(err, results) {
	    if (err) res.end();
		console.log(results);
		var page = parseInt(req.query.page) || 1;
	    var numItem = 4;

	    var begin = (page - 1) * numItem;
	    var end = page * numItem;
	    if(req.isAuthenticated())
	    {	
			
			con.query(sqlSPLQ,function(err2,resultsSPLQ){
			con.query(sqlBL,function(err1,resultsBL){
					
	    	res.render("single-product", {data:results,dataSPLQ:resultsSPLQ,dataBL:resultsBL.slice(begin, end), curpage:page, user:req.user, logged: true  });});});
	    }else{
			con.query(sqlSPLQ,function(err2,resultsSPLQ){
					
			con.query(sqlBL,function(err1,resultsBL){
				console.log(resultsSPLQ);
	    	res.render("single-product", {data:results,dataSPLQ:resultsSPLQ,dataBL:resultsBL.slice(begin, end), curpage:page, logged: false  });});});
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
	res.render("forgetPassword", { logged: false  });
};

module.exports.getResetPassword = async function(req, res, next) {
	const userid = req.query.id;
	const tokenstring = req.query.token;

	const user = await accountRepo.singleId(userid);
	
	console.log(userid);
	console.log(user[0].token);
	console.log(tokenstring);

	if(user[0].token == tokenstring) {
		await accountRepo.updateActive(user[0]);
		res.render("resetpassword", { logged: false, rels: 'success', id: userid });
	}
	else
	{
		res.render("resetpassword", { logged: false, rels: 'fail'  });
	}
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
module.exports.postChitiet = function(req,res){
	var newSQL;
	if(req.isAuthenticated())
	{
	newSQL={
	magiayBL : req.params.id,
	tenBL : req.session.user.name,
	binhluanBL : req.body.message,
	avtBL : req.session.user.avatar
	};
	}
	else 
	{
		newSQL={
	magiayBL : req.params.id,
	tenBL : req.body.name,
	binhluanBL : req.body.message,
	avtBL : "/upload/no-avatar.png"
		};
	};
	commentModel.add(newSQL).then(result =>{
		res.redirect('/chitiet' + req.params.id);
	})
	
};

module.exports.postVerify = async function(req, res, next) {
	const userid = req.query.id;
	const tokenstring = req.query.token;

	const user = await accountRepo.singleId(userid);
	
	console.log(userid);
	console.log(user[0].token);
	console.log(tokenstring);

	if(user[0].token == tokenstring) {
		await accountRepo.updateActive(user[0]);
		res.render('verify',{msg: "Khích hoạt thành công", logged: false});
	}
	else
	{
		res.render('verify',{msg: "Khích hoạt thất bại", logged: false});
	}
};

module.exports.postForget = async function(req, res, next) {
	const useremail = req.param('email');
	console.log(useremail);
	const user = await accountRepo.singleEmail(useremail);
	console.log(user[0]);
	if(user[0].active == 0)
	{
		res.render('forgetPassword',{msg: "Tài khoản này chưa khích hoạt", logged: false});
	}
	else
	{
		const secrettoken = randomstring.generate(); 

		const tokenUser = {
			id: user[0].id,
			token: secrettoken
		}

		await accountRepo.updateToken(tokenUser);

		const html = `Xin chào,
		<br/>
		Yasuo shop gửi bạn link để reset mật khẩu, không nên chia sẻ link cho người khác.
		<br/><br/>
		Bấm vào link này để reset mật khẩu: <a href="https://shopshoeyasuo.herokuapp.com/resetpassword?id=${tokenUser.id}&token=${tokenUser.token}">https://shopshoeyasuo.herokuapp.com/resetpassword?id=${tokenUser.id}&token=${tokenUser.token}</a>`;

		await mailer.sendmail('nhommuoilam@gmail.com', user[0].email, 'Mail reset mật khẩu (Yasuo Shop)', html);

		res.render('forgetPassword',{msg: "Đã gửi mail reset mật khẩu đến địa chỉ email", logged: false});
	}
};

module.exports.postResetPassword = async function(req, res, next) {
	const userid = req.query.id;
	const newpassword = req.param('newpassword');

	console.log(userid);
	console.log(newpassword);

	const passwordBundle = {
		id: userid,
		password: bcrypt.hashSync(newpassword, null, null)
	}

	await accountRepo.updatePassword(passwordBundle);
	res.render('resetpassword',{ rels: 'done', logged: false});
}
