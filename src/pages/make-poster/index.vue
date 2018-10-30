<template>
  <div class="col-10 paper">
    <div class="roles col-12">
      <h2>Step 1: 选择人物</h2>
      <div class="col-12">
        <div class="add-hero col-2" style="background-color: #ff4501">
          <button>钢铁侠</button>
        </div>
        <div class="add-hero col-2" style="background-color: #3b92de">
          <button>美国队长</button>
        </div>
        <div class="add-hero col-2" style="background-color: #f13f30">
          <button>蜘蛛侠</button>
        </div>
        <div class="add-hero col-2" style="background-color: #cb4853">
          <button>黑寡妇</button>
        </div>
        <div class="add-hero col-2" style="background-color: #44983a">
          <button>绿巨人</button>
        </div>
        <div class="add-hero col-2" style="background-color: #f7d61e">
          <button>雷神</button>
        </div>
        <div class="add-hero col-2" style="background-color: #c42320">
          <button>死侍</button>
        </div>
        <div class="add-hero col-2" style="background-color: #e7bd6b">
          <button>奇异博士</button>
        </div>
        <div class="add-hero col-2" style="background-color: #6f716e">
          <button>黑豹</button>
        </div>
      </div>
      <div class="col-12">
        <h3>我的英雄</h3>
        <div class="myHeroes" id="heroes"></div>
        <h4><a href="/#/person-center">没有英雄？赶紧去上传吧</a></h4>
      </div>
      <div class="col-12" style="text-align: center">
        <button id="next-1" class="next">下一步</button>
      </div>
    </div>
    <div class="edit-area col-12">
      <div class="col-12">
        <h2>Step 2:编辑人物</h2>
        <div class="description">
          <ul>
            <li>点击你喜欢的item（发型/武器/面饰），在人物肖像中调整好它们的位置、大小、角度。</li>
            <li>在肖像上双击你不想要的item就可以删除它们。</li>
            <li>完成了就点击“下一步”吧！</li>
          </ul>
        </div>
      </div>
      <div class="col-12">
        <div class="col-3 ">
          <div class="col-4 list" id="hs">
            <h4>发型</h4>
            <img src="/static/image/make-poster/hs1-1.png">
            <img src="/static/image/make-poster/hs2-2.png">
            <img src="/static/image/make-poster/hs3-3.png">
            <img src="/static/image/make-poster/hs4-4.png">
            <img src="/static/image/make-poster/hs5-5.png">
          </div>
          <div class="col-4 list" id="weapons">
            <h4>武器</h4>
            <img src="/static/image/make-poster/shield.png">
            <img src="/static/image/make-poster/hammar.png">
            <img src="/static/image/make-poster/gun1.png">
            <img src="/static/image/make-poster/gun2.png">
            <img src="/static/image/make-poster/gun3.png">
          </div>
          <div class="col-4 list" id="facials">
            <h4>面饰</h4>
            <img src="/static/image/make-poster/b1.png">
            <img src="/static/image/make-poster/b2.png">
            <img src="/static/image/make-poster/g1.png">
            <img src="/static/image/make-poster/g2.png">
            <img src="/static/image/make-poster/g3.png">
          </div>
        </div>

        <div class="col-9 h-container">
          <canvas id="c" width="500px" height="500px"></canvas>
        </div>
      </div>

      <div class="col-12" style="text-align: center">
        <button class="next" id="next-2">下一步</button>
      </div>
    </div>
    <div class="assemble-area col-12">
      <h2>Step 3: 背景合成</h2>
      <div class="col-12 description">
        <ul>
          <li>选择你喜欢的背景</li>
          <li>将刚刚编辑好的人物肖像放在背景的合适位置并调整好位置和角度</li>
          <li>完成了就点击“下一步”吧!</li>
        </ul>

      </div>
      <div class="col-2 list-l" id="bgis">
        <h2>背景</h2>
        <img src="/static/image/make-poster/bg1.jpg">
        <img src="/static/image/make-poster/bg2.jpg">
        <img src="/static/image/make-poster/bg3.jpg">
      </div>
      <div class="col-10 h-container">
        <canvas width="800px" height="600px" id="poster"></canvas>
      </div>
      <div class="col-12" style="text-align: center">
        <button class="next" id="next-3">下一步</button>
      </div>
    </div>
    <div class="crop-area col-12">
      <h2>Step 4: 选择区域</h2>
      <div class="col-12 description">
        <ul>
          <li>用鼠标选择最终要展示的区域（就是截图啦）</li>
          <li>完成了就点击“完成”吧！</li>
        </ul>
      </div>
      <div class="col-12">
        <div class="col-6">
          <img id="before-crop" src="" width="500" height="375">
        </div>
        <div class="col-6">
          <h3>预览：</h3>
          <div class="preview-wrapper">

            <img src="" id="preview" />
          </div>
        </div>
      </div>
      <div class="col-12" style="text-align: center">
        <button class="next" id="next-4">完成</button>
      </div>
    </div>
    <div class="ultimate col-12">
      <h2>Last Step: 欣赏你的大作吧！</h2>
      <div class="col-12 description">
        <ul>
          <li>你已经成功自己制作了一张海报，庆祝一下吧！</li>
        </ul>
      </div>
      <div class="h-container col-12">
        <canvas id="ultimate_work" width="800" height="600"></canvas>
      </div>

    </div>
  </div>
</template>

<script>
  import {init,initCustom} from "./make-poster";
  import {getMyHeroes} from "../../api/upload"

  export default {
        name: "MakePoster",
        created:function(){
          console.log('created!');
          getMyHeroes((response)=>response.data.forEach((v,i)=>{
            let img = `<img src="${v}"  crossorigin="anonymous"><button>自定义英雄</button>`;
            let div = document.createElement('div');
            div.className = 'hero_div';
            div.innerHTML = img;
            document.getElementById('heroes').appendChild(div);
            initCustom(div);
          }))
        },
        mounted:function () {
          init();
        }
    }
</script>
<style src="./make-poster.css"></style>
<style src="../../assets/css/layout.css"></style>
<style scoped>
  #heroes{
    display: flex;
  }
  .paper{
    width: 100%;
  }
</style>
