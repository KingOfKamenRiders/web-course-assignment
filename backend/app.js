const PosterDAO = require("./dao/PosterDAO")
const ResultMessage = require("./util/ResultMessage");
const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser')
const app = express();
var fs = require('fs');
var MySQLStore = require('express-mysql-session');
var connection = require('./DBSingleton')

var pd = new PosterDAO(connection);

var hello = require('./routes/hello');
var user = require('./routes/user')
var poster = require('./routes/poster');
var tag = require('./routes/tag');


app.use(bodyParser.json({limit:'10mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({ limit:'10mb',extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('../dist'));
let options = {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*')
  }
}
app.use(express.static('uploads',options));
app.use(express.static('posters',options));



var sessionStore = new MySQLStore({}/* session store options */, connection);

//会话管理
//将session数据存储在mysql数据库中(使用express-mysql-session)
app.set('trust proxy', 2);

//app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
//没有使用https
app.use(session({
  secret: 'Logan best',
  resave:false,
  saveUninitialized:true,
  cookie: {
    maxAge:1800000,
    httpOnly:true,
    //secure:true,
  },
  store:sessionStore,
}));


app.use('/api/user',user);
app.use('/api/hello',hello);
app.use('/api/poster',poster);
app.use('/api/tag',tag);


app.listen(3000, () => console.log('Example app listening on port 3000!'));

