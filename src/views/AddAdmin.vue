<template>
  <div class="container">
    <el-form label-width="70px" :model="staff" :rules="rules" ref="staff">
      <el-form-item label="账号" prop="account">
        <el-input v-model="staff.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="staff.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="staff.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="telephone">
        <el-input v-model="staff.telephone"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentId">
        <el-select
          v-model="staff.departmentId"
          placeholder="选择部门"
          style="width:100%"
          @change="handleChange($event)"
        >
          <el-option label="销售部" value="1"></el-option>
          <el-option label="仓库管理部" value="2"></el-option>
          <el-option label="发货部" value="3"></el-option>
          <el-option label="验收部" value="4"></el-option>
          <el-option label="采购部" value="5"></el-option>
          <el-option label="人事部" value="6"></el-option>
          <el-option label="总经理" value="7"></el-option>
          <el-option label="技术部" value="8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handleAddPrecheck('staff')" style="width:100%">添加</el-button>
      </el-form-item>
    </el-form>
    <div class="footer"></div>
  </div>
</template>

<script>
import adminApi from "../api/admin";
import router from "../router";
import { Message } from "element-ui";

export default {
  data() {
    return {
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "change" },
          {
            min: 1,
            max: 16,
            message: "长度在1到16个字符之间",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 1,
            max: 16,
            message: "长度在1到16个字符之间",
            trigger: "change"
          }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "change" },
          { min: 1, max: 4, message: "长度在1到4个字符之间", trigger: "change" }
        ],
        telephone: [
          { required: true, message: "请输入电话", trigger: "change" }
          //   {min:1,max:16,message:'长度在1到16个字符之间',trigger:'change'}
        ],
        departmentId: [
          { required: true, message: "请选择部门", trigger: "blur" }
        ]
      },
      staff: {
        account: "",
        departmentId: null,
        name: "",
        password: "",
        telephone: ""
      }
    };
  },
  methods: {
    handleAddPrecheck(staff) {
      this.$refs[staff].validate(valid => {
        if (valid) {
          this.addAdmin(this.staff);
        }
      });
    },
    addAdmin(staff) {
      console.log(staff);

      adminApi.addAdmin(staff).then(response => {
        if (response.data.code == 200) {
          Message.success("添加管理员成功！");
          router.replace({ path: "/dashboard" });
        }
      });
    },
    handleChange($event) {
      console.log($event);
      console.log(this.staff);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 33%;
  position: relative;
  margin: auto;
  .footer {
    width: 100%;
    //   border: 1px solid red;
    text-align: center;
  }
}
</style>