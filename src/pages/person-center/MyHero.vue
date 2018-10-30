<template>
  <div>
    <h2>我的英雄</h2>
    <div class="myHeroes" id="heroes">
    </div>
    <div>
      <h2>添加新英雄</h2>
      <input id="addFile" type="file" @change="addHero" multiple>
      <button @click="upload">上传</button>
      <div id="preview"></div>
      <h4><a href="/#/poster">上传好了？赶紧去做一张海报吧</a></h4>
    </div>
  </div>
</template>

<script>
  import {uploadImg,getMyHeroes} from "../../api/upload"

  export default {
        name: "my-hero",
        data:function () {
          return(
            {
              heroes:[],

            }
          )
        },
        methods:{
            addHero(){
              document.getElementById('preview').innerHTML = "";
              let input  = document.getElementById('addFile');
              for(let i = 0;i<input.files.length;i++){
                console.log(input.files[i]);
                let fReader = new FileReader();
                fReader.readAsDataURL(input.files[i]);
                fReader.onload = (e)=>{
                  let img = `<img src="${e.target.result}" class="preview-img">`;
                  let div = document.createElement('div');
                  div.innerHTML = img;
                  document.getElementById('preview').appendChild(div);
                }
              }
            },
            upload(){
                var files = document.getElementById('addFile').files;
                var data = new FormData();
                for(let i = 0;i<files.length;i++){
                  data.append('hero',files[i]);
                }
                 uploadImg(data,(response)=>{
                   alert('上传成功!');
                   this.$router.go(0);
                 })

            }
        },
        mounted(){
              getMyHeroes((response)=>response.data.forEach((v,i)=>{
                let img = `<img src="${v}" class="hero-img">`;
                let div = document.createElement('div');
                div.className = 'add_hero';
                div.innerHTML = img;
                document.getElementById('heroes').appendChild(div);
              }))
        }

    }
</script>

<style scoped>
  #preview{
    display: flex;
  }
  .myHeroes{
    border-bottom: solid #ff145c 3px;
    margin-bottom: 50px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

</style>
<style src="./myhero.css"></style>
