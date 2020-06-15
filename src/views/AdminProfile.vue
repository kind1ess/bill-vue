<template>
  <el-form label-width="70px" style="width:33%;position:relative;margin:auto" :model="admin">
    <el-form-item label="id">
      <el-input v-model="admin.staffId" readonly></el-input>
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="admin.account" readonly></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="admin.password" type="password" readonly></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="admin.name" readonly></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="admin.telephone" readonly></el-input>
    </el-form-item>
    <el-form-item label="部门">
      <el-input v-model="admin.departmentName" readonly></el-input>
    </el-form-item>
    <el-form-item label="职责">
      <el-input v-model="admin.position" readonly></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      admin: {
        account: "string",
        departmentId: 0,
        departmentName: "string",
        name: "string",
        password: "string",
        position: "string",
        staffId: "string",
        telephone: "string"
      },
      adminParams: {}
    };
  },
  created() {
    this.admin = store.getters.admin;
  }
};
</script>

<style>
</style>