module.exports = class TagDAO{
  constructor(conn){
    this.connection = conn
  }
  insertTag(tag){
    this.connection.query({
      sql:''
    })
  }
}
