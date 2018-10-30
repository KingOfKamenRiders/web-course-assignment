# web-course-assignment

> happy web


# web-course-assignment

## 当前进度
* 第一次作业
* 第二次作业
* 第三次作业 
* 第四次作业
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
