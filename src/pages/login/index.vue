<template>
  <div class="bg">
  <div class="form_wrapper">
    <form class="vertical_container">
      <h1>Marvel电影论坛</h1>
      <div class="vertical_container">
        <div class="user_div">
          <div>用户名</div>
          <input type="text" name="username" required v-model="cid">
        </div>
        <div class="error" v-show="status === 1">用户名或密码错误！</div>
        <div class="user_div">
          <div>密&nbsp&nbsp&nbsp码</div>
          <input type="password" name="password" required v-model="password">
        </div>
        <div class="func_div">
          <div>
            <div class="checkboxFour">
              <input type="checkbox" value="1" id="checkboxFourInput" name="remember_pass" />
              <label for="checkboxFourInput"></label>
            </div>
            <span>记住密码</span>
          </div>
          <div>
            <a href="#">忘记密码?</a>
            <br>
            <a href="/#/signUp">前往注册</a>
          </div>
        </div>
      </div>
    </form>
    <button class="login_button" @click="tryLogin">登陆</button>
  </div>
  </div>
</template>

<script>
  import {login} from "../../api/login"
  import {ResultMessage} from "../../util/ResultMessage"

  export default {
        name: "login",
        data:function () {
          return({
            cid:"",
            password:"",
            status:0,
          })
        },
        methods:{
          tryLogin(){
            login(this.cid,this.password,
              (response)=>{
                if(response.data === ResultMessage.OK){
                  sessionStorage.setItem('cid',this.cid);
                  this.$router.push('/');
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
<style src="./login.css"></style>
