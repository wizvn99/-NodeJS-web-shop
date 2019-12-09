var dataconfig = require('../data/db');
var con = dataconfig.create;

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
		if(sortby == "giagiam") sql = sql + "ORDER BY giamoi DESC";
		if(sortby == "giatang") sql = sql + "ORDER BY giamoi ASC";
		if(sortby == "soluongtang") sql = sql + "ORDER BY soluong ASC";
		if(sortby == "soluonggiam") sql = sql + "ORDER BY soluong DESC";
		if(sortby == "a-z") sql = sql + "ORDER BY tengiay ASC";
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