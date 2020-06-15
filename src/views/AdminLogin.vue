<template>
  <div class="container">
    <el-card class="login_card">
      <div class="login_form_container">
        <div class="form_title">管理员登录</div>
        <div class="form_wrapper">
          <el-form :model="loginParams" :rules="rules" ref="loginParams">
            <el-form-item prop="account">
              <el-input v-model="loginParams.account" auto-complete="off" prefix-icon="el-icon-user" placeholder="请输入账号" @input="change($event)"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginParams.password" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" @input="change($event)"></el-input>
            </el-form-item>
          </el-form>
          <div class="button_wrapper">
            <el-button type="primary" :loading="loading" @click="loginPrecheck('loginParams')">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { mapActions } from "vuex";
import store from '../store'
import router from '../router'

export default {
  data() {
    return {
      loginParams: {
        account: "",
        password: ""
      },
      loading:false,
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 16, message: "用户名长度在1到16之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 16, message: "密码长度在1到16之间", trigger: "blur" }
        ]
      }
    };
  },
  methods:{
    ...mapActions(["adminLogin","loadAdmin"]),
    loginPrecheck(loginParams){
      this.$refs[loginParams].validate(valid => {
        if(valid){
          this.loading = true
          store.dispatch('reloginPreOpration')
          this.adminLogin(this.loginParams)
              .then(response => {
                Message.success("登录成功！")
                this.loadAdmin()
              }).finally(() => {
                this.loading = false
              })
        }else{
          return false;
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 201vh;
  padding: 0;
  margin: 0;
  // border: 1px solid red;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  // position: absolute;
  .login_card {
    width: 320px;
    height: 300px;
    position: absolute;
    // margin: auto;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login_form_container {
      .form_title {
        position: relative;
        top: 20px;
        height: 50px;
        margin: auto;
        text-align: center;
        font-size: 20px;
        color: #1f9fff;
        // border: 1px red solid;
      }
      .form_wrapper {
        position: relative;
        top: 40px;
      }
      .button_wrapper{
        width: 100%;
        // border: 1px red solid;
        .el-button{
          width: 100%;
        }
      }
    }
  }
}
</style>