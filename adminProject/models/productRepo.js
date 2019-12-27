const db = require('../data/db');

exports.loadAll = () => {
	const sql=`select * from shoe`;
	return db.load(sql);
}

exports.add = giay => {
    const sql = `insert into shoe(magiay, anh, tengiay, soluong, nhanhieu, mau, giacu, giamoi) VALUES('${giay.magiay}', '${giay.anh}', '${giay.tengiay}', '${giay.soluong}', '${giay.nhanhieu}', '${giay.mau}', ${giay.giacu}, ${giay.giamoi});`;
    return db.save(sql);
}


exports.update = giay => {
	const sql=`update shoe set name='${user.name}', password='${user.password}', email='${user.email}', tel=${user.tel} where id=${user.id};`;
	return db.save(sql);
}

exports.delete = (magiay) => {
	const sql=`delete from shoe where magiay='${magiay}';`;
	return db.save(sql);
}

exports.singleId = (magiay) => {
    var sql = `select * from shoe where magiay=${magiay};`;
    return db.load(sql);
}