<template>
  <div class="container">
      <el-table :data="billPurchaseTitle" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" class="table-expand" label-width="100px">
              <el-form-item label="采购单编号：">
                <span>{{scope.row.billId}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{scope.row.createTime}}</span>
              </el-form-item>
              <el-form-item label="修改时间：">
                <span>{{scope.row.updateTime}}</span>
              </el-form-item>
              <el-form-item label="发货时间：">
                <span>{{scope.row.sendTime}}</span>
              </el-form-item>
              <el-form-item label="收货地址：">
                <span>{{scope.row.address}}</span>
              </el-form-item>
              <el-form-item label="员工编号：">
                <span>{{scope.row.staffId}}</span>
              </el-form-item>
              <el-form-item label="员工账号：">
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
        <el-table-column label="编号" prop="billId"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column label="状态" prop="statusName"></el-table-column>
      </el-table>
      <div class="goods_list">
        <el-table
          :data="purchaseVo.listGoods"
          border
          style="width:100%"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="refBillId" label="关联缺货单编号"></el-table-column>
          <el-table-column prop="goodsId" label="产品编号"></el-table-column>
          <el-table-column prop="commodityName" label="产品名称"></el-table-column>
          <el-table-column prop="specificationName" label="产品规格"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="price" label="产品单价"></el-table-column>
          <el-table-column prop="amount" label="订货数量"></el-table-column>
          <el-table-column prop="sumPrice" label="小计"></el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
import purchaseApi from "../api/purchase";
import { Message } from "element-ui";
import router from "../router";
import store from "../store";

export default {
  data() {
    return {
      admin: {},
      purchaseVo: {
        listGoods: [
          {
            amount: 0,
            commodityName: "string",
            goodsId: 0,
            id: 0,
            price: 0,
            refBillId: "string",
            specificationName: "string",
            sumPrice: 0,
            unit: "string"
          }
        ],
        purchaseDto: {
          address: "string",
          billId: "string",
          createTime: "2020-06-03T14:30:58.093Z",
          sendTime: "string",
          staffId: "string",
          staffName: "string",
          staffTelephone: "string",
          statusId: 0,
          statusName: "string",
          updateTime: "2020-06-03T14:30:58.093Z"
        }
      },
      billPurchaseTitle: []
    };
  },
  created() {
    purchaseApi.findPurchaseVoById(this.$route.params.billId).then(response => {
      console.log(response);
      
        this.purchaseVo = response.data.data
        this.billPurchaseTitle.push(response.data.data.purchaseDto)
    }).finally(() => {
        Message.success("添加采购单成功！")
    })
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
        if (!values.every(value => isNaN(value)) && index === 8) {
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
    }
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