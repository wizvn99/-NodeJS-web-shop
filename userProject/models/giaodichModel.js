const db = require('../data/db');

exports.loadAll = () => {
	const sql=`select * from giaodich`;
	return db.load(sql);
}

exports.add = giaoDich => {
	
    const sql = `insert into shoe(magiay, id, ngay) VALUES('${giay.magiay}', '${giay.anh}', '${giay.tengiay}', '${giay.soluong}', '${giay.nhanhieu}', '${giay.mau}', ${giay.giacu}, ${giay.giamoi});`;
    return db.save(sql);
}