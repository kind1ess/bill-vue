<template>
  <div class="container">
    <el-table :data="returnPreviewList" border style="width: 100%" height="93%" stripe>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="还车单编号">
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
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.statusId===2" type="danger">{{scope.row.statusName}}</el-tag>
          <el-tag v-else-if="scope.row.statusId===7" type="success">{{scope.row.statusName}}</el-tag>
          <el-tag v-else>{{scope.row.statusName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核" width="100px" v-if="showVerify">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-close"
            circle
            size="small"
            @click="handleVerify(scope.row.billId,2)"
            :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="small"
            @click="handleVerify(scope.row.billId,6)"
            :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
          ></el-button>
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
    </el-dialog>
  </div>
</template>

<script>
import returnApi from "../api/return";
import { Message } from "element-ui";
import router from "../router";
import store from "../store";

export default {
  props: ["statusId", "showVerify", "showAll"],
  data() {
    return {
      admin: {},
      returnPreviewList: [],
      verifyParams: {},
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
      billReturnTitle: [],
      dialogVisible: false,
      currentPage:1,
      pageSize:8,
      total:0
    };
  },
  created() {
    this.admin = store.getters.admin;
    this.getTotal()
    this.doGetPreviewLList()
  },
  methods: {
    handleDetailClick(billId) {
      returnApi
        .findReturnVoById(billId)
        .then(response => {
          this.returnVo = response.data.data;
          this.billReturnTitle[0] = response.data.data.returnDto;
        })
        .finally(() => {
          this.dialogVisible = true;
        });
    },
    handleVerify(billId, status) {
      console.log(billId, status);
      this.verifyParams.billId = billId;
      this.verifyParams.statusId = status;
      returnApi
        .verifyBillReturn(this.verifyParams)
        .then(response => {
          if (response) {
            Message.success("审核还车单成功！");
          }
        })
        .finally(() => {
            this.doGetPreviewLList()
        });
    },
    doGetPreviewLList() {
      if (this.showAll) {
        returnApi.findAllReturnPreviewVoPageBy(this.currentPage-1,this.pageSize).then(response => {
          this.returnPreviewList = response.data.data.commonBillPreviewList;
        });
      } else {
        returnApi
          .findReturnPreviewVoByStatusIdPageBy(this.statusId,this.currentPage-1,this.pageSize)
          .then(response => {
            this.returnPreviewList = response.data.data.commonBillPreviewList;
          });
      }
    },
    getTotal(){
      if(this.showAll){
        returnApi.getCount().then(response => {
          this.total = response.data.data
        })
      }else{
        returnApi.getCountBy(this.statusId).then(response => {
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