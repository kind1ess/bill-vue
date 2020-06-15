<template>
  <div class="container">
    <Nav :activeIndex="'2-2'" style="position:fixed;z-index:999"></Nav>
    <!-- <h1>hello</h1> -->
    <div class="bill_order_history_container">
      <div v-if="orderTitleDtoList.length===0" class="non_order">您还没有提交过订单！</div>
      <el-row>
        <el-col :span="12" v-for="orderTitleDto in orderTitleDtoList" :key="orderTitleDto.orderId">
          <el-card class="order_card" shadow="hover">
            <div slot="header" class="clearfix">
              <!-- <el-tag v-if="orderTitleDto.statusId===1">{{orderTitleDto.statusName}}</el-tag> -->
              <el-tag v-if="orderTitleDto.statusId===2" type="danger">{{orderTitleDto.statusName}}</el-tag>
              <el-tag
                v-else-if="orderTitleDto.statusId===5||orderTitleDto.statusId===10"
                type="success"
              >{{orderTitleDto.statusName}}</el-tag>
              <el-tag v-else>{{orderTitleDto.statusName}}</el-tag>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="checkBillOrderDetail(orderTitleDto.billId)"
              >查看详情</el-button>
            </div>
            <div class="order_id">
              <span class="el-icon-s-order"></span>
              <span class="content">{{orderTitleDto.billId}}</span>
            </div>
            <div class="create_time">
              <span class="el-icon-time"></span>
              <span class="content">{{orderTitleDto.createTime}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import orderApi from "../api/order";
import router from "../router";

export default {
  name: "BillOrderHistory",
  components: {
    Nav
  },
  data() {
    return {
      orderTitleDtoList: []
    };
  },
  created() {
    orderApi.findOrderTitleVo().then(response => {
      // console.log(response.data.data.orderTitleDtoList);
      this.orderTitleDtoList = response.data.data.orderPreviewDtoList;
      console.log(this.orderTitleDtoList);
    });
  },
  methods: {
    checkBillOrderDetail(billOrderId) {
      router.push({
        name: "orderDetail",
        params: { billOrderId: billOrderId }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container{
  background: url(https://images.pexels.com/photos/686230/pexels-photo-686230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500);
  height: 97vh;
  position: fixed;
  overflow: auto;
.bill_order_history_container {
  width: 70%;
  height: auto;
  position: relative;
  top: 75px;
  margin: auto;
  overflow: auto;
  .non_order {
    width: 100%;
    display: inline-block;
    position: relative;
    text-align: center;
    top: 200px;
  }
  .order_card {
    width: 98%;
    .content {
      color: #9c9c9c;
      font-size: 12px;
    }
  }
}
.footer {
  height: 100px;
  width: 100%;
}
}
</style>