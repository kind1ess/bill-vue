<template>
  <div class="container">
    <el-table :data="selectedReserve" style="width:100%" border stripe height="85%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="goodsId" label="货物编号"></el-table-column>
      <el-table-column prop="commodityName" label="货物名称"></el-table-column>
      <el-table-column prop="specificationName" label="货物规格"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="odoAmount" label="出库数量"></el-table-column>
      <el-table-column prop="enterAmount" label="入库数量"></el-table-column>
      <el-table-column prop="allAmount" label="库存量"></el-table-column>
      <el-table-column label="缺货数量">
        <template slot-scope="scope">
          <el-input v-model="shortageParams[scope.$index].amount" placeholder="请输入缺货数量"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button
        type="success"
        class="submit_button"
        @click="handleSubmit"
        :disabled="selectedReserve.length == 0"
      >提交</el-button>
    </div>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import shortageApi from '../api/shortage'
import router from '../router'

export default {
  data() {
    return {
      selectedReserve: [],
      shortageParams: []
    };
  },
  created() {
    let selectedReserveJson = sessionStorage.getItem("selectedReserve");
    let selectedReserve = JSON.parse(selectedReserveJson);
    // console.log(selectedReserve);
    this.selectedReserve = selectedReserve;
    this.selectedReserve.forEach(element => {
      // console.log(element);
      let param = {};
      param.goodsId = element.goodsId;
      param.amount = 0;
      this.shortageParams.push(param);
    });
    // console.log(this.shortageParams);
  },
  methods: {
    handleSubmit() {
        let flag = true
        for (let index = 0; index < this.shortageParams.length; index++) {
            if(this.shortageParams[index].amount === ""||this.shortageParams[index].amount === 0){
                flag = false
                break
            }
        }
        if(!flag){
            Message.error("缺货数量应大于0")
        }else{
            // console.log(JSON.stringify(this.shortageParams));
            let param = {}
            param.shortageParams = this.shortageParams
            // console.log(JSON.stringify(param));
            shortageApi.generateShortage(param).then(response => {
                console.log(response);
                router.push({name:"addToShortageSuccess",params:{billId:response.data.data}})
            })
        }
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