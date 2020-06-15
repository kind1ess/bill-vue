<template>
  <div class="container">
    <Nav :activeIndex="'2-1'" style="position:fixed;z-index:999"></Nav>
    <div class="cart_list_box">
      <Card
        :cartList="cartList"
        :showCheckBox="showCheckBox"
        @cartParams="changeButtonDisableStatus"
      ></Card>
      <div class="footer">
        <div class="ops_button">
          <el-row>
            <el-col :span="8">
              <el-button type="primary" @click="handleButton1">{{buttonText1}}</el-button>
            </el-col>
            <el-col :span="8">
              <el-button
                type="danger"
                :disabled="deleteOrSubmitButtonDisable"
                @click="handleDeleteButton"
              >删除</el-button>
            </el-col>
            <el-col :span="8">
              <el-button
                type="success"
                :disabled="deleteOrSubmitButtonDisable"
                @click="handleSubmitButton"
              >提交</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import cartApi from "../api/cart";
import Card from "../components/Card";
import router from "../router";
import { Message } from "element-ui";
import orderApi from "../api/order";

export default {
  name: "Cart",
  components: {
    Nav,
    Card
  },
  data() {
    return {
      cartList: [],
      buttonText1: "多选",
      showCheckBox: false,
      deleteOrSubmitButtonDisable: true,
      cartParams: {},
      orderParams: {
        cartIds: []
      }
    };
  },
  computed: {},
  created() {
    cartApi.getCartList().then(response => {
      // console.log(response);
      this.cartList = response.data.data.cartDtoList;
    });
  },
  methods: {
    changeButtonDisableStatus(cartDtoList) {
      // console.log(cartParams.length);
      if (cartDtoList.length > 0) {
        // console.log("??????");
        this.deleteOrSubmitButtonDisable = false;
      } else {
        this.deleteOrSubmitButtonDisable = true;
      }
      // cartParams.splice(0,1)
      this.cartParams.cartDtoList = cartDtoList; //
      // console.log(cartParams);
      console.log("+++", JSON.stringify(this.cartParams));
    },
    handleButton1() {
      if (this.buttonText1 === "多选") {
        this.showCheckBox = true;
        this.buttonText1 = "取消";
      } else {
        this.showCheckBox = false;
        this.buttonText1 = "多选";
      }
    },
    handleDeleteButton() {
      cartApi
        .deleteCarts(this.cartParams)
        .then(response => {
          Message.success("删除购物车成功");
        })
        .finally(() => {
          cartApi.getCartList().then(response => {
            // console.log(response);
            this.cartList = response.data.data.cartDtoList;
          });
        });
    },
    handleSubmitButton() {
      for (let i = 0; i < this.cartParams.cartDtoList.length; i++) {
        this.orderParams.cartIds.push(this.cartParams.cartDtoList[i].cartId);
      }
      orderApi
        .addToOrder(this.orderParams)
        .then(response => {
          // console.log(response.data.data)
          let billOrderId = response.data.data;
          router.push({
            name: "orderDetail",
            params: { billOrderId: billOrderId }
          });
        })
        .finally(() => {
          Message.success("提交订单成功！");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background: url(https://images.pexels.com/photos/686230/pexels-photo-686230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500);
  height: 97vh;
  position: fixed;
  width: 201vh;
  .cart_list_box {
    position: relative;
    width: 70%;
    height: auto;
    margin: auto;
    top: 75px;
    overflow-x: hidden;
    .footer {
      width: 69%;
      height: 70px;
      position: fixed;
      margin: auto;
      bottom: 50px;
      // border: red 1px solid;
      line-height: 70px;
      .ops_button {
        position: relative;
        width: 30%;
        height: 100%;
        margin: auto;
      }
    }
  }
}
</style>