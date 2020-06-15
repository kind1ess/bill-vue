<template>
  <div class="card_box">
    <div v-if="cartList.length===0" class="non_goods">您还没有加入商品到购物车！</div>
    <el-row :gutter="12" v-for="cart in cartList" :key="cart.cartId">
      <el-col :span="24">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <el-row>
            <el-col :span="3">
              <el-image :src="cart.imgUrl" :fit="'fit'" :alt="cart.commodityName"></el-image>
            </el-col>
            <el-col :span="19">
              <div class="cart_info">
                {{cart.commodityName}}&nbsp;&nbsp;
                <span
                  class="specification_name"
                >{{cart.specificationName}}</span>&nbsp;&nbsp;
                <span class="amount">数量：{{cart.amount}}辆</span>&nbsp;&nbsp;
                <span class="price">单价：￥{{cart.price}}</span>&nbsp;&nbsp;
                <span class="sum_price">总价：￥{{cart.sumPrice}}</span>
              </div>
            </el-col>
            <el-col :span="1">
              <div class="check_box">
                <el-checkbox @change="handleSelected(cart,$event)" v-show="showCheckBox"></el-checkbox>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="12">
        <el-col :span="24">
        <el-card shadow="hover">鼠标悬浮时显示</el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
        <el-col :span="24">
        <el-card shadow="hover">从不显示</el-card>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["cartList", "showCheckBox"],
  data() {
    return {
      cartDtoList: [] //不能声明为对象数组
    };
  },
  created() {
    // console.log("++++++++++++++", this.cartList);
  },
  methods: {
    handleSelected(cart, $event) {
      if ($event) {
        this.cartDtoList.push(cart);
        // console.log(this.cartParams);
      } else {
        this.deleteCartFromCartParams(cart);
        // console.log(this.cartParams)
      }

      this.$emit("cartParams", this.cartDtoList);
    },
    deleteCartFromCartParams(cart) {
      for (let i = 0; i < this.cartDtoList.length; i++) {
        if (this.cartDtoList[i].cartId === cart.cartId) {
          this.cartDtoList.splice(i, 1);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.card_box {
 background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);
  width: 100%;
  height: 74vh;
  background-color: #ffffff;
  position: relative;
  margin: auto;
  // border: 1px solid red;
  justify-content: center;
  // overflow: auto;
  overflow-x: hidden;
  .non_goods {
    width: 100%;
    display: inline-block;
    position: relative;
    text-align: center;
    // border: 1px solid red;
    top: 200px;
  }
  .el-image {
    height: 80px;
    width: 80px;
  }
  .cart_info {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    height: 80px;
    // border: 1px solid red;
    line-height: 80px;
    font-size: 18px;
    .specification_name {
      color: #9c9c9c;
      font-size: 12px;
    }
    .amount {
      font-size: 12px;
    }
    .price {
      font-size: 12px;
      color: #ff4400;
    }
    .sum_price {
      font-size: 12px;
      color: #ff4400;
    }
  }
  .check_box {
    height: 80px;
    line-height: 80px;
  }
}
</style>