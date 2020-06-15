<template>
  <div class="container">
    <el-select v-model="value" @change="handleChange" placeholder="选择部门">
      <el-option label="所有员工" value="0"></el-option>
      <el-option label="销售部" value="1"></el-option>
      <el-option label="仓库管理部" value="2"></el-option>
      <el-option label="发货部" value="3"></el-option>
      <el-option label="验收部" value="4"></el-option>
      <el-option label="采购部" value="5"></el-option>
      <el-option label="人事部" value="6"></el-option>
      <el-option label="总经理" value="7"></el-option>
      <el-option label="技术部" value="8"></el-option>
    </el-select>
    <transition>
      <el-table
        :data="staffVoList.filter(data => !value||data.departmentId==value||value==0)"
        border
        style="width:100%;margin-top:20px"
        height="90%"
        @row-click="handleRowClick"
        class="tb-edit"
        highlight-current-row
        stripe
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="staffId" label="编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column label="密码">
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="scope.row.password"
              placeholder="请输入密码"
              @change="handleEdit(scope.$index,scope.row)"
            ></el-input>
            <span>{{scope.row.password}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="scope.row.name"
              placeholder="请输入姓名"
              @change="handleEdit(scope.$index,scope.row)"
            ></el-input>
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="scope.row.telephone"
              placeholder="请输入电话"
              @change="handleEdit(scope.$index,scope.row)"
            ></el-input>
            <span>{{scope.row.telephone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="部门"></el-table-column>
      </el-table>
    </transition>
  </div>
</template>

<script>
import adminApi from "../api/admin";
export default {
  data() {
    return {
      // staffPreviewVo: {
      //   staffPreviewDtoList: [
      //     {
      //       departmentId: 0,
      //       departmentName: "string",
      //       staffId: "string",
      //       staffName: "string"
      //     }
      //   ]
      // },
      staffVoList: [
        {
          account: "string",
          departmentId: 0,
          departmentName: "string",
          name: "string",
          password: "string",
          position: "string",
          staffId: "string",
          telephone: "string"
        }
      ],
      value: null,
      search: ""
    };
  },
  created() {
    adminApi.findAllAdminVo().then(response => {
      // console.log(response);
      this.staffVoList = response.data.data;
    });
  },
  methods: {
    handleRowClick(row, column, event) {
      console.log("row:", row, "column:", column, "event:", event);
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
  .tb-edit .el-input {
    display: none;
  }
  .tb-edit .current-row .el-input {
    display: block;
  }
  .tb-edit .current-row .el-input + span {
    display: none;
  }
}
</style>