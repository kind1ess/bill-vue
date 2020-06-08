<template>
  <div id="main">
    <el-button type="warning" @click="dialogFormVisible = true" plain>加入清单</el-button>

    <el-dialog title="加入清单" :visible.sync="dialogFormVisible" center>
      <div class="block">
        <el-image :src="imgUrl" lazy></el-image>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-input-number v-model="amount" :min="1" :max="10" label="描述文字"></el-input-number>
        <el-button plain type="warning" :loading="loading" @click="addToCart">加入清单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cartApi from "../api/cart";
import { Message } from "element-ui";

export default {
  props: ["goodsId", "imgUrl"],
  data() {
    return {
      amount: 1,
      dialogFormVisible: false,
      loading: false,
      fit: "fill"
    };
  },
  methods: {
    addToCart() {
      this.loading = true;
      const goodsId = this.goodsId;
      const amount = this.amount;
      const cartParams = {
        goodsId,
        amount
      };
      cartApi
        .addToCart(cartParams)
        .then(response => {
          if (response.data.code === 200) {
            Message.success("加入购物车成功");
            this.dialogFormVisible = false;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.block{
  padding: 30px 0 30px 0;
  height: 400px;
  width: 400px;
  // border: 1px red solid;
  margin: auto;
  .el-image{
    width: 100%;
  }
}
</style>