const mysql = require('mysql');
const dbconfig = require('./dbconfig');
//连接数据库
var connection  = mysql.createConnection(dbconfig);
connection.connect((err)=>{
  if(err)
    console.log("can't connect to database, please check your config");
  else
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
