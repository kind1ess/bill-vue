<template>
  <el-form
    :model="updateParams"
    :rules="rules"
    ref="updateParams"
    label-width="70px"
    class="demo-ruleForm"
  >
    <el-form-item label="id">
      <el-input v-model="updateParams.id" readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="updateParams.account" readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="updateParams.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="telephone">
      <el-input v-model="updateParams.telephone"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input type="textarea" v-model="updateParams.address"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updatePrecheck('updateParams')">修改</el-button>
      <el-button @click="logout('updateParams')" type="danger">注销</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex'
import router from '../router'
import {Message} from 'element-ui'

export default {
  props: ["user"],
  data() {
    return {
      updateParams: {
        id: "",
        account: "",
        password: "",
        telephone: "",
        address: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 1, max: 16, message: "密码长度在1到16之间", trigger: "change" }
        ],
        telephone: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入地址",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.updateParams.id = this.user.userId;
    this.updateParams.account = this.user.account;
    this.updateParams.password = this.user.password;
    this.updateParams.telephone = this.user.telephone;
    this.updateParams.address = this.user.address;
  },
  methods: {
    ...mapActions(['logout','updateUser','loadUser']),
    updatePrecheck(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.updateUser(this.updateParams).then(response => {
            Message.success("修改成功！")
            this.loadUser()
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.logout().then(response => {       
      })
    }
  }
};
</script>

<style>
</style>