<template>
  <div class="bg">
    <div class="form_wrapper">
      <form class="vertical_container">
        <h1>用户注册</h1>
        <div class="vertical_container">
          <div class="user_div">
            <div>用户名</div>
            <input type="text" name="username" required v-model="cid">
          </div>
          <div class="error" v-show="status === 1">该用户已存在！</div>
          <div class="user_div">
            <div>密&nbsp&nbsp&nbsp码</div>
            <input type="password" name="password" required v-model="password">
          </div>
          <div class="user_div">
            <div>确认密码</div>
            <input type="password" name="password" required v-model="confirmPass">
          </div>
          <div class="error" v-show="status === 2">两次密码不一致！</div>
        </div>
      </form>
      <button  class="login_button" @click="trySignUp">注册</button>
    </div>
  </div>
</template>

<script>
  import {signUp} from "../../api/login"
  import {ResultMessage} from "../../util/ResultMessage"

  export default {
    name: "login",
    data:function () {
      return({
        cid:"",
        password:"",
        confirmPass:"",
        status:0,
      })
    },
    methods:{
      trySignUp(){
        if(this.password !== this.confirmPass){
          this.status = 2;
          return;
        }
        signUp(this.cid,this.password,
          (response)=>{
            if(response.data === ResultMessage.OK){
              sessionStorage.setItem('cid',this.cid);
              this.$router.push('/');
              alert('注册成功！');
            }else{
              this.status = 1;
            }
          });

      }
    }
  }
</script>

<style scoped>
  .error{
    font-size: 15px;
    color: white;
    font-weight: bold;
  }
</style>
<style src="./signUp.css"></style>
