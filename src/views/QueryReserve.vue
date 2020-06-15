<template>
  <div class="container">
    <el-table
      :data="reserveAmountList"
      style="width:100%"
      border
      stripe
      height="85%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="goodsId" label="货物编号"></el-table-column>
      <el-table-column prop="commodityName" label="货物名称"></el-table-column>
      <el-table-column prop="specificationName" label="货物规格"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="odoAmount" label="出库数量"></el-table-column>
      <el-table-column prop="enterAmount" label="入库数量"></el-table-column>
      <el-table-column prop="allAmount" label="库存量"></el-table-column>
      <el-table-column type="selection" width="70px"></el-table-column>
    </el-table>
    <div class="footer">
        <el-button
        type="success"
        class="submit_button"
        @click="handleSubmit"
        :disabled="selectedReserve.length == 0"
      >生成缺货单</el-button>
    </div>
  </div>
</template>

<script>
import reserveApi from "../api/reserve";
import router from '../router'
export default {
  data() {
    return {
      reserveAmountList: [],
      selectedReserve:[]
    };
  },
  created() {
    reserveApi.findAllCount().then(response => {
      this.reserveAmountList = response.data.data;
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedReserve = val
    },
    handleSubmit(){
        var selectedReserve = this.selectedReserve
        sessionStorage.setItem("selectedReserve",JSON.stringify(selectedReserve))
        router.push({path:"/dashboard/odo/odoOptions/query/generateShortage"})
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  -webkit-font-smoothing: antialiased;
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