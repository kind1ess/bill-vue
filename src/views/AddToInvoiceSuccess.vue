<template>
  <div class="container">
    <el-table :data="billPreviewList" border style="width: 100%" height="100%">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="发货单编号" width="350px">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetailClick(scope.row.billId)">{{scope.row.billId}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column label="状态" width="100px">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.statusId === 5">{{scope.row.statusName}}</el-tag>
          <el-tag v-else>{{scope.row.statusName}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog :visible.sync="dialogVisible" center v-if="true">
        <el-table :data="billInvoiceTitle" border>
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
                <el-form-item label="出库单编号：">
                  <span>{{scope.row.odoId}}</span>
                </el-form-item>
                <el-form-item label="订货单编号：">
                  <span>{{scope.row.orderId}}</span>
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
                <el-form-item label="客户电话：">
                  <span>{{scope.row.userTelephone}}</span>
                </el-form-item>
                <el-form-item label="客户地址：">
                  <span>{{scope.row.userAddress}}</span>
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
          <el-table :data="invoiceVo.commonListGoods" border style="width:100%" stripe>
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column prop="goodsId" label="产品编号"></el-table-column>
            <el-table-column prop="commodityName" label="产品名称"></el-table-column>
            <el-table-column prop="specificationName" label="产品规格"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="amount" label="发货数量"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import invoiceApi from "../api/invoice";
import { Message } from "element-ui";
import router from "../router";

export default {
  data() {
    return {
      billPreviewList: [],
      invoiceVo: {
        commonListGoods: [
          {
            amount: 0,
            commodityName: "string",
            goodsId: 0,
            id: 0,
            specificationName: "string",
            unit: "string"
          }
        ],
        invoiceDto: {
          billId: "string",
          createTime: "2020-05-28T06:43:16.122Z",
          odoId: "string",
          orderId: "string",
          staffId: "string",
          staffName: "string",
          staffTelephone: "string",
          statusId: 0,
          statusName: "string",
          updateTime: "2020-05-28T06:43:16.122Z",
          userAddress: "string",
          userTelephone: "string"
        }
      },
      billInvoiceTitle: [],
      dialogVisible: false,
      showDialog: false
    };
  },
  created() {
    var billPreviewListJson = sessionStorage.getItem("billPreviewList");
    var billPreviewList = JSON.parse(billPreviewListJson);
    // console.log(billPreviewList);
    // console.log("~~~~~~~~~~~");
    this.billPreviewList = billPreviewList;
    Message.success(
      "生成发货单成功，本次共生成" + this.billPreviewList.length + "张发货单！"
    );
  },
  methods: {
    handleDetailClick(billId) {
      invoiceApi
        .findInvoiceVoById(billId)
        .then(response => {
          this.invoiceVo = response.data.data;
          this.billInvoiceTitle[0] = response.data.data.invoiceDto;
        })
        .finally(() => {
          this.dialogVisible = true;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .el-button.success {
    position: relative;
    margin-right: 5px;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
}
</style>