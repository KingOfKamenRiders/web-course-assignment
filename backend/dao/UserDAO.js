module.exports = class UserDAO{
  constructor(connection){
    this.con = connection;
  }
  getUser(id,callback){
    this.con.query({
      sql:'select * from `user` where `cid` = ?',
      values:[id],

    }, (error,results,fields)=>callback(error,results,fields))
  }
  insertUser(user,callback){
    this.con.query({
      sql:'insert into user(`cid`,`password`) values(?,?)',
      values:[user.cid,user.password]
    },(error,results,fields)=> callback(error,results,fields))
  }
}
