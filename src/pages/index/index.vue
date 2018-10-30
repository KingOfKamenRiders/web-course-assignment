<template>
  <div>
    <MyHeader/>
  <aside class="col-2 col-m-6">
    <div class="nav-tab nav-tab-special col-12" @click="goToDIY">
      海报DIY!
    </div>
    <div class="nav-tab col-12">
      电影区
    </div>
    <div class="nav-tab col-12">
      漫画区
    </div>
    <div class="nav-tab col-12">
      cosplay区
    </div>
    <div class="nav-tab col-12">
      交友区
    </div>
    <div class="nav-tab col-12">
      联系站长
    </div>
  </aside>
  <main class="col-10 col-m-6 main">
    <div class="col-12 description">
      <p>
        漫威电影宇宙（Marvel Cinematic Universe，缩写为MCU），是以超级英雄电影为中心的共同的架空世界，由漫威影业（Marvel Studios）基于漫威漫画出版物中的角色独立制作的系列电影。
        它像漫画中的漫威主宇宙一样，是由共同的元素、设定、表演和角色通过跨界作品所建立的。
        漫威电视（Marvel Television）将宇宙进一步扩大，制作位于该宇宙中的电视剧系列。
      </p>
    </div>
    <div class="col-4 hero_div">
      <img src="/static/image/index/iron_man.jpg">
      <button>钢铁侠版块</button>
    </div>
    <div class="col-4 hero_div">
      <img src="/static/image/index/captain_America.jpg">
      <button>美国队长版块</button>
    </div>
    <div class="col-4 hero_div">
      <img src="/static/image/index/Thor.jpg">
      <button>雷神版块</button>
    </div>
    <div class="col-4 hero_div">
      <img src="/static/image/index/Hulk.jpg">
      <button>绿巨人版块</button>
    </div>
    <div class="col-4 hero_div">
      <img src="/static/image/index/black_widow.jpg">
      <button>黑寡妇版块</button>
    </div>
    <div class="col-4 hero_div">
      <img src="/static/image/index/Dead_Pool.jpg">
      <button>死侍版块</button>
    </div>
    <div class="col-4 hero_div">
      <img src="/static/image/index/Dr.Strange.jpg">
      <button>奇异博士版块</button>
    </div>
    <div class="col-4 hero_div">
      <img src="/static/image/index/spider_man.jpg">
      <button>蜘蛛侠版块</button>
    </div>
    <div class="col-4 hero_div">
      <img src="/static/image/index/panther.jpg">
      <button>黑豹版块</button>
    </div>
  </main>
    <MyFooter/>
  </div>
</template>
<script>
    import MyHeader from '../../components/MyHeader/index'
    import MyFooter from '../../components/MyFooter/index'
    export default {
        name: "index",
        components:{MyHeader,MyFooter},
        methods:{
          goToDIY(){
            if(sessionStorage.getItem('cid'))
              this.$router.push('/poster');
            else
              alert('请先登录!');
          }
        }
    }
</script>

<style src="./index.css"></style>
<style src="../../assets/css/layout.css"></style>
