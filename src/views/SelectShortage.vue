<template>
  <div class="container">
    <div class="edit">
      <el-input placeholder="请输入收货地址" prefix-icon="el-icon-location-information" v-model="purchaseParams.billPurchase.address"></el-input>
      <el-date-picker
        v-model="purchaseParams.billPurchase.sendTime"
        type="datetime"
        placeholder="选择发货日期时间"
        align="right"
        :picker-options="pickerOptions"
        style="width:100%;position:relative;margin-top:10px"
      ></el-date-picker>
    </div>
    <br />
    <el-table
      :data="billPreviewList"
      border
      style="width: 100%"
      height="72%"
      @selection-change="handleSelectionChange"
      stripe
    >
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
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.statusId === 12">{{scope.row.statusName}}</el-tag>
          <el-tag v-else>{{scope.row.statusName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="70px" type="selection"></el-table-column>
    </el-table>
    <div class="footer">
      <el-button
        type="success"
        class="submit_button"
        @click="handleSubmit"
        :disabled="purchaseParams.billIdList.length == 0||purchaseParams.billPurchase.address == ''||purchaseParams.billPurchase.sendTime == '' "
      >提交</el-button>
    </div>
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
        <el-table-column label="单据编号" prop="billId"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="状态" prop="statusName"></el-table-column>
      </el-table>
      <div class="goods_list">
        <el-table :data="shortageVo.listGoods" border style="width:100%">
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
</template>

<script>
import { Message } from "element-ui";
import router from "../router";
import store from "../store";
import shortageApi from "../api/shortage";
import invoiceApi from "../api/invoice";
import purchaseApi from '../api/purchase';

export default {
  data() {
    return {
      admin: {},
      billPreviewList: [],
      shortageVo: {
        adminBillTitle: {
          billId: "string",
          createTime: "2020-06-04T02:03:25.495Z",
          staffId: "string",
          staffName: "string",
          staffTelephone: "string",
          statusId: 0,
          statusName: "string",
          updateTime: "2020-06-04T02:03:25.495Z"
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
      purchaseParams: {
        billIdList: [],
        billPurchase: {
          address: "",
          sendTime: ""
        }
      },
      pickerOptions: {
          shortcuts: [{
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
    };
  },
  created() {
    this.admin = store.getters.admin;
    shortageApi.findAllShortagePreviewVoByStatusId(11).then(response => {
      // console.log(response);

      this.billPreviewList = response.data.data.billPreviewList;
      Message.info("请选择缺货单采购");
    });
  },
  methods: {
    handleDetailClick(billId) {
      shortageApi
        .findShortageVoById(billId)
        .then(response => {
          this.shortageVo = response.data.data;
          this.billShortageTitle[0] = response.data.data.adminBillTitle;
        })
        .finally(() => {
          this.dialogVisible = true;
        });
    },
    handleSubmit() {
        let t = new Date(this.purchaseParams.billPurchase.sendTime)
        this.purchaseParams.billPurchase.sendTime =  t.getFullYear()+"-"+this.formatZero((t.getMonth()+1))+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()
        console.log(JSON.stringify(this.purchaseParams));
        purchaseApi.generatePurchase(this.purchaseParams).then(response => {
            router.push({name:"addToPurchaseSuccess",params:{billId:response.data.data}})
        })
    },
    formatZero(month){
        if(month < 10){
          return "0"+month
        }
        else return month
    },
    handleSelectionChange(val) {
        let param = []
        val.forEach(element => {
            param.push(element.billId)
        });
        this.purchaseParams.billIdList = param
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .edit {
    width: 33%;
    position: relative;
    margin: auto;
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