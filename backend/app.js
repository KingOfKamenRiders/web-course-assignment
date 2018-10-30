const UserDAO = require( "./dao/UserDAO");
const ResultMessage = require("./util/ResultMessage");
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const dbconfig = require('./dbconfig');
const mysql = require('mysql');
const multer = require('multer');
const app = express();
var fs = require('fs');




app.use(express.static('../dist'));
let options = {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*')
  }
}
app.use(express.static('uploads',options));
app.set('trust proxy', 1);
app.use(session({
  secret: 'Logan best',
  resave:false,
  saveUninitialized:true,
  cookie: {
    originalMaxAge: 100000,
    maxAge:1800000,
  }
}));
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/${req.session.cid}`)
  },
    filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({storage:storage});


//连接数据库
var connection  = mysql.createConnection(dbconfig);
connection.connect((err)=>{
  if(err)
    console.log("can't connect to database, please check your config");
  else
    console.log('connected as id ' + connection.threadId);
})

//处理登陆
app.get('/api/login',(req,res,next)=>{
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
          console.log(req.session.cid);
          req.session.cid = req.query.cid;

          if(!fs.existsSync(`uploads/${req.session.cid}`)){
            fs.mkdirSync(`uploads/${req.session.cid}`);
          }
          res.send(ResultMessage.OK);
        }
        else
          res.send(ResultMessage.WRONG);
      }
  })
})
app.get('/api/hello', function(req, res, next) {
  if (req.session.counter) {
    req.session.counter++
    res.send(req.session.counter.toString());
  } else {
    req.session.counter = 1
    res.send('welcome to the session demo. refresh!')
  }
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
      if(!fs.existsSync(`uploads/${req.session.cid}`)){
        fs.mkdirSync(`uploads/${req.session.cid}`);
      }
      res.send(ResultMessage.OK);
    }
  })
})

app.post('/api/uploadImg',upload.array('hero',9),(req,res)=>{
  console.log(req.session.cid);
  res.send(ResultMessage.OK);
})

app.get('/api/myHeroes',(req,res)=>{
    if(!fs.existsSync(`uploads/${req.session.cid}`)) {
      res.send([]);
    }else{
      let list = fs.readdirSync(`uploads/${req.session.cid}`);
      for(let i = 0;i<list.length;i++)
        list[i] = `http://localhost:3000/${req.session.cid}/` + list[i];
      res.send(list);
    }

})
app.listen(3000, () => console.log('Example app listening on port 3000!'))

