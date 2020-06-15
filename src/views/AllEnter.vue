<template>
  <div class="container">
    <el-table :data="enterPreviewList" border style="width: 100%" height="100%" stripe>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="入库单编号" width="380px">
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
          <el-tag type="success">{{scope.row.statusName}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" center v-if="true">
      <el-table :data="billEnterTitle" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" class="table-expand" label-width="110px">
              <el-form-item label="入库单编号：">
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
        <el-table-column label="入库单编号" prop="billId" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="状态" prop="statusName"></el-table-column>
      </el-table>
      <div class="goods_list">
        <el-table :data="enterVo.listGoods" border style="width:100%">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="refBillId" label="验收单编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goodsId" label="产品编号"></el-table-column>
          <el-table-column prop="commodityName" label="产品名称"></el-table-column>
          <el-table-column prop="specificationName" label="产品规格"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="amount" label="入库数量"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import enterApi from '../api/enter'
import { Message } from "element-ui";
import router from "../router";
import store from "../store";

export default {
  props: ["statusId", "showAll"],
  data() {
    return {
      admin: {},
      enterPreviewList: [],
      enterVo: {
        enterDto: {
          billId: "string",
          createTime: "2020-06-01T02:01:59.069Z",
          staffId: "string",
          staffName: "string",
          staffTelephone: "string",
          statusId: 0,
          statusName: "string",
          updateTime: "2020-06-01T02:01:59.069Z"
        },
        listGoods: [
          {
            amount: 0,
            commodityName: "string",
            goodsId: 0,
            id: 0,
            refBillId: "string",
            specificationName: "string",
            unit: "string"
          }
        ]
      },
      billEnterTitle: [],
      dialogVisible: false
    };
  },
  created() {
    this.admin = store.getters.admin;
    this.doGetPreviewLList();
  },
  methods: {
    handleDetailClick(billId) {
        enterApi.findEnterVoById(billId).then(response => {
            this.enterVo = response.data.data
            this.billEnterTitle[0] = response.data.data.enterDto
        }).finally(() => {
            this.dialogVisible = true
        })
    //   checkApi
    //     .findCheckVoById(billId)
    //     .then(response => {
    //       this.checkVo = response.data.data;
    //       this.billCheckTitle[0] = response.data.data.checkDto;
    //     })
    //     .finally(() => {
    //       this.dialogVisible = true;
    //     });
    },
    doGetPreviewLList() {
      enterApi.findAllEnterPreview().then(response => {
          this.enterPreviewList = response.data.data.billPreviewList
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
}
</style>