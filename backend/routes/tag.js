var express = require('express');
var router = express.Router();
var TagDAO = require('../dao/TagDAO');
var PosterDAO = require('../dao/PosterDAO')
var connection = require('../DBSingleton');
var td = new TagDAO(connection);
var pd = new PosterDAO(connection);
const ResultMessage = require('../util/ResultMessage')

router.post('/',(req,res)=>{

  res.send(ResultMessage.OK);
})

router.get('/hotTags',(req,res)=>{
  td.getHotTags((result)=>res.send(result))
})

router.get('/all',(req,res)=>{
  td.getAllTags((result)=>res.send(result));
})

async function sequenceInsert(tag) {
  const value = await td.insertTag(tag);
}
async function sequenceUpdate(tag) {
  await td.updateHeat(tag);
}
async function sequenceInsertPosterTag(path,tag) {
  await pd.insertPosterTag(path,tag);
}
async function sequenceUpdatePosterHeat(path) {
  await pd.updatePosterHeat(path)
}
router.post('/comment',(req,res)=>{

  let {tags,path} = req.body;
  if(tags.length>0){
    for(let i=0;i<tags.length;i++){
      sequenceInsert(tags[i]);
      sequenceUpdate(tags[i]);
      sequenceInsertPosterTag(path,tags[i]);
      sequenceUpdatePosterHeat(path);
    }
  }
  td.insertComment(req.body);
  res.send(ResultMessage.OK);

})
module.exports = router;
