<template>
  <div class="container">
    <el-table
      :data="billPreviewList"
      border
      style="width: 100%"
      height="85%"
      @selection-change="handleSelectionChange"
      stripe
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="出库单编号" width="380px">
        <template slot-scope="scope">
          <i class="el-icon-s-order" style="margin-right: 15px"></i>
          <el-button type="text" @click="handleDetailClick(scope.row.billId)">{{scope.row.billId}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 15px"></i>
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 15px"></i>
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.statusId === 5">{{scope.row.statusName}}</el-tag>
          <el-tag v-else>{{scope.row.statusName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="70px" type="selection">
        <!-- <template slot-scope="scope">
          <el-checkbox @change="handleSelect(scope.row.billId,$event)"></el-checkbox>
        </template>-->
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button
        type="success"
        class="submit_button"
        @click="handleSubmit"
        :disabled="billParams.billIdList.length == 0"
      >提交</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible" center v-if="true">
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
        <el-table :data="odoVo.goodsWithoutPriceList" border style="width:100%">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="refBillId" label="关联订单编号"></el-table-column>
          <el-table-column prop="goodsId" label="产品编号"></el-table-column>
          <el-table-column prop="commodityName" label="产品名称"></el-table-column>
          <el-table-column prop="specificationName" label="产品规格"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="amount" label="出库数量"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import router from "../router";
import store from "../store";
import odoApi from "../api/odo";
import invoiceApi from "../api/invoice";

export default {
  data() {
    return {
      admin: {},
      billPreviewList: [],
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
          createTime: "2020-05-28T08:44:12.410Z",
          staffId: "string",
          staffName: "string",
          staffTelephone: "string",
          statusId: 0,
          statusName: "string",
          updateTime: "2020-05-28T08:44:12.411Z"
        }
      },
      billOdoTitle: [],
      dialogVisible: false,
      billParams: {
        billIdList: []
      }
    };
  },
  created() {
    this.admin = store.getters.admin;
    odoApi.findOdoPreviewByStatusId(4).then(response => {
      // console.log("待发货出库单：",response.data.data);
      this.billPreviewList = response.data.data.billPreviewList;
      Message.info("请选择待发货出库单发货");
    });
  },
  methods: {
    handleDetailClick(billId) {
      odoApi
        .findOdoVoById(billId)
        .then(response => {
          this.odoVo = response.data.data;
          this.billOdoTitle[0] = response.data.data.odoDto;
        })
        .finally(() => {
          this.dialogVisible = true;
        });
    },
    handleSubmit() {
      invoiceApi.generateInvoiceList(this.billParams).then(response => {
        //   console.log(response.data.data.billPreviewList);
        var billPreviewList = response.data.data.billPreviewList;
        sessionStorage.setItem(
          "billPreviewList",
          JSON.stringify(billPreviewList)
        );
        router.push({
          path: "/dashboard/invoice/invoiceOptions/sendOut/addToInvoiceSuccess"
        });
      });
    },
    handleSelectionChange(val) {
      let billParams = [];
      val.forEach(element => {
        billParams.push(element.billId);
      });
      this.billParams.billIdList = billParams;
      // console.log(this.billParams.billIdList);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .footer {
    // position: relative;
    width: 83%;
    margin: auto;
    height: 50px;
    position: fixed;
    bottom: 50px;
    // border: 1px solid red;
    line-height: 50px;
    text-align: center;
  }
}
</style>