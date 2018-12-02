<template>
    <el-card>
      <img :src="url" class="image"/>
      <div style="padding: 14px;">
        <span>{{title}}</span>
        <div class="bottom clearfix">
          <span>作者：{{author}}</span>
          <el-button type="text" class="button" @click="goToDetail">操作按钮</el-button>
        </div>
      </div>
    </el-card>
</template>

<script>
    export default {
        name: "index",
        props:['url','title','author'],
        methods:{
          goToDetail(){

          }
        }
    }
</script>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
</style>
