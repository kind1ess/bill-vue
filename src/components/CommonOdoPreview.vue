<template>
  <div class="container">
    <el-table :data="billPreviewList" border style="width: 100%" height="93%" stripe>
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
      <el-table-column label="状态" width="100px">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.statusId === 5">{{scope.row.statusName}}</el-tag>
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
    <div>
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
          <el-table-column label="单据编号" prop="billId" show-overflow-tooltip></el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="更新时间" prop="updateTime"></el-table-column>
          <el-table-column label="状态" prop="statusName"></el-table-column>
        </el-table>
        <div class="goods_list">
          <el-table
            :data="odoVo.goodsWithoutPriceList"
            border
            style="width:100%"
            @row-click="handleRowClick"
            class="tb-edit"
            highlight-current-row
          >
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column prop="refBillId" label="关联订单编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="goodsId" label="产品编号"></el-table-column>
            <el-table-column prop="commodityName" label="产品名称"></el-table-column>
            <el-table-column prop="specificationName" label="产品规格"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column label="出库数量">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.amount"
                  placeholder="请输入出库数量"
                  @change="handleEdit(scope.$index,scope.row)"
                ></el-input>
                <span>{{scope.row.amount}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import odoApi from "../api/odo";
import { Message } from "element-ui";
import router from "../router";

export default {
  props: ["statusId"],
  data() {
    return {
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
          createTime: "2020-05-26T10:26:03.993Z",
          staffId: "string",
          staffName: "string",
          staffTelephone: "string",
          statusId: 0,
          statusName: "string",
          updateTime: "2020-05-26T10:26:03.993Z"
        }
      },
      dialogVisible: false,
      showDialog: false,
      billOdoTitle: [],
      currentPage: 1,
      pageSize: 8,
      total: 0
    };
  },
  created() {
    this.getTotal();
    this.showTable(this.statusId, this.currentPage - 1, this.pageSize);
  },
  methods: {
    handleDetailClick(billId) {
      odoApi.findOdoVoById(billId).then(response => {
        this.odoVo = response.data.data;
        this.billOdoTitle[0] = response.data.data.odoDto;
        this.showDialog = true;
        this.dialogVisible = true;
      });
    },
    handleRowClick(row, column, event) {},
    handleEdit(index, row) {
      console.log(row);
      console.log(this.odoVo.goodsWithoutPriceList[index]);
    },
    showTable(statusId, page, size) {
      odoApi
        .findOdoPreviewByStatusIdPageBy(statusId, page, size)
        .then(response => {
          this.billPreviewList = response.data.data.billPreviewList;
        });
    },
    getTotal() {
      odoApi.getCountBy(this.statusId).then(response => {
        this.total = response.data.data;
      });
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.showTable(this.statusId, this.currentPage - 1, this.pageSize);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.showTable(this.statusId, this.currentPage - 1, this.pageSize);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  .el-button.success {
    position: relative;
    margin-right: 5px;
  }
  .tb-edit .el-input {
    display: none;
  }
  .tb-edit .current-row .el-input {
    display: block;
  }
  .tb-edit .current-row .el-input + span {
    display: none;
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