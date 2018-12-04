const DUPLICATED = 'ER_DUP_ENTRY';

module.exports = class TagDAO{
  constructor(conn){
    this.connection = conn
  }
  insertTag(tag){
    return new Promise((resolve => {
      console.log(tag.content);
      this.connection.query({
          sql:'insert into tag values(?,?)',
          values:[tag.content,0],
        },(error,results,fields)=>{
          resolve(results);
        }
      )
    }))
  }
  updateHeat(tag){
    return new Promise((resolve => {
      this.connection.query({
          sql:'update tag set heat = heat + 1 where content = ?',
          values:[tag.content],
        },(error,results,fields)=>{
          resolve(results);
        }
      )
    }))
  }

  insertCommentMainPart(comm,today){
    return new Promise((resolve => {
      let {rate,user,comment,path} = comm;
      this.connection.query({
        sql:'insert into comment values(?,?,?,?,?)',
        values:[path,user,rate,comment,today],
      },(error,results,fields)=>{
        if(error)
          console.log(error);
        resolve(results);})
    }))
  }

  insertCommentTag_sub(tag,user,time){
    return new Promise(resolve => {
      this.connection.query(
        {
          sql:'insert into comment_tag values(?,?,?)',
          values:[user,time,tag.content]
        },(error,results,fields)=>{
          if(error)
            console.log(error);
          resolve(results)}
      )
    })
  }

  async insertComment(comm){
    let today = new Date();
    let {tags,user} = comm;
    await this.insertCommentMainPart(comm,today);
    console.log('main part inserted');
    for (let tag of tags){
      await this.insertCommentTag_sub(tag,user,today);
    }
  }
  getHotTags(cb){
    this.connection.query({
      sql:'select content from tag order by heat desc limit 10',
    },(error,result,fields)=>{
      cb(result);
    })
  }
  getAllTags(cb){
    this.connection.query({
      sql:'select * from tag order by heat desc '
    },(error,result,fields)=>cb(result))
  }
}
