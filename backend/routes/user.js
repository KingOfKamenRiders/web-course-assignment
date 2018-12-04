var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const UserDAO = require('../dao/UserDAO');
const connection = require('../DBSingleton');
const ResultMessage = require('../util/ResultMessage');
const multer = require('multer');

var fs = require('fs');
var ud = new UserDAO(connection);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/${req.session.cid}`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({storage:storage});


//处理登陆
router.post('/login',(req,res,next)=>{
  const md5 = crypto.createHash('md5');
  let codedPass = md5.update(req.body.password).digest('hex');
  ud.getUser(req.body.cid,(error,results,fields)=>{
    if(error) {
      console.log('error!:' + error);
      res.send(ResultMessage.WRONG);
    }
    else{
      if(results.length>0&&results[0].password === codedPass){
        console.log(req.session.cid);
        req.session.cid = req.body.cid;

        if(!fs.existsSync(`uploads/${req.session.cid}`)){
          fs.mkdirSync(`uploads/${req.session.cid}`);
        }
        res.send(ResultMessage.OK);
      }
      else
        res.send(ResultMessage.WRONG);
    }
  })
});

router.get('/logout',function (req,res,next) {
  //删除session
  req.session.destroy((err)=>console.log(err));
  res.send(ResultMessage.OK);

});

router.get('/isLoggedIn',function (req,res,next) {
  //删除session
  if(req.session.cid){
    res.send(req.session.cid);
  }else{
    res.send("");
  }
});

//处理注册
router.post('/signUp',(req,res)=>{
  const md5 = crypto.createHash('md5');
  let codedPass = md5.update(req.body.password).digest('hex');
  ud.insertUser({cid:req.body.cid,password:codedPass},
    (error,results,fields)=>{
      if(error) {
        console.log(error);
        res.send(ResultMessage.WRONG);
      }
      else{
        req.session.cid = req.body.cid;
        if(!fs.existsSync(`uploads/${req.session.cid}`)){
          fs.mkdirSync(`uploads/${req.session.cid}`);
        }
        res.send(ResultMessage.OK);
      }
    })
});

router.post('/uploadImg',upload.array('hero',9),(req,res)=>{
  console.log(req.session.cid);
  res.send(ResultMessage.OK);
});

router.get('/myHeroes',(req,res)=>{
  if(!fs.existsSync(`uploads/${req.session.cid}`)) {
    res.send([]);
  }else{
    let list = fs.readdirSync(`uploads/${req.session.cid}`);
    for(let i = 0;i<list.length;i++)
      list[i] = `http://localhost:3000/${req.session.cid}/` + list[i];
    res.send(list);
  }
})
module.exports = router;
