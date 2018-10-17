const UserDAO = require( "./dao/UserDAO");
const ResultMessage = require("./util/ResultMessage");
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const dbconfig = require('./dbconfig');
const mysql = require('mysql');
const app = express();

app.use(express.static('../dist'));
app.use(session({
  secret: 'Logan best',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//连接数据库
var connection  = mysql.createConnection(dbconfig);
connection.connect((err)=>{
  if(err)
    console.log("can't connect to database, please check your config");
  else
    console.log('connected as id ' + connection.threadId);
})

//处理登陆
app.get('/api/login',(req,res)=>{
  let ud = new UserDAO(connection);
  const md5 = crypto.createHash('md5');
  let codedPass = md5.update(req.query.password).digest('hex');
  ud.getUser(req.query.cid,(error,results,fields)=>{
      if(error) {
        console.log('error!:' + error);
        res.send(ResultMessage.WRONG);
      }
      else{
        if(results.length>0&&results[0].password === codedPass){
          req.session.cid = req.query.cid;
          res.send(ResultMessage.OK);
        }
        else
          res.send(ResultMessage.WRONG);
      }
  })
})

//处理注册
app.get('/api/signUp',(req,res)=>{
  let ud = new UserDAO(connection);
  const md5 = crypto.createHash('md5');
  let codedPass = md5.update(req.query.password).digest('hex');
  ud.insertUser({cid:req.query.cid,password:codedPass},
    (error,results,fields)=>{
    if(error) {
      console.log(error);
      res.send(ResultMessage.WRONG);
    }
    else{
      req.session.cid = req.query.cid;
      res.send(ResultMessage.OK);
    }
  })
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))

