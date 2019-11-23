var express = require("express");
var app = express();
var userRouter = require('./routes/user');
var path = require('path');
// var adminRouter = require('./routes/admin');

app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);

app.listen(process.env.PORT || 3000);

module.exports = app;