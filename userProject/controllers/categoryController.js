var dataconfig = require('../data/db');
var con = dataconfig.create;
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

module.exports.getCategory = function(req,res, next)
{
	var sql = "SELECT * FROM shoe";
	var brand = req.query.brand || "none";
	var color = req.query.color || "none";
	var sortby = req.query.sortby || "none";
	var check = 0;
	if(brand != "none") 
	{
		sql = sql + " WHERE nhanhieu = '" + brand + "'";
		check = 1;
	}

	if(color != "none")
	{
		if(check == 0)
		{
			sql = sql + " WHERE mau = '" + color + "'";
		}
		else
		{
			sql = sql + " AND mau = '" + color + "'";
		}
	}

	if(sortby != "none")
	{
		if(sortby == "giagiam") sql = sql + " ORDER BY giamoi DESC";
		if(sortby == "giatang") sql = sql + " ORDER BY giamoi ASC";
		if(sortby == "soluongtang") sql = sql + " ORDER BY soluong ASC";
		if(sortby == "soluonggiam") sql = sql + " ORDER BY soluong DESC";
		if(sortby == "a-z") sql = sql + " ORDER BY tengiay ASC";
	}

    con.query(sql, function(err, results) {
	    if (err) res.end();
	    console.log(results);
	    var page = parseInt(req.query.page) || 1;
	    var numItem = 6;

	    var begin = (page - 1) * numItem;
	    var end = page * numItem;

	    if(req.isAuthenticated()){
	    	res.render("category",{data:results.slice(begin, end), curpage:page, brand:brand, color:color, sortby:sortby, user:req.user, logged: true  });
	    }else{
	    	res.render("category",{data:results.slice(begin, end), curpage:page, brand:brand, color:color, sortby:sortby, logged: false  });
	    }
	});
};

//post

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