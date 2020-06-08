<template>
  <div class="container">
    <div>
      <el-radio v-model="showReturn" :label="true">还车单</el-radio>
      <el-radio v-model="showReturn" :label="false">采购单</el-radio>
    </div>
    <el-table
      :data="returnPreviewList"
      border
      style="width: 100%"
      height="85%"
      @selection-change="handleSelectionChange"
      stripe
      v-show="showReturn"
    >
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
      <el-table-column type="selection"></el-table-column>
    </el-table>
    <el-table
      v-show="!showReturn"
      :data="purchasePreviewList"
      border
      style="width: 100%"
      height="85%"
      @selection-change="handleSelectionChange1"
      stripe
    >
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
          <el-tag v-if="scope.row.statusId===7" type="success">{{scope.row.statusName}}</el-tag>
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
        :disabled="rBillIdList == 0&&pBillIdList == 0"
      >提交</el-button>
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
    <el-dialog :visible.sync="pDialogVisible" center v-if="true">
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
        <el-table-column label="编号" prop="billId"></el-table-column>
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
          <el-table-column prop="refBillId" label="关联缺货单编号"></el-table-column>
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
import returnApi from "../api/return";
import { Message } from "element-ui";
import router from "../router";
import store from "../store";
import checkApi from "../api/check";
import purchaseApi from "../api/purchase";

export default {
  data() {
    return {
      admin: {},
      returnPreviewList: [],
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
      rBillIdList:[],
      pBillIdList:[],
      billParams: {
        billIdList: []
      },
      showReturn: true,
      purchasePreviewList: [],
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
      pDialogVisible: false
    };
  },
  created() {
    this.admin = store.getters.admin;
    Message.info("请选择待验收还车单或采购单验收");
    this.doGetPreviewLList();
  },
  methods: {
    handleDetailClick(billId) {
      if(this.showReturn){
        returnApi
        .findReturnVoById(billId)
        .then(response => {
          this.returnVo = response.data.data;
          this.billReturnTitle[0] = response.data.data.returnDto;
        })
        .finally(() => {
          this.dialogVisible = true;
        });
      }else{
        purchaseApi.findPurchaseVoById(billId).then(response => {
          this.purchaseVo = response.data.data
          this.billPurchaseTitle[0] = response.data.data.purchaseDto
        }).finally(() => {
          this.pDialogVisible = true
        })
      }
    },
    doGetPreviewLList() {
      returnApi.findReturnPreviewVoByStatusId(6).then(response => {
        this.returnPreviewList = response.data.data.commonBillPreviewList;
      });
      purchaseApi.findAllPurchasePreviewByStatusId(6).then(response => {
        this.purchasePreviewList = response.data.data.billPreviewList;
      });
    },
    handleSelectionChange(val) {
      let billParams = [];
      val.forEach(element => {
        billParams.push(element.billId);
      });
      this.rBillIdList = billParams;
    },
    handleSelectionChange1(val) {
      let billParams = [];
      val.forEach(element => {
       billParams.push(element.billId);
      });
      this.pBillIdList = billParams;
      // console.log(this.billParams.billIdList);
      
    },
    handleSubmit() {
      this.rBillIdList.forEach(element => {
        this.billParams.billIdList.push(element)
      });
      this.pBillIdList.forEach(element => {
        this.billParams.billIdList.push(element)
      });
      // console.log(this.billParams.billIdList);
      
      checkApi.generateBillCheck(this.billParams).then(response => {
        let billId = response.data.data;
        router.push({ name: "addToCheckSuccess", params: { billId: billId } });
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