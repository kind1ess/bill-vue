<template>
  <div class="container">
    <!-- <div class="_nav">
          <Nav></Nav>
    </div>-->
    <div class="box">
      <div class="_carousel"></div>
      <div class="item" v-for="goods in goodsList" :key="goods.goodsId">
        <el-image style="width: 180px; height: 180px" :src="goods.imgUrl" :fit="fit"></el-image>
        <strong style="color:#ff4400">￥{{goods.price}}</strong>
        <br />
        <span class="goods_name">
          {{goods.commodityName}}
          &nbsp;&nbsp;
          <strong>{{goods.specificationName}}</strong>
          <br />
          库存
          {{reserve[goods.goodsId-1].allAmount}}辆
        </span>
        <br />
        <!-- <div class="block"></div>
        <span class="occupy"></span>-->
        <div class="add_to_list">
          <DialogTest :goodsId="goods.goodsId" :imgUrl="goods.imgUrl"></DialogTest>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DialogTest from "../components/DialogTest";

export default {
  props: ["goodsList","reserve"],
  components: {
    DialogTest
  },
  data() {
    return {
      fit: "contain"
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  margin: auto;
  width: 78%;
  overflow-y: hidden;
  overflow-x: hidden;
  // background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background: #ffffff;
  height: 150vh;
  .box {
    position: relative;
    top: 50px;
    width: 100%;
    .item {
      height: 322px;
      width: 182px;
      background-image: radial-gradient(73% 147%, #EADFDF 59%, #ECE2DF 100%), radial-gradient(91% 146%, rgba(255,255,255,0.50) 47%, rgba(0,0,0,0.50) 100%);
 background-blend-mode: screen;
      float: left;
      margin: 10px 20px;
      box-shadow: 2px 2px 2px #f2f2f2;
      .goods_name {
        position: relative;
        font-size: 12px;
        top: 20px;
      }
      .add_to_list {
        position: relative;
        bottom: -30px;
        left: 75px;
      }
    }
  }
}
</style>