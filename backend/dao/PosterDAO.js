var fs = require('fs');
var path = require('path')

module.exports = class PosterDAO{
  constructor(connection){
    this.connection = connection;
  }
  insertPoster(cid,poster,cb){
    var base64 = poster.poster.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64,'base64');
    let p = `${cid}`;
    if (!fs.existsSync('posters/'+p))
      fs.mkdirSync('posters/'+p);
    let today = new Date();
    let storePath = path.posix.join(p,cid+'-'+today.valueOf()+'.png');
    console.log(storePath);
    let filePath = path.resolve('posters',storePath);
    console.log(filePath);
    fs.writeFileSync(filePath,dataBuffer);
    this.connection.query({
      sql:'insert into poster(path,auther,title,description,time) values(?,?,?,?,?)',
      values:[storePath,cid,poster.title,poster.description,today],
    },(error,results,fields)=>cb(error,results,fields))
  }

  getAllPosters(tags,cb){
    let sql = 'select path,auther,title,DATE_FORMAT(`time`,\'%Y-%m-%d %H:%i:%S\') as time,description,heat   from poster ';
    if(tags&&tags.length>0){
      sql += ' where path in( ';
      let subq = 'select distinct(path) from poster_tag where ';
      for(let i = 0;i<tags.length; i++){
        if(i>0)
          subq += ' or '
        subq += `tag = '${tags[i].content}'`;
      }
      sql += subq;
      sql += ')';
    }
    sql += ' order by heat desc'
    console.log(sql);
    this.connection.query({
      sql:sql,
    },(error,results,fields)=>cb(error,results,fields))
  }
  getPoster(path,cb){
    this.connection.query({
      sql:'select * from poster where path=?',
      values:[path]
    },(error,results,fields)=>{
      if(error)
        console.log(error);
      else
        cb(results);
    })
  }
  insertPosterTag(path,tag){
    return new Promise((resolve => {
      this.connection.query(
        {
          sql:'insert into poster_tag(path,tag) values(?,?)',
          values:[path,tag.content]
        },(error,results,fields)=>{
          if(error)
            console.log(error);
          resolve(results);}
      )
    }))
  }
  updatePosterHeat(path){
    return new Promise((resolve => {
      this.connection.query({
        sql:'update poster set heat = heat + 1 where path=?',
        values:[path]
      },(error,results,fields)=>{
        if(error)
          console.log(error);
        resolve(results);
      })
    }))
  }
  getPosterTags(path,cb){
    this.connection.query({
      sql:'select distinct(tag) from poster,poster_tag where poster.path=? and poster_tag.path=?',
      values:[path,path]
    },(error,results,fields)=>{
      if(error)
        console.log(error);
      cb(results);
    })
  }
  getPosterComments(path){
    return new Promise((resolve => {
      this.connection.query({
        sql:'select * from comment where path = ?',
        values:[path]
      },(error,results)=>resolve(results))
    }))
  }
  getCommentTags(user,time){
    return new Promise(resolve => {
      this.connection.query({
        sql:'select tag from comment_tag where user=? and time=?',
        values:[user,time]
      },(error,results)=>resolve(results))
    })
  }
}
