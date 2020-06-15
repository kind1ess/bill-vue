<template>
  <div class="container">
    <Nav :activeIndex="'4'"></Nav>
    <div class="profile_title_container">
      <div class="profile_title">
        <div class="head_sculpture_container">
          <div class="head_sculpture"></div>
          <div class="user_profile">
            <strong>个人信息</strong>
            <UserProfile :user="user"></UserProfile>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import Nav from "../components/Nav";
import UserProfile from "../components/UserProfile";
import router from "../router"
import { Message } from 'element-ui'

export default {
  name: "Profile",
  components: {
    Nav,
    UserProfile
  },
  created(){
    if(store.getters.isAdmin){
            store.dispatch('clearAdmin')
            store.dispatch('setLoginStatus',false)
        }
    if(!store.getters.loginStatus||store.getters.isAdmin){
      Message.error("未授权请先登录")
      router.replace("/")
    }
  },
  computed: {
    user() {
      return store.getters.user;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .profile_title_container {
    width: auto;
    height: 100px;
    position: relative;
    margin: auto;
    top: 30px;
    .profile_title {
      width: 70%;
      height: 100%;
      margin: auto;
      background-color: #ffffff;
      border-radius: 5px;
      .head_sculpture_container {
        position: relative;
        width: 100%;
        height: 160px;
        background-color: #7ee8fa;
        background-image: linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%);
        top: 10px;
        float: left;
        .head_sculpture {
          height: 100%;
          width: 160px;
          margin: auto;
          border-radius: 50%;
          background-image: url("https://wwc.alicdn.com/avatar/getAvatar.do?userId=2774708157&width=160&height=160&type=sns");
          background-repeat: no-repeat;
        }
        .user_profile {
          text-align: center;
          position: relative;
          top: 50px;
          margin: auto;
          width: 35%;
          strong {
            position: relative;
            top: -30px;
          }
        }
      }
    }
  }
}
</style>