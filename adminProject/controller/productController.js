var dataconfig = require('../data/db');
const productRepo = require('../models/productRepo');
var con = dataconfig.create;

module.exports.getCategory = async function(req,res, next)
{
	var sql = "SELECT * FROM shoe";
	var brand = req.query.brand || "none";
	var color = req.query.color || "none";

	const results = await productRepo.filter(brand, color);
	console.log(results);

	var page = parseInt(req.query.page) || 1;
    var numItem = 5;

    var begin = (page - 1) * numItem;
    var end = page * numItem;

    if(req.isAuthenticated()){
    	res.render("quan_ly_gian_hang",{ action: "Quản lý gian hàng", user:req.session.user, dsGiay: results.slice(begin, end), curPage: page, brand: brand, color:color });
    }else{
    	res.render("quan_ly_gian_hang",{ action: "Quản lý gian hàng", user:req.session.user, dsGiay: results.slice(begin, end), curPage: page, brand: brand, color:color });
    }

 //    con.query(sql, function(err, results) {
	//     if (err) res.end();
	//     console.log(results);
	//     var page = parseInt(req.query.page) || 1;
	//     var numItem = 6;

	//     var begin = (page - 1) * numItem;
	//     var end = page * numItem;

	//     if(req.isAuthenticated()){
	//     	res.render("category",{data:results.slice(begin, end), curpage:page, brand:brand, color:color, sortby:sortby, user:req.user, logged: true  });
	//     }else{
	//     	res.render("category",{data:results.slice(begin, end), curpage:page, brand:brand, color:color, sortby:sortby, logged: false  });
	//     }
	// });
};

module.exports.postPreviewAvatar = function(req, res, next)
{
	productRepo.upload(req, res, (err) => {
    if(err){
      res.render("changeProductImage", {
        msg: err, action: 'Thay đổi ảnh'});
    } else {
      if(req.file == undefined){
        res.render("changeProductImage", {
          msg: 'Error: No File Selected!', user: req.session.user, action: 'Thay đổi ảnh'});
      } else {
        res.render('changeProductImage', {
          file: `upload/${req.file.filename}`, user: req.session.user, action: 'Thay đổi ảnh'});
      }
    }});
};

module.exports.postAvatar = function(req, res, next)
{
	productRepo.upload(req, res, (err) => {
	    if(err){
	      res.render("addProduct", {
	        msg: err,  action: 'Thêm sản phẩm'});
	  	}
	  	res.render("addProduct", {file: `upload/${req.file.filename}`, user: req.session.user, action: 'Thêm sản phẩm', message: ''});
	});
};