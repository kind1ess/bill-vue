<template>
  <div class="container">
    <Nav :activeIndex="'2-3'" style="position:fixed;z-index:999"></Nav>
    <!-- <h1>hello</h1> -->
    <div class="bill_order_history_container">
      <div v-if="returnPreviewList.length===0" class="non_order">
        您还没有归还过订单！点击
        <el-button type="text" @click="handleReturn">这里</el-button>归还
      </div>
      <el-row>
        <el-col :span="12" v-for="returnPreview in returnPreviewList" :key="returnPreview.billId">
          <el-card class="order_card" shadow="hover">
            <div slot="header" class="clearfix">
              <!-- <el-tag v-if="orderTitleDto.statusId===1">{{orderTitleDto.statusName}}</el-tag> -->
              <el-tag v-if="returnPreview.statusId===2" type="danger">{{returnPreview.statusName}}</el-tag>
              <el-tag v-else-if="returnPreview.statusId===7" type="success">{{returnPreview.statusName}}</el-tag>
              <el-tag v-else>{{returnPreview.statusName}}</el-tag>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="checkBillOrderDetail(returnPreview.billId)"
              >查看详情</el-button>
            </div>
            <div class="order_id">
              <span class="el-icon-s-order"></span>
              <span class="content">{{returnPreview.billId}}</span>
            </div>
            <div class="create_time">
              <span class="el-icon-time"></span>
              <span class="content">{{returnPreview.createTime}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import orderApi from "../api/order";
import router from "../router";
import returnApi from "../api/return";
import {Message} from 'element-ui'

export default {
  name: "BillOrderHistory",
  components: {
    Nav
  },
  data() {
    return {
      returnPreviewList: []
    };
  },
  created() {
    returnApi.findReturnPreviewByUserId().then(response => {
      this.returnPreviewList = response.data.data.commonBillPreviewList;
    });
  },
  methods: {
    checkBillOrderDetail(billId) {
      router.push({
          name:"returnDetail",
          params:{billId:billId}
      });
    },
    handleReturn(){
      Message.info("请选择已发货订单")
      router.push({path:"/billOrderHistory"})
    }
  }
};
</script>

<style lang="less" scoped>
.container{
  height: 97vh;
  width: 201vh;
  position: fixed;
  overflow: auto;
  background: url(https://images.pexels.com/photos/686230/pexels-photo-686230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500);
  .bill_order_history_container {
  width: 70%;
  height: auto;
  position: relative;
  top: 75px;
  margin: auto;
  .non_order {
    width: 100%;
    display: inline-block;
    position: relative;
    text-align: center;
    top: 200px;
  }
  .order_card {
    width: 98%;
    .content {
      color: #9c9c9c;
      font-size: 12px;
    }
  }
}
.footer {
  height: 100px;
  width: 100%;
}
}
</style>