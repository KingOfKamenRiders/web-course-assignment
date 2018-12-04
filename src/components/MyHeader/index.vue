<template>
  <header class="col-12 header">
    <h1 @click="goToIndex">Marvel超级英雄论坛</h1>
    <div class="btn-wrapper" v-show="!isLoggedIn">
      <button class="btn" @click="goToLogin">登录</button>
      <button class="btn" @click="goToSignUp">注册</button>
    </div>

    <div v-show="isLoggedIn" class="welcome">
      <span @click="goToPersonCenter">欢迎你，{{isLoggedIn}}</span>
      <button class="btn" @click="logOut" style="width: 60px;height: 30px"> 登出</button>
    </div>
  </header>
</template>

<script>
  import {logout,isLoggedIn} from "../../api/login";

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
            logout((res)=>{
              if(res.data==="OK"){
                sessionStorage.removeItem('cid');
                this.isLoggedIn = null;
              }else
                console.log('error!');
            })

          },
          goToPersonCenter(){
            this.$router.push('/person-center');
          },
          goToIndex(){
            this.$router.push('/');
          }
        },
    mounted(){
          isLoggedIn((res)=>{
            console.log(res.data.length)
            if(res.data.length>0)
              this.isLoggedIn = res.data;
            else
              sessionStorage.removeItem('cid');
          })
    }
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
  span:hover{
    cursor: pointer;
    color:chartreuse;
  }
  h1:hover{
    cursor: pointer;
  }
</style>
<style src="../../assets/css/layout.css"></style>
