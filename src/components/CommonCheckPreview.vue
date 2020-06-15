<template>
  <div class="container">
    <el-table :data="checkPreviewList" border style="width: 100%" height="93%" stripe>
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
    </el-table>
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        background
        :total="total"
      ></el-pagination>
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
        <el-table-column label="验收单编号" prop="billId" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="状态" prop="statusName"></el-table-column>
      </el-table>
      <div class="goods_list">
        <el-table :data="checkVo.listGoods" border style="width:100%">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="refBillId" label="关联单据编号" show-overflow-tooltip></el-table-column>
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
import checkApi from '../api/check'
import { Message } from "element-ui";
import router from "../router";
import store from "../store";

export default {
  props: ["statusId", "showAll"],
  data() {
    return {
      admin: {},
      checkPreviewList: [],
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
      billCheckTitle: [],
      dialogVisible: false,
      currentPage:1,
      pageSize:8,
      total:0
    };
  },
  created() {
    this.admin = store.getters.admin;
    this.getTotal()
    this.doGetPreviewLList();
  },
  methods: {
    handleDetailClick(billId) {
        checkApi.findCheckVoById(billId).then(response => {
            this.checkVo = response.data.data
            this.billCheckTitle[0] = response.data.data.checkDto
        }).finally(() => {
            this.dialogVisible = true
        })
    },
    doGetPreviewLList() {
      if (this.showAll) {
        checkApi.findAllCheckPreviewPageBy(this.currentPage-1,this.pageSize).then(response => {
            this.checkPreviewList = response.data.data.billPreviewList
        })
      } else {
        checkApi.findCheckPreviewByStatusIdPageBy(this.statusId,this.currentPage-1,this.pageSize).then(response => {
            this.checkPreviewList = response.data.data.billPreviewList
        })
      }
    },
    getTotal(){
      if(this.showAll){
        checkApi.getCount().then(response => {
          
          this.total = response.data.data
        })
      }else{
        checkApi.getCountBy(this.statusId).then(response => {
          this.total = response.data.data
        })
      }
    },
    handleCurrentChange(page){
      this.currentPage = page
      this.doGetPreviewLList()
    },
    handleSizeChange(size){
      this.pageSize = size
      this.doGetPreviewLList()
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