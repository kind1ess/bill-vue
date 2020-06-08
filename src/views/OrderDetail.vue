<template>
  <div class="container">
    <Nav style="position:fixed;z-index:999"></Nav>
    <div class="order_detail_container">
      <div class="order_dto_container">
        <div class="order_dto"></div>
      </div>
      <div class="goods_list_container">
        <el-table :data="billOrderTitle" border>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" class="table-expand" label-width="100px">
                <el-form-item label="订单编号：">
                  <span>{{scope.row.billId}}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                  <span>{{scope.row.createTime}}</span>
                </el-form-item>
                <el-form-item label="用户编号：">
                  <span>{{scope.row.userId}}</span>
                </el-form-item>
                <el-form-item label="用户账号：">
                  <span>{{scope.row.userAccount}}</span>
                </el-form-item>
                <el-form-item label="用户电话：">
                  <span>{{scope.row.userTelephone}}</span>
                </el-form-item>
                <el-form-item label="用户地址：">
                  <span>{{scope.row.userAddress}}</span>
                </el-form-item>
                <el-form-item label="订单状态：">
                  <span>{{scope.row.statusName}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单编号" prop="billId"></el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="订单状态" prop="statusName"></el-table-column>
        </el-table>
        <el-table
          :data="billOrder.goodsVoList"
          border
          style="width:100%"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="goodsId" label="产品编号"></el-table-column>
          <el-table-column prop="commodityName" label="产品名称"></el-table-column>
          <el-table-column prop="specificationName" label="产品规格"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="price" label="产品单价"></el-table-column>
          <el-table-column prop="amount" label="订货数量"></el-table-column>
          <el-table-column prop="sumPrice" label="小计"></el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-button type="success" @click="handleReturn">归还</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import orderApi from "../api/order";
import { Message } from "element-ui";
import returnApi from "../api/return";
import router from "../router";

export default {
  name: "OrderDetail",
  components: {
    Nav
  },
  data() {
    return {
      billOrder: {},
      billOrderTitle: [],
      orderId: "",
      sum: 0
    };
  },
  created() {
    // console.log(this.$route.params.billOrderId);
    let billOrderId = this.$route.params.billOrderId;
    orderApi.findOrderVo(billOrderId).then(response => {
      //   console.log(response.data.data);
      this.billOrder = response.data.data;
      //   console.log(this.billOrder.goodsVoList);
      this.billOrderTitle.push(response.data.data.orderDto);
      this.orderId = response.data.data.orderDto.billId;
    });
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value)) && index === 7) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
    handleReturn() {
      returnApi.generateBillReturn(this.orderId).then(response => {
        let billId = response.data.data;
        router.replace({ name: "returnDetail", params: { billId: billId } });

        Message.success("归还成功！");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background: url(https://images.pexels.com/photos/686230/pexels-photo-686230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500);
  height: 97vh;
  width: 201vh;
  overflow: auto;
  position: fixed;
  .order_detail_container {
    width: 70%;
    // height: 600px;
    // height: auto;
    position: relative;
    margin: auto;
    top: 75px;
    bottom: 30px;
    // border: 1px solid red;
    .order_dto_container {
      width: 100%;
      // height: 50%;
      // background-color: #007acc;
      .order_dto {
        width: 35%;
        height: 100%;
        // border: 1px solid red;
        position: relative;
        margin: auto;
      }
    }
    .goods_list_container {
      width: 100%;
      // height: 50%;
      background-color: #976fb6;
      // .table-expand {
      //   font-size: 0;
      // }
      .table-expand label {
        width: 90px;
        color: #99a9bf;
      }
      .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
    .footer {
      height: 100px;
      width: 100%;
      bottom: 0;
      // position: fixed;
      .el-button {
        position: relative;
        margin-left: 45%;
        margin-top: 20px;
      }
    }
  }
}
</style>