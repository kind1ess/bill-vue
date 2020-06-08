<template>
  <div class="container">
      <el-table :data="billCheckTitle" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" class="table-expand" label-width="110px">
              <el-form-item label="验收单编号：">
                <span>{{scope.row.billId}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{scope.row.createTime}}</span>
              </el-form-item>
              <el-form-item label="更新时间：">
                <span>{{scope.row.updateTime}}</span>
              </el-form-item>
              <el-form-item label="员工编号：">
                <span>{{scope.row.staffId}}</span>
              </el-form-item>
              <el-form-item label="员工姓名">
                <span>{{scope.row.staffName}}</span>
              </el-form-item>
              <el-form-item label="员工电话">
                <span>{{scope.row.staffTelephone}}</span>
              </el-form-item>
              <el-form-item label="状态：">
                <span>{{scope.row.statusName}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="验收单编号" prop="billId"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="状态" prop="statusName"></el-table-column>
      </el-table>
      <div class="goods_list">
        <el-table :data="checkVo.listGoods" border style="width:100%" stripe>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="refBillId" label="关联单据编号"></el-table-column>
          <el-table-column prop="goodsId" label="产品编号"></el-table-column>
          <el-table-column prop="commodityName" label="产品名称"></el-table-column>
          <el-table-column prop="specificationName" label="产品规格"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="amount" label="应收数量"></el-table-column>
          <el-table-column prop="actualAmount" label="实收数量"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
import checkApi from '../api/check'
import { Message } from "element-ui";
import router from "../router";
import store from "../store";

export default {
  data() {
    return {
      admin: {},
      checkVo: {
        checkDto: {
          billId: "string",
          createTime: "2020-05-31T08:55:37.142Z",
          staffId: "string",
          staffName: "string",
          staffTelephone: "string",
          statusId: 0,
          statusName: "string",
          updateTime: "2020-05-31T08:55:37.142Z"
        },
        listGoods: [
          {
            actualAmount: 0,
            amount: 0,
            commodityName: "string",
            goodsId: 0,
            id: 0,
            refBillId: "string",
            remark: "string",
            specificationName: "string",
            unit: "string"
          }
        ]
      },
      billCheckTitle: []
    };
  },
  created() {
    this.admin = store.getters.admin;
    Message.success("验收成功！")
    checkApi.findCheckVoById(this.$route.params.billId).then(response => {
        this.checkVo = response.data.data
        this.billCheckTitle.push(response.data.data.checkDto)
    })
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
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
  .el-button.success {
    position: relative;
    margin-right: 5px;
  }
}
</style>