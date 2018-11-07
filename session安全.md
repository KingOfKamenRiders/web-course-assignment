#Session安全措施

>对session管理中安全性保障的一点简要说明

```
  //会话管理
  //将session数据存储在mysql数据库中(使用express-mysql-session)
  app.set('trust proxy', 1);
  app.use(session({
    secret: 'Logan best',
    resave:false,
    saveUninitialized:true,
    cookie: {
      originalMaxAge: 100000,
      maxAge:1800000,
      httpOnly:true,
      secure:true,
    },
    store:sessionStore,
  }));
   ```
##sessionid的生成
sessionid的生成采用express-session中间件自带的[uid-safe](https://www.npmjs.com/package/uid-safe)实现，生成随机的长字符串，秘钥使用"Logan
 best"字符串，使得sessionid高度随机，不易被暴力求解或猜出
 
##对cookie的处理
* 设置httpOnly属性为true,可以防止客户端脚本访问这个Cookie
* 更改sessionid的的cookie名称：使用express-session中间件默认的名称是connect.id，很容易被猜出来 
* 设置cookie的secure属性为true,可以通过https加密传输，降低被破解的可能性
* 设置cookie的时效，一段时间以后用户再次访问页面时强制要求再次登录

##session数据的存储
* 使用express-mysql-session中间件将session数据存储在数据库中。
* 每次用户登出时，都会删除所有的session记录(见app.js中处理logout的方法)，下次用户登录时检索不到这些记录，将被要求重新登录，降低了被会话固定攻击的可能性
 
