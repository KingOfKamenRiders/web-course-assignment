var express = require('express');
var router = express.Router();
const PosterDAO = require('../dao/PosterDAO');
var connection = require('../DBSingleton');
var pd = new PosterDAO(connection);
const ResultMessage = require('../util/ResultMessage');
const DOMAIN='http://localhost:3000/';

router.post('/',(req,res)=>{
  pd.insertPoster(req.session.cid,req.body,(error,results,fields)=>{
    if(error){
      console.log(error);
      res.send(ResultMessage.WRONG);
    }else{
      res.send(ResultMessage.OK);
    }
  })

});
router.get('/',(req,res)=>{
  pd.getPoster(req.query.path,(result)=>{
    res.send(result[0]);
  })
})

router.get('/allPosters',(req,res)=>{
  let tags = JSON.parse(req.query.tags);
  console.log(tags.length);
  pd.getAllPosters(tags,(error,results,fields)=>{
    if(error){
      console.log(error);
    }else{
      for(let i = 0;i<results.length;i++){
        results[i].path = DOMAIN+results[i].path;
      }
      res.send(results);
    }
  })
})

router.get('/tags',(req,res)=>{
  pd.getPosterTags(req.query.path,(result)=>res.send(result))
})
router.get('/comments',async (req,res)=>{
  let comments = await pd.getPosterComments(req.query.path);
  for(let co of comments){
    let tagss= await pd.getCommentTags(co.user,co.time);
    co.tags = tagss;
  }
  res.send(comments);
})
module.exports = router;
