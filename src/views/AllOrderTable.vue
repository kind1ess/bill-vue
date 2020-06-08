<template>
  <div class="container">
    <el-table :data="orderPreviewList" border style="width: 100%" height="93%" stripe>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="订单编号">
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
          <el-tag
            v-else-if="scope.row.statusId===5||scope.row.statusId===10"
            type="success"
          >{{scope.row.statusName}}</el-tag>
          <el-tag v-else>{{scope.row.statusName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核" width="100px">
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
            @click="handleVerify(scope.row.billId,3)"
            :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footter">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,prev, pager, next"
        background
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" center v-if="true">
      <el-table :data="billOrderTitle" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" class="table-expand" label-width="100px">
              <el-form-item label="订单编号：">
                <span>{{scope.row.billId}}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{scope.row.createTime}}</span>
              </el-form-item>
              <el-form-item label="用户编号：">
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
              <el-form-item label="订单状态：">
                <span>{{scope.row.statusName}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="billId"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="订单状态" prop="statusName"></el-table-column>
      </el-table>
      <div class="goods_list">
        <el-table
          :data="orderVo.goodsVoList"
          border
          style="width:100%"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column label="序号" type="index"></el-table-column>
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
import orderApi from "../api/order";
import { Message } from "element-ui";
import router from "../router";
import store from "../store";

export default {
  data() {
    return {
      admin: {},
      orderPreviewList: [],
      verifyParams: {},
      orderVo: {
        orderDto: {}
      },
      billOrderTitle: [],
      dialogVisible: false,
      currentPage: 1,
      pageSize: 8,
      total: 0
    };
  },
  created() {
    this.admin = store.getters.admin;
    this.getTotal();
    this.showTable(this.currentPage - 1, this.pageSize);
  },
  methods: {
    handleDetailClick(billId) {
      orderApi.findOrderVo(billId).then(response => {
        this.orderVo = response.data.data;
        this.billOrderTitle[0] = response.data.data.orderDto;
        this.dialogVisible = true;
      });
    },
    handleVerify(billId, status) {
      console.log(billId, status);
      this.verifyParams.billId = billId;
      this.verifyParams.statusId = status;
      orderApi
        .verifyOrder(this.verifyParams)
        .then(response => {
          if (response) {
            Message.success("审核订单完成！");
            // router.go(0);
          }
        })
        .finally(() => {
          // orderApi.findAllOrderTitleVo().then(response => {
          //   this.orderPreviewList = response.data.data.orderPreviewDtoList;
          // });
          this.showTable(this.currentPage - 1, this.pageSize);
        });
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
        if (!values.every(value => isNaN(value)) && index === 7) {
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
    showTable(page, size) {
      orderApi.findAllOrderTitleVo(page, size).then(response => {
        this.orderPreviewList = response.data.data.orderPreviewDtoList;
      });
    },
    getTotal() {
      orderApi.getCount().then(response => {
        this.total = response.data.data;
      });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.showTable(this.currentPage - 1, this.pageSize);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.showTable((this.currentPage - 1, this.pageSize));
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  // border: 1px solid red;
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