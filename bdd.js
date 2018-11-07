let mysql = require('mysql');
let connection = mysql.createConnection({
	host: 'den1.mysql1.gear.host',
	user: 'simplonmi',
	password: 'Jr2h4jQY-P~r',
	database: 'simplonmi'
});
module.exports= connection;