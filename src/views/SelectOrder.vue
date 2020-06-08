<template>
  <div class="container">
    <el-table
      :data="orderPreviewList"
      border
      style="width: 100%"
      height="85%"
      @selection-change="handleSelectionChange"
      stripe
    >
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
          <el-tag v-else-if="scope.row.statusId===5" type="success">{{scope.row.statusName}}</el-tag>
          <el-tag v-else>{{scope.row.statusName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="70px">
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
import odoApi from "../api/odo";

export default {
  data() {
    return {
      admin: {},
      orderPreviewList: [],
      orderVo: {
        orderDto: {}
      },
      billOrderTitle:[],
      dialogVisible: false,
      billParams: {
        billIdList: []
      }
    };
  },
  created() {
    this.admin = store.getters.admin;
    orderApi.findOrderPreviewVoByStatusId(3).then(response => {
      this.orderPreviewList = response.data.data.orderPreviewDtoList;
      Message.info("请选择待出库订单出库");
    });
  },
  methods: {
    handleDetailClick(billId) {
      orderApi.findOrderVo(billId).then(response => {
        this.orderVo = response.data.data;
        this.billOrderTitle[0] = response.data.data.orderDto
        this.dialogVisible = true;
      });
    },
    handleSelect(billId, $event) {
      if ($event) {
        this.billParams.billIdList.push(billId);
      } else {
        this.billParams.billIdList.splice(
          this.billParams.billIdList.indexOf(billId),
          1
        );
      }
      // console.log(this.billIdList);
    },
    handleSubmit() {
      odoApi
        .addToOdo(this.billParams)
        .then(response => {
          let billId = response.data.data;
          router.push({ name: "odoVo", params: { billId: billId } });
        })
        .finallyy(() => {
          Message.success("发货成功！");
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