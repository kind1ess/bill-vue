<template>
  <el-container>
    <el-header>
      <Nav :activeIndex="'1'"></Nav>
    </el-header>
    <el-main>
      <GoodsList :goodsList="goodsList" :reserve="reserve"></GoodsList>
    </el-main>
  </el-container>
</template>

<script>
import goodsApi from "../api/goods";
import Nav from "../components/Nav";
import GoodsList from "../components/GoodsList";
import CarouselTest from "../components/CarouselTest";
import store from "../store";
import reserveApi from "../api/reserve";

export default {
  name: "Home",
  components: {
    Nav,
    GoodsList,
    CarouselTest
  },
  data() {
    return {
      goodsList: [
      ],
      reserve: [
      ]
    };
  },
  created() {
    if (store.getters.isAdmin) {
      store.dispatch("clearAdmin");
      store.dispatch("setLoginStatus", false);
    }
    goodsApi.findAll().then(response => {
      this.goodsList = response.data.data.goodsDtoList;
    });
    reserveApi.findAllCountFromUser().then(response => {
      // console.log(response);

      this.reserve = response.data.data;
      // console.log(this.reserve);
      
    });
  }
};
</script>

<style lang="less" scoped>
.el-container {
  // background: #ffc113;
  // background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%);
  background: url(https://images.pexels.com/photos/686230/pexels-photo-686230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500);
  height: 97vh;
  overflow: hidden;
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
}
</style>