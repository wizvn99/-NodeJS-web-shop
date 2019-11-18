var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

app.listen(3000);
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "shopshoe"
});


app.get("/",function(req,res){
         var sql = "SELECT * FROM shoe ";
        con.query(sql, function(err, results) {
        if (err) res.end();
        console.log(results);
        res.render("index",{data:results});
        })    
})

app.get("/index.html",function(req,res){
    var sql = "SELECT * FROM shoe ";
   con.query(sql, function(err, results) {
   if (err) res.end();
   console.log(results);
   res.render("index",{data:results});
   })    
})

app.get("/category.html",function(req,res){
    var sql = "SELECT * FROM shoe ";
    con.query(sql, function(err, results) {
    if (err) res.end();
    console.log(results);
    res.render("category",{data:results});
})})

app.get("/chitiet:id",function(req,res){
    var sql = "SELECT * FROM shoe WHERE magiay=" + req.params.id ;
    con.query(sql, function(err, results) {
    if (err) res.end();
    console.log(results);
    res.render("single-product",{data:results});
})})