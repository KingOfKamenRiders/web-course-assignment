<template>
  <header class="col-12 header">
    <h1>Marvel超级英雄论坛</h1>
    <div class="btn-wrapper" v-show="!isLoggedIn">
      <button class="btn" @click="goToLogin">登录</button>
      <button class="btn" @click="goToSignUp">注册</button>
    </div>

    <div v-show="isLoggedIn" class="welcome">
      <span>欢迎你，{{isLoggedIn}}</span>
      <button class="btn" @click="logOut" style="width: 60px;height: 30px"> 登出</button>
    </div>
  </header>
</template>

<script>
    export default {
        name: "my-header",
        data:function () {
          return({
            isLoggedIn: sessionStorage.getItem('cid'),
          })
        },
        methods:{
          goToLogin(){
            this.$router.push('/login');
          },
          goToSignUp(){
            this.$router.push('/signUp');
          },
          logOut(){
            sessionStorage.removeItem('cid');
            this.isLoggedIn = null;
          }
        },
    }
</script>

<style scoped>
  .header{
    height: 100px;
    background: linear-gradient(to right,red,purple);
    margin: 5px 20px auto auto;
    box-shadow: black 0 0 20px;
    color: white;
    animation: rotate_title 1s;
    -webkit-animation: rotate_title 1s;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btn{
    float: right;
    width: 80px;
    height: 50px;
    margin:auto 5px;
    border: solid 2px blue;
    background-color: rgba(0,0,0,0);
    border-radius: 5px;
    color:blue;
    font-weight: bold;
    font-size: 15px;
    outline: none;
  }
  .btn:hover{
    cursor: pointer;
  }
  .btn-wrapper{
    margin-right: 0;
  }
  .welcome{
    display: flex;
    flex-direction: column;
  }
</style>
<style src="../../assets/css/layout.css"></style>
