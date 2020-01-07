const db = require('../data/db');

exports.PhanTach = function(text)
{
    return new Promise(function(resolve, reject) {
       var dataBrand = "none";
		var dataColor = "none";
		const tokens = text.split(" ");

		db.create.query("SELECT * FROM shoe", function(err, results) {
			    if (err) reject(err);
			    tokens.forEach(token => {
			    	console.log(token);
			    	results.forEach(item => {
			    		if(token.toUpperCase() === item.mau && dataColor === "none"){
			    			console.log(item.mau);
			    			dataColor = item.mau;
			    		}
			    		if(token.toUpperCase() === item.nhanhieu && dataBrand === "none")
			    		{
			    			console.log(item.nhanhieu);
			    			dataBrand = item.nhanhieu;
			    			console.log(dataBrand);
			    		}
			    	})});
			    resolve({dataBrand, dataColor});
			})
		});
}