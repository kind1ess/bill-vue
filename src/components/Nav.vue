<template>
  <div id="_header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#f5f5f5"
      text-color="#545c64"
      active-text-color="#409eff"
      :class="{nav_fixed:true}"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的</template>
        <el-menu-item index="2-1">预定清单</el-menu-item>
        <el-menu-item index="2-2">历史订单</el-menu-item>
        <el-menu-item index="2-3">历史还车单</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4">
        <!-- <router-link to="/profile" v-if="checkLoginStatus">用户</router-link> -->
        <span v-if="checkLoginStatus">用户</span>
        <Login v-else></Login>
        <!-- <a href="https://www.ele.me" target="_blank" v-if="true">登录</a> -->
        <!-- <a href="https://www.ele.me" target="_blank" v-else>用户</a> -->
      </el-menu-item>
      <el-menu-item index="5">
        <span id="go_dashboard">前往后台</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Login from "./Login";
import store from "../store";
import router from "../router";

export default {
  props: ["activeIndex"],
  components: {
    Login
  },
  data() {
    return {
      // activeIndex: "1",
      // activeIndex2: "1"
    };
  },
  computed: {
    checkLoginStatus() {
      if (store.getters.loginStatus && !store.getters.isAdmin) {
        console.log(store.getters.user);
        
        return true
      }
      store.dispatch('clearAdmin')
      store.dispatch('setLoginStatus',false)
      return false
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === "1") {
        router.push({ path: "/" });
      } else if (key === "4" && this.checkLoginStatus === true) {
        router.push({ path: "/profile" });
        // this.activeIndex = "4"
      } else if (key === "2-1") {
        router.push({ path: "/cart" });
      } else if (key === "2-2") {
        router.push({ path: "/billOrderHistory" });
      } else if (key === "5") {
        if (store.getters.isAdmin) {
          router.push({ path: "/dashboard" });
        } else {
          router.push({ path: "/adminLogin" });
        }
      }else if(key === "2-3"){
        router.push({path:"/billReturnHistory"})
      }
    }
  }
};
</script>

<style lang="less" scoped>
#_header {
  width: 100%;
  height: 60px;
  background-color: #545c64;
  // color: chartreuse;
  #go_dashboard {
    color: #f5f5f5;
  }
}
</style>