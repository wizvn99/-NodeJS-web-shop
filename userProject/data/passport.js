
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt-nodejs');
const accountRepo = require('../models/accountRepo');
module.exports = function(passport) 
{
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		accountRepo.singleId(id).then(rows => {
			done(null, rows[0]);
		})
		.catch(function(err){
		console.log(err);
		done(err);
		});
	});
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email', passwordField : 'password', passReqToCallback : true}, 
		function(req, email, password, done){
			accountRepo.singleEmail(email).then(rows => {
				if(password.length < 6)
				{
					return done(null, false, req.flash('signupMessage', 'Mật khẩu phải chứa ít nhất 6 kí tự'));
				}
				if(rows.length)
				{
					return done(null, false, req.flash('signupMessage', 'Email đã tồn tại'));
				}
				else{
					const newUserMysql = {
						email: email,
						password: bcrypt.hashSync(password, null, null),
						name: req.param('name'),
						tel: req.param('tel')
					};
					accountRepo.add(newUserMysql).then(rows => {
						newUserMysql.id = rows.insertId;
						return done(null, newUserMysql);
					});
				}
			})
			.catch(function(err){
			console.log(err);
			done(err);
			});
		})
	);



	passport.use('local-login', new LocalStrategy({
		usernameField : 'email', passwordField : 'password', passReqToCallback : true}, 
		function(req, email, password, done){
			accountRepo.singleEmail(email).then(rows =>{
				if(!rows.length)
				{
					console.log('Không tìm thấy email');
					return done(null, false, req.flash('loginMessage', 'Sai email hoặc mật khẩu'));
				}
				if(!bcrypt.compareSync(password, rows[0].password))
				{
					console.log('Sai mật khẩu');
					return done(null, false, req.flash('loginMessage', 'Sai email hoặc mật khẩu'));
				}
				req.session.user = rows[0];
				req.session.isLoggedIn = 1;
				return done(null, rows[0]);
			})
			.catch(function(err){
    		console.log(err);
			done(err);
			});
		})
	);
};
