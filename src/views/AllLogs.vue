<template>
  <div class="container">
    <el-table :data="page" border style="width: 100%" height="93.4%" stripe>
      <el-table-column type="index" label="序号" fixed></el-table-column>
      <el-table-column prop="staffAccount" label="员工账号"></el-table-column>
      <el-table-column prop="staffName" label="员工姓名"></el-table-column>
      <el-table-column prop="operation" label="操作" width="200px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="requestMethod" label="请求方法" show-overflow-tooltip></el-table-column>
      <el-table-column prop="requestParams" label="请求参数" show-overflow-tooltip></el-table-column>
      <el-table-column prop="time" label="执行时间（毫秒）"></el-table-column>
      <el-table-column prop="ip" label="ip"></el-table-column>
      <el-table-column prop="date" label="时间" width="200px"></el-table-column>
    </el-table>
    <div class="footter">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,prev, pager, next"
        background
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import logApi from "../api/log";

export default {
  data() {
    return {
      page: [],
      currentPage: 1,
      pageSize: 11,
      total: 0
    };
  },
  created() {
    this.showTable();
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 30) {
        return value.slice(0, 30) + "...";
      }
      return value;
    }
  },
  methods: {
    showTable() {
      logApi.pageBy(this.currentPage - 1, this.pageSize).then(response => {
        // console.log(response.data.data);
        this.page = response.data.data.content;
        this.total = response.data.data.totalElements;
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.showTable();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.showTable();
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
}
</style>