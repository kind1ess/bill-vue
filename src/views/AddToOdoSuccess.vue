<template>
  <div class="container">
    <el-table :data="billOdoTitle" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" class="table-expand" label-width="100px">
            <el-form-item label="单据编号：">
              <span>{{scope.row.billId}}</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <span>{{scope.row.createTime}}</span>
            </el-form-item>
            <el-form-item label="修改时间：">
              <span>{{scope.row.updateTime}}</span>
            </el-form-item>
            <el-form-item label="员工编号：">
              <span>{{scope.row.staffId}}</span>
            </el-form-item>
            <el-form-item label="员工姓名：">
              <span>{{scope.row.staffName}}</span>
            </el-form-item>
            <el-form-item label="员工电话：">
              <span>{{scope.row.staffTelephone}}</span>
            </el-form-item>
            <el-form-item label="状态：">
              <span>{{scope.row.statusName}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="单据编号" prop="billId"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="状态" prop="statusName"></el-table-column>
    </el-table>
    <div class="goods_list">
      <el-table :data="odoVo.goodsWithoutPriceList" border style="width:100%" stripe>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="refBillId" label="关联订单编号"></el-table-column>
        <el-table-column prop="goodsId" label="产品编号"></el-table-column>
        <el-table-column prop="commodityName" label="产品名称"></el-table-column>
        <el-table-column prop="specificationName" label="产品规格"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="amount" label="出库数量"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import odoApi from "../api/odo";
import { Message } from "element-ui";

export default {
  data() {
    return {
      odoVo: {
        goodsWithoutPriceList: [
          {
            amount: 0,
            commodityName: "string",
            goodsId: 0,
            id: 0,
            refBillId: "string",
            specificationName: "string",
            unit: "string"
          }
        ],
        odoDto: {
          billId: "string",
          createTime: "2020-05-27T08:55:57.574Z",
          staffId: "string",
          staffName: "string",
          staffTelephone: "string",
          statusId: 0,
          statusName: "string",
          updateTime: "2020-05-27T08:55:57.574Z"
        }
      },
      billOdoTitle: [
      ]
    };
  },
  created() {
    odoApi
      .findOdoVoById(this.$route.params.billId)
      .then(response => {
        console.log(response);
        this.odoVo = response.data.data;
        this.billOdoTitle.push(response.data.data.odoDto)
        console.log(this.billOdoTitle[0]);
      })
      .finally(() => {
        Message.success("出库成功！");
      });
  }
};
</script>

<style lang="less" scoped>
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>