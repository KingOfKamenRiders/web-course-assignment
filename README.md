# web-course-assignment

> happy web


# web-course-assignment

## 当前进度
* 第一次作业
* 第二次作业
* 第三次作业 
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
        - npm run build (会在build目录下编译出静态资源，鉴于编译时间较长，moodle上的压缩包里会有一份已经编译好的)
        - cd backend && node app.js
        - 进入 localhost:3000查看
    + 其他需要提交的截图都在“第三次作业截图.pdf”中
