const db = require('../data/db');

exports.loadAll = () => {
	const sql=`select * from hoadon`;
	return db.load(sql);
}

exports.add = hoaDon => {
    const sql = `insert into hoadon(id, thanhtien, ngaythanhtoan) VALUES(${hoaDon.id}, ${hoaDon.thanhtien}, '${hoaDon.ngaythanhtoan}');`;
    return db.save(sql);
}

exports.checkInDelivery = id => {
	const sql=`update hoadon set tinhtranggiao=1 where mahoadon=${id};`;
	return db.save(sql);
}