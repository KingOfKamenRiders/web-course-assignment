<template>
    <el-card shadow="always" style="display: block;margin: 10px auto">
      <div class="main col-12">
        <div class="col-3">
          <img src="/static/image/user.jpg" class="image"/>
          <strong>{{user}}</strong>
        </div>
        <div class="col-9">
          <el-rate disabled v-model="rate"></el-rate>
          <div class="comment">
            <p>{{comment}}</p>
          </div>
          <el-tag v-for="tag in tags" class="tag">
            {{tag.tag}}
          </el-tag>
          <div class="time">

            <span>{{time}}</span>
          </div>
        </div>
      </div>
    </el-card>
</template>

<script>
    export default {
        name: "index",
        props:['user','time','comment','tags','rate']
    }
</script>

<style scoped>
  .main{
    width: 100%;
  }
  .image{
    width: 100%;
  }
  .time{
    color:rgba(20,0,113,0.24);
    font-size: .8em;
  }
  .time span{
    float: right;
  }
  .tag{
    margin: 0 10px;
  }
</style>
