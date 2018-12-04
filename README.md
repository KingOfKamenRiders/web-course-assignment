# web-course-assignment

> happy web


# web-course-assignment

## 当前进度
* 第一次作业
* 第二次作业
* 第三次作业 
* 第四次作业
* 第五次作业
* 第六次作业
* 第七次作业
* 第八次作业

## 历史
* 第一次作业
    + 静态页面和CSS
* 第二次作业
    + 添加js
    + 实现图片的编辑&合成
    + 使用方法：
        - 打开主页，点击左侧栏中粉红色背景的“海报DIY”
        - 在新的页面中根据提示一步一步编辑即可
        - 使用的库：
        	+ jQuery : [https://jquery.com/](https://jquery.com/),用于简化元素操作
        	+ fabric.js : [http://fabricjs.com/](http://fabricjs.com/)，一个canvas库，用于实现主要的图片编辑、合成功能
        	+ jQuery.Jcrop : [http://deepliquid.com/content/Jcrop.html](http://deepliquid.com/content/Jcrop.html)，用于实现图片的裁剪
* 第三次作业
    + 添加后端，实现注册登陆功能
    + 后端实现
        - node(v8.11.1) + express + mysql
        - 需要的环境:node(v8.x) , mysql 数据库
    + 前端重构
        - 使用Vue框架
        - 目前没有使用任何组件库，所有html/css均为手写(所以比较难看)
        - 原因：前端渲染是当前的潮流，工具齐全，故没有使用模板引擎进行后端渲染
        - 第二次作业的库仍使用CDN，所以确保在有网络的情况下才能正常使用
    + 使用方法
        - npm  install
        - npm run build (会在dist目录下编译出静态资源，鉴于编译时间较长，moodle上的压缩包里会有一份已经编译好的)
        - cd backend && node app.js
        - 进入 localhost:3000查看
    + 其他需要提交的截图都在“第三次作业截图.pdf”中
* 第四次作业
    + 使用ajax添加上传图片的功能
    + 前端使用axios发送ajax请求
    + 后端使用[multer](https://www.npmjs.com/package/multer)中间件将图片保存在本地，并作为静态资源供前端访问
    + 前端没有使用组件库
    + 使用方法：
      - npm  install
      - npm run build (会在dist目录下编译出静态资源，鉴于编译时间较长，moodle上的压缩包里会有一份已经编译好的)
      - cd backend && node app.js
      - 进入 localhost:3000查看
      - 登录
      - 点击header上的用户名(右上角)，进入个人中心
      - 在“添加新英雄”下面点击“选择文件”(按住ctrl键可以选择多张图片，一次上传)
      - 选择好图片后点击上传
      - 点击header上的 “Marvel超级英雄论坛”标题回到主页
      - 点击左侧栏中粉红色背景的“海报DIY”
      - 这次在选择英雄界面上可以选择自己上传的英雄了
      - 剩下的步骤见第二次作业
* 第五次作业
    + 使用session实现会话管理(保持登录)，提供一些措施提高安全性
    + 会话管理实现方式：
      - 使用[express-session](https://www.npmjs.com/package/express-session)中间件，实现对session的操作
      - 使用[express-mysql-session](https://www.npmjs.com/package/express-mysql-session)中间件，将session 数据存储在MySQL数据库中(需要提供MySQL数据库连接)
      - 每当用户登录时，记录下(sessionid,用户名)这一二元组到数据库中(由上述中间件自动完成)
      - 每当用户登出时，删除登录时记下的记录，下次登录需要重新记录
    + 安全性措施
      - 详见 "session安全.md"文档
* 第六次作业
    + 实现UGC：标签应用
    + 用户在制作海报后可以选择发布到网站上，让其他用户评论
    + 用户在评论海报时可以给海报贴标签(可以新建标签也可以在热门标签中选取)
    + 用户可以根据标签来过滤/筛选海报，并根据海报的热度和制作时间排序查看
    + 用户可以查看所有标签的热度
    + 后端重构
      - 通过express.router实现后端路由的模块化(原来所有的响应操作都写在app.js中)
      - 使用async/await重写部分数据库操作，使得能够同步操作数据库(原来的mysql驱动只提供回调的方式)
    + 前端新增
      - 使用[elementui组件库](https://element.faas.ele.me/#/zh-CN)加速开发
* 第七次作业
    + 调用第三方的web service
    + 我调用了[高德开发平台的查询天气接口](https://lbs.amap.com/api/webservice/guide/api/weatherinfo/)
    + 在查看海报界面会显示最近几天的天气情况
* 第八次作业
    + 重构
    + 最后没有特别多的重构，主要重构工作在**第三次作业的前端重构**和**第六次作业的后端重构**
