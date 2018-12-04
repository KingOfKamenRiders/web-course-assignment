<template>
    <el-card shadow="hover">
      <img :src="path" class="image"/>
      <div style="padding: 14px;">
        <span>{{title}}</span>
        <div class="bottom clearfix">
          <span>作者：{{auther}}</span>
          <el-button type="text" class="button" @click="goToDetail">查看详情</el-button>
        </div>
      </div>
    </el-card>
</template>

<script>
    export default {
        name: "index",
        props:['path','title','auther'],
        methods:{
          goToDetail(){
            this.$router.push({path:'poster-detail',query:{path:this.path.slice(22)}});
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
