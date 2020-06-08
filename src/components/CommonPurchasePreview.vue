<template>
  <div class="container">
    <el-table :data="billPreviewList" border style="width: 100%" height="93%" stripe>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="采购单编号">
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
      <el-table-column label="修改时间">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 15px"></i>
          <span>{{scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.statusId===7"
            type="success"
          >{{scope.row.statusName}}</el-tag>
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
        <el-table-column label="编号" prop="billId" show-overflow-tooltip></el-table-column>
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
          <el-table-column prop="refBillId" label="关联缺货单编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goodsId" label="产品编号"></el-table-column>
          <el-table-column prop="commodityName" label="产品名称"></el-table-column>
          <el-table-column prop="specificationName" label="产品规格"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="price" label="产品单价"></el-table-column>
          <el-table-column prop="amount" label="订货数量"></el-table-column>
          <el-table-column prop="sumPrice" label="小计"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import purchaseApi from "../api/purchase";
import { Message } from "element-ui";
import router from "../router";
import store from "../store";

export default {
  props: ["statusId", "showAll"],
  data() {
    return {
      admin: {},
      billPreviewList: [],
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
      billPurchaseTitle: [],
      dialogVisible: false,
      currentPage: 1,
      pageSize: 8,
      total: 0
    };
  },
  created() {
    this.admin = store.getters.admin;
    this.getTotal();
    this.showTable();
  },
  methods: {
    handleDetailClick(billId) {
    purchaseApi.findPurchaseVoById(billId).then(response => {
        this.purchaseVo = response.data.data
        this.billPurchaseTitle[0] = response.data.data.purchaseDto
        this.dialogVisible = true
    })
    },
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
    },
    showTable() {
      if (this.showAll) {
        purchaseApi
          .findAllPurchasePreviewPageBy(this.currentPage - 1, this.pageSize)
          .then(response => {
            this.billPreviewList = response.data.data.billPreviewList;
          });
      } else {
        purchaseApi
          .findAllPurchasePreviewByStatusIdPageBy(
            this.statusId,
            this.currentPage - 1,
            this.pageSize
          )
          .then(response => {
            this.billPreviewList = response.data.data.billPreviewList;
          });
      }
    },
    getTotal() {
        if(this.showAll){
            purchaseApi.getCount().then(response => {
                this.total = response.data.data
            })
        }
        else{
            purchaseApi.getCountBy(this.statusId).then(response => {
                this.total = response.data.data
            })
        }
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.showTable();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.showTable();
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