var db = require('../data/db');

exports.loadAll = () => {
	var sql=`select email from adminUsers`;
	return db.load(sql);
}

exports.add = user => {
    var sql = `insert into adminUsers(email, password, name, tel) values('${user.email}', '${user.password}', '${user.name}', '${user.tel}');`;
    return db.save(sql);
}

exports.login = user => {
	var sql=`select * from adminUsers where email='${user.email}' and password='${user.password}';`;
	return db.load(sql);
}

exports.update = user => {
	var sql=`update adminUsers set name='${user.name}' where id=${user.id};`;
	return db.save(sql);
}

exports.singleId = (id) => {
    var sql = `select * from adminUsers where id=${id};`;
    return db.load(sql);
}

exports.singleEmail = (email) => {
    var sql = `select * from adminUsers where email='${email}';`;
    return db.load(sql);
}