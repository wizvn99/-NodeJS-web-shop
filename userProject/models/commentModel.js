var db = require('../data/db');

exports.add = cmt => {
   	var sql = `insert into binhluan (magiay, ten, binhluan, avatar) values('${cmt.magiayBL}','${cmt.tenBL}', '${cmt.binhluanBL}', '${cmt.avtBL}');`;
    return db.save(sql);
}