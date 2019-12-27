const accountRepo = require('../models/accountRepo');
const productRepo = require('../models/productRepo');
const accountUsersRepo = require('../models/accountUsersRepo');
const bcrypt = require('bcrypt-nodejs');

module.exports = function(router, passport){
	router.get('/', function(req, res, next) {
		res.render('admin_login', { message:req.flash('loginMessage')});
	});

	router.get('/signup', isSuperAdmin, function(req, res){
		res.render('signup', {message: req.flash('signupMessage')});
	});

	router.get('/index', isLoggedIn, function(req, res, next) {
		res.render('index', { action: "Điều khiển", user:req.session.user });
	});

	router.get('/quan_ly_gian_hang', isLoggedIn, function(req, res, next) {
		productRepo.loadAll().then(rows => {
			const page = parseInt(req.query.page) || 1;
			const perPage = 5;
			let start = (page - 1) * perPage;
			let end = page * perPage;
			res.render('quan_ly_gian_hang', { action: "Quản lý gian hàng", user:req.session.user, dsGiay: rows.slice(start, end), curPage: page });	
		})
	});

	router.get('/profile', isLoggedIn, function(req, res, next) {
	  res.render('profile', { action: "Profile", user:req.session.user });
	});

	router.get('/quan_ly_admin', isSuperAdmin, function(req, res, next) {
		accountRepo.loadAll().then(rows => {
			const page = parseInt(req.query.page) || 1;
			const perPage = 5;
			let start = (page - 1) * perPage;
			let end = page * perPage;
			res.render('quan_ly_admin', { action: "Quản lý Admin", user:req.session.user, users: rows.slice(start, end), curPage: page });	
		})
	});

	router.get('/quan_ly_account', isLoggedIn, function(req, res, next) {
		accountUsersRepo.loadAll().then(rows => {
			const page = parseInt(req.query.page) || 1;
			const perPage = 5;
			let start = (page - 1) * perPage;
			let end = page * perPage;
			res.render('quan_ly_account', { action: "Quản lý người dùng", user:req.session.user, users: rows.slice(start, end), curPage: page });	
		})
	});

	router.get('/quan_ly_don_hang', isLoggedIn, function(req, res, next) {
	  res.render('quan_ly_don_hang', {  action: "Quản lý đơn hàng", user:req.session.user });
	});

	router.get('/thong_ke', isLoggedIn, function(req, res, next) {
	  res.render('thong_ke', { action: "Thống kê", user:req.session.user });
	});

	router.get('/chinh_sua_profile', isLoggedIn, function(req, res, next) {
	  res.render('chinh_sua_profile', { action: "Chỉnh sửa profile", user:req.session.user });
	});

	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	router.get('/quan_ly_account/delete/:id', isLoggedIn, function(req, res){
		accountUsersRepo.stt(req.params.id).then(result =>{
			if (result.affectedRows)
				res.redirect('/quan_ly_account');
		})
	});

	router.get('/quan_ly_admin/delete/:id', isSuperAdmin, function(req, res){
		accountRepo.stt(req.params.id).then(result =>{
			if (result.affectedRows)
				res.redirect('/quan_ly_admin');
		})
	});

	// router.get('/quan_ly_gian_hang/delete/:magiay',isLoggedIn, function(req, res){
	// 	productRepo.delete(req.params.magiay).then(result =>{
	// 		if (result.affectedRows)
	// 			res.redirect('/quan_ly_gian_hang');
	// 	})
	// });
	// router.get('/quan_ly_gian_hang/update/:magiay', function(req, res, next){
	// 	res.render('updateProduct', { action: "Chỉnh sửa sản phẩm", user:req.session.user, magiay:req.params.magiay });
	// });

	//Post

	router.post('/', passport.authenticate('local-login', 
		{
			successRedirect: '/index',
			failureRedirect: '/',
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

	router.post('/signup', function(req, res){
		const passwordField = req.param('password');
		const emailField = req.param('email');
		const user = {
			email: emailField,
			password: bcrypt.hashSync(passwordField, null, null),
			name: req.param('name'),
			tel: req.param('tel')
		};
		accountRepo.singleEmail(emailField).then(result => {
			if(passwordField.length < 6)
			{
				req.flash('signupMessage', 'Mật khẩu phải chứa ít nhất 6 kí tự');
				res.redirect('/signup');
			}
			if(result.length)
			{
				req.flash('signupMessage', 'Email đã tồn tại');
				res.redirect('/signup');
			}
			else{
					accountRepo.add(user).then(rows => {
					if (rows.length > 0) 
					{
	                	req.session.user=rows[0];
	                	res.redirect('/quan_ly_account');
	                }
	            });
			};
		});
	});

	router.post('/chinh_sua_profile', function(req, res){
		const user = {
			id: req.session.user.id,
			email: req.param('email'),
			password: bcrypt.hashSync(req.param('password'), null, null),
			name: req.param('name'),
			tel: req.param('tel')
		};
		accountRepo.update(user).then(value => {
	        accountRepo.singleId(user.id).then(rows => {
	            if (rows.length > 0) {
	                req.session.user=rows[0];
	                res.redirect('/profile');
	            }
	        });
    	});

	});

	router.post('/quan_ly_gian_hang/update/:magiay', function(req, res, next){
		const giay = {
			magiay: req.param.magiay,
			anh: req.param('anh'),
			tengiay: req.param('tengiay'),
			soluong: req.param('soluong'),
			nhanhieu: req.param('nhanhieu'),
			mau: req.param('mau'),
			giacu: req.param('giacu'),
			giamoi: req.param('giamoi'),
		};
		productRepo.update(giay).then(value => {
	        productRepo.singleId(giay.magiay).then(rows => {
	            if (rows.length > 0) {
	                res.redirect('/quan_ly_gian_hang');
	            }
	        });
    	});
	});
}
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}
function isSuperAdmin(req, res, next){
	if(req.session.isSuperAdmin == true)
	{
		return next();
	}
	res.redirect('/index');
}