var express = require('express');

var router = express.Router();

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "db4free.net",
    port: "3306",
    user: "nodejsacc1",
    password: "passwordne123",
    database: "shopshoe"
});


router.get("/",function(req,res){
         var sql = "SELECT * FROM shoe ";
        con.query(sql, function(err, results) {
        if (err) res.end();
        console.log(results);
        res.render("index",{data:results});
        })    
})

router.get("/index.html",function(req,res){
    var sql = "SELECT * FROM shoe ";
   con.query(sql, function(err, results) {
   if (err) res.end();
   console.log(results);
   res.render("index",{data:results});
   })    
})

router.get("/category.html",function(req,res){
    var sql = "SELECT * FROM shoe ";
    con.query(sql, function(err, results) {
    if (err) res.end();
    console.log(results);
    res.render("category",{data:results});
})})

router.get("/chitiet:id",function(req,res){
    var sql = "SELECT * FROM shoe WHERE magiay=" + req.params.id ;
    con.query(sql, function(err, results) {
    if (err) res.end();
    console.log(results);
    res.render("single-product",{data:results});
})})

module.exports = router;