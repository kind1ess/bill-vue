<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <!-- <h3 class="medium">{{ item }}</h3> -->
      <img :src="url" class="_car_img">
    </el-carousel-item>
  </el-carousel>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
._car_img{
  height: 100%;
  width: 100%;
  position: relative;
  margin: auto;
}
</style>
<script>
export default {
  data() {
    return {
      url: require("../assets/images/1.jpg")
    };
  }
};
</script>