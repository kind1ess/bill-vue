<template>
  <div class="container">
      <div class="order_dto">
        <el-form :model="orderVo" label-width="70px">
          <el-form-item label="订单编号">
            <el-input v-model="orderVo.orderDto.billId" readonly></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="orderVo.orderDto.createTime" readonly></el-input>
          </el-form-item>
          <el-form-item label="用户id">
            <el-input v-model="orderVo.orderDto.userId" readonly></el-input>
          </el-form-item>
          <el-form-item label="用户账号">
            <el-input v-model="orderVo.orderDto.userAccount" readonly></el-input>
          </el-form-item>
          <el-form-item label="用户电话">
            <el-input v-model="orderVo.orderDto.userTelephone" readonly></el-input>
          </el-form-item>
          <el-form-item label="用户地址">
            <el-input v-model="orderVo.orderDto.userAddress" readonly></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-input v-model="orderVo.orderDto.statusName" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="goods_list">
        <el-table :data="orderVo.goodsVoList" border style="width:100%">
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
  </div>
</template>

<script>
import orderApi from "../api/order";

export default {
  data() {
    return {
      orderVo: {},
      dialogVisible: false
    };
  },
  created() {
    let billId = this.$route.params.billId
    orderApi.findOrderVo(billId).then(response => {
      console.log(response.data.data);
      this.orderVo = response.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  .order_dto {
    width: 33%;
    position: relative;
    margin: auto;
  }
}
</style>