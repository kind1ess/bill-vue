<template>
  <div class="container">
    <h1>您好,{{admin.name}}!!</h1>
    <h3>您的部门是{{admin.departmentName}}</h3>
    <h3>您可以{{admin.position}}</h3>
  </div>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      admin: {}
    };
  },
  created() {
    this.admin = store.getters.admin;
  }
};
</script>

<style lang="less" scoped>
.container {
    text-align: center;
}
</style>