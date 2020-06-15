<template>
  <div class="container">
    <el-table :data="billPreviewList" border style="width: 100%" height="93%" stripe>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="缺货单编号" width="380px">
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
          <el-tag type="success" v-if="scope.row.statusId === 12">{{scope.row.statusName}}</el-tag>
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
        <el-table :data="billShortageTitle" border>
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
            :data="shortageVo.listGoods"
            border
            style="width:100%"
            class="tb-edit"
            highlight-current-row
          >
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column prop="goodsId" label="产品编号"></el-table-column>
            <el-table-column prop="commodityName" label="产品名称"></el-table-column>
            <el-table-column prop="specificationName" label="产品规格"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="amount" label="缺货数量"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import shortageApi from "../api/shortage";
import { Message } from "element-ui";
import router from "../router";

export default {
  props: ["statusId", "showAll"],
  data() {
    return {
      billPreviewList: [],
      shortageVo: {
        adminBillTitle: {
          billId: "string",
          createTime: "2020-06-03T13:56:51.945Z",
          staffId: "string",
          staffName: "string",
          staffTelephone: "string",
          statusId: 0,
          statusName: "string",
          updateTime: "2020-06-03T13:56:51.945Z"
        },
        listGoods: [
          {
            amount: 0,
            commodityName: "string",
            goodsId: 0,
            id: 0,
            specificationName: "string",
            unit: "string"
          }
        ]
      },
      billShortageTitle: [],
      dialogVisible: false,
      showDialog: false,
      currentPage: 1,
      pageSize: 8,
      total: 0
    };
  },
  created() {
    this.getTotal();
    this.showTable();
  },
  methods: {
    handleDetailClick(billId) {
      //   odoApi.findOdoVoById(billId).then(response => {
      //     this.odoVo = response.data.data;
      //     this.billOdoTitle[0] = response.data.data.odoDto;
      //     this.showDialog = true;
      //     this.dialogVisible = true;
      //   });
      shortageApi.findShortageVoById(billId).then(response => {
        this.shortageVo = response.data.data;
        this.billShortageTitle[0] = response.data.data.adminBillTitle;
        this.showDialog = true;
        this.dialogVisible = true;
      });
    },
    showTable() {
      if (this.showAll) {
        shortageApi
          .findAllShortagePreviewVoPageBy(this.currentPage - 1, this.pageSize)
          .then(response => {
            this.billPreviewList = response.data.data.billPreviewList;
          });
      } else {
        shortageApi
          .findAllShortagePreviewVoByStatusIdPageBy(
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
      if (this.showAll) {
        shortageApi.getCount().then(response => {
          this.total = response.data.data;
        });
      } else {
        shortageApi.getCountByStatusId(this.statusId).then(response => {
          this.total = response.data.data;
        });
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
  -webkit-font-smoothing: antialiased;
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