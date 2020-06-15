<template>
  <div>
    <el-button type="text" @click="dialogFormVisible = true">登录</el-button>
    <el-dialog title="登 录" :visible.sync="visible" center="true" width="33%" :before-close="cancel">
      <div class="block">
        <el-form label-width="75px" :model="loginParams" :rules="rules" ref="loginParams">
          <el-form-item label="账号" prop="account">
            <!-- <span class="el-icon-user"></span> -->
            <el-input v-model="loginParams.account" autocomplete="off" placeholder="请输入账号" prefix-icon="el-icon-user" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginParams.password" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" @input="change($event)"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="loginPreCheck('loginParams')" :loading="loading">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { mapActions } from "vuex";
import store from '../store'
import router from '../router'

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      loginParams: {
        acccunt: "",
        password: ""
      },
      // formLabelWidth: "120px",
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
  computed:{
    visible(){
      console.log(store.getters.callLoginDialog);
      return store.getters.callLoginDialog||this.dialogFormVisible
    }
  },
  methods: {
    ...mapActions(["loadUser", "login","reloginPreOpration"]),
    loginPreCheck(loginParams) {
      this.$refs[loginParams].validate(valid => {
        if (valid) {
          // Message.success("登陆成功！");
          // alert('登陆成功')
          this.loading = true;
          store.dispatch('reloginPreOpration')
          this.login(this.loginParams)
            .then(response => {
              Message.success("登陆成功！");
              this.loadUser();
              this.dialogFormVisible = false;
              store.dispatch('setCallLoginDialog',false)
              // router.push({path:"/profile"})
              // router.push({path:"/"})
              // router.go(0)
            })
            .finally(() => {
              this.loading = false;
              // this.$router.go(0);
              // this.$router.push({path:"/"}
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    cancel() {
      this.loginParams.account = "";
      this.loginParams.password = "";
      store.dispatch('setCallLoginDialog',false)
      console.log(store.getters.callLoginDialog);
      
      this.dialogFormVisible = false;
      router.replace("/")
    },
    change(e){
      // this.$forceUpdate();
    }
  }
};
</script>

<style lang="less" scoped>
.block {
  padding: 30px 0 30px 0;
  width: 100%;
  margin: auto;
  // border: 1px solid red;
}
</style>