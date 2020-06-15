<template>
  <div class="container">
    <Nav style="position:fixed;z-index:999"></Nav>
    <div class="return_container">
      <el-table :data="billReturnTitle" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" class="table-expand" label-width="110px">
              <el-form-item label="还车单编号：">
                <span>{{scope.row.billId}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{scope.row.createTime}}</span>
              </el-form-item>
              <el-form-item label="关联订单编号：">
                <span>{{scope.row.orderId}}</span>
              </el-form-item>
              <el-form-item label="用户编号">
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
              <el-form-item label="状态：">
                <span>{{scope.row.statusName}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="还车单编号" prop="billId"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="状态" prop="statusName"></el-table-column>
      </el-table>
      <div class="goods_list">
        <el-table :data="returnVo.listGoods" border style="width:100%">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="goodsId" label="产品编号"></el-table-column>
          <el-table-column prop="commodityName" label="产品名称"></el-table-column>
          <el-table-column prop="specificationName" label="产品规格"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="amount" label="归还数量"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import returnApi from "../api/return";
import { Message } from "element-ui";
import router from "../router";
import store from "../store";
import Nav from "../components/Nav";

export default {
  components: {
    Nav
  },
  data() {
    return {
      returnVo: {
        listGoods: [
          {
            amount: 0,
            commodityName: "string",
            goodsId: 0,
            id: 0,
            specificationName: "string",
            unit: "string"
          }
        ],
        returnDto: {
          billId: "string",
          createTime: "2020-05-31T06:37:28.193Z",
          orderId: "string",
          statusId: 0,
          statusName: "string",
          userAccount: "string",
          userAddress: "string",
          userId: "string",
          userTelephone: "string"
        }
      },
      billReturnTitle: []
    };
  },
  created() {
    this.admin = store.getters.admin;
    this.doGetPreviewLList();
  },
  methods: {
    doGetPreviewLList() {
      returnApi.findReturnVoById(this.$route.params.billId).then(response => {
        this.returnVo = response.data.data;
        this.billReturnTitle.push(response.data.data.returnDto);
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
  // border: 1px solid red;
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .return_container{
      position: relative;
        margin: auto;
        top: 75px;
        width: 70%;
  }
}
</style>