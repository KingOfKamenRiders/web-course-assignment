var fs = require('fs');
var path = require('path')

module.exports = class PosterDAO{
  constructor(connection){
    this.connection = connection;
  }
  insertPoster(cid,poster,cb){
    var base64 = poster.poster.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64,'base64');
    let p = `posters/${cid}`;
    if (!fs.existsSync(p))
      fs.mkdirSync(p);
    let today = new Date();
    let filePath = path.resolve(p,poster.title+'-'+today.valueOf()+'.png');
    fs.writeFileSync(filePath,dataBuffer);
    this.connection.query({
      sql:'insert into poster values(?,?,?,?)',
      values:[filePath,cid,poster.title,poster.description],
    },(error,results,fields)=>cb(error,results,fields))
  }

}
