<template>
  <div class="container">
    <el-table
      :data="checkPreviewList"
      border
      style="width: 100%"
      height="85%"
      @selection-change="handleSelectionChange"
      stripe
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="验收单编号" width="380px">
        <template slot-scope="scope">
          <i class="el-icon-s-order" style="margin-right: 15px"></i>
          <el-button type="text" @click="handleDetailClick(scope.row.billId)">{{scope.row.billId}}</el-button>
          <!-- <BgOrderDetail :billId="scope.row.billId"></BgOrderDetail> -->
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
          <el-tag v-if="scope.row.statusId===9" type="success">{{scope.row.statusName}}</el-tag>
          <el-tag v-else>{{scope.row.statusName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column type="selection"></el-table-column>
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
        <el-table :data="checkVo.listGoods" border style="width:100%">
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
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import router from "../router";
import store from "../store";
import checkApi from "../api/check";
import enterApi from "../api/enter";

export default {
  data() {
    return {
      admin: {},
      checkPreviewList: [],
      checkVo: {
        checkDto: {
          billId: "string",
          createTime: "2020-06-01T02:25:27.123Z",
          staffId: "string",
          staffName: "string",
          staffTelephone: "string",
          statusId: 0,
          statusName: "string",
          updateTime: "2020-06-01T02:25:27.123Z"
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
      billCheckTitle: [],
      dialogVisible: false,
      billParams: {
        billIdList: []
      }
    };
  },
  created() {
    this.admin = store.getters.admin;
    Message.info("请选择待入库验收单入库");
    this.doGetPreviewLList();
  },
  methods: {
    handleDetailClick(billId) {
      checkApi
        .findCheckVoById(billId)
        .then(response => {
          this.checkVo = response.data.data;
          this.billCheckTitle[0] = response.data.data.checkDto;
        })
        .finally(() => {
          this.dialogVisible = true;
        });
    },
    doGetPreviewLList() {
      checkApi.findCheckPreviewByStatusId(8).then(response => {
        this.checkPreviewList = response.data.data.billPreviewList;
      });
    },
    handleSelectionChange(val) {
      let billParams = [];
      val.forEach(element => {
        billParams.push(element.billId);
      });
      this.billParams.billIdList = billParams;
    },
    handleSubmit() {
    //   checkApi.generateBillCheck(this.billParams).then(response => {
    //     let billId = response.data.data;
    //     router.push({ name: "addToCheckSuccess", params: { billId: billId } });
    //   });
    enterApi.generateBillEnter(this.billParams).then(response => {
        let billId = response.data.data;
        router.push({name:"addToEnterSuccess",params:{billId:billId}})
    })
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