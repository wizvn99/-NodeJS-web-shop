const LocalStrategy = require("passport-local").Strategy;

const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const dbconfig = require('./db');
const con = mysql.createConnection(dbconfig.connection);
con.query('USE shopshoe');

module.exports = function(passport) {
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
	con.query("SELECT * FROM adminUsers WHERE id = ? ", [id],
		function(err, rows){
			done(err, rows[0]);
			console.log(rows);	
		});
	});
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email', passwordField : 'password', passReqToCallback : true}, 
		function(req, email, password, done){
			con.query("SELECT * FROM adminUsers WHERE email = ? ", [email], function(err, rows){
				if(err)
					return done(err)
				if(rows.length)
				{
					return done(null, false, req.flash('signupMessage', 'Email đã tồn tại'));
				}
				else{
					const newUserMysql = {
						email: email,
						password: bcrypt.hashSync(password, null, null)
					};
					const insertQuery = "INSERT INTO adminUsers (email, password) values (?, ?)";
					con.query(insertQuery, [newUserMysql.email, newUserMysql.password],
						function(err, rows){
							newUserMysql.id = rows.insertId;
							console.log(rows);
							return done(null, newUserMysql);
					});
				}
			});
		})
	);



	passport.use('local-login', new LocalStrategy({
		usernameField : 'email', passwordField : 'password', passReqToCallback : true}, 
		function(req, email, password, done){
			con.query("SELECT * FROM adminUsers WHERE email = ? ", [email], function(err, rows){
				if(err)
					return done(err)
				if(!rows.length)
				{
					return done(null, false, req.flash('loginMessage', 'Không tìm thấy email'));
				}
				if(!bcrypt.compareSync(password, rows[0].password))
					return done(null, false, req.flash('loginMessage', 'Sai mật khẩu'));
				return done(null, rows[0]);
			});
		})
	);
}
