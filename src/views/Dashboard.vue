<template>
  <el-container style="height: 735px; border: 1px solid #eee;width:100%">
    <el-aside width="200px" style="background-color: #32323b">
      <el-menu
        router
        default-active="index"
        background-color="#32323b"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="width:199px;over-flow:auto"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-order"></i>订单管理
          </template>
          <el-menu-item-group>
            <template slot="title">历史</template>
            <el-submenu index="1-1">
              <template slot="title">订单预览</template>
              <el-menu-item
                index="/dashboard/order/orderPreview/allOrderTable"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >所有订单</el-menu-item>
              <el-menu-item
                index="/dashboard/order/orderPreview/toBeVeryfiedOrder"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >待审核订单</el-menu-item>
              <el-menu-item
                index="/dashboard/order/orderPreview/failedOrder"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >未通过订单</el-menu-item>
              <el-menu-item
                index="/dashboard/order/orderPreview/toBeOutBoundOrder"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >待出库订单</el-menu-item>
              <el-menu-item
                index="/dashboard/order/orderPreview/toBeShippedOrder"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >待发货订单</el-menu-item>
              <el-menu-item
                index="/dashboard/order/orderPreview/shippedOrder"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >已发货订单</el-menu-item>
              <el-menu-item
                index="/dashboard/order/orderPreview/returnedOrder"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >已归还订单</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>仓库管理
          </template>
          <el-menu-item-group>
            <template slot="title">历史</template>
            <el-submenu index="2-1">
              <template slot="title">出库单预览</template>
              <el-menu-item
                index="/dashboard/odo/odoPreview/allOdoTable"
                :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
              >所有出库单</el-menu-item>
              <el-menu-item
                index="/dashboard/odo/odoPreview/toBeShippedOdo"
                :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
              >待发货出库单</el-menu-item>
              <el-menu-item
                index="/dashboard/odo/odoPreview/shippedOdo"
                :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
              >已发货出库单</el-menu-item>
            </el-submenu>
            <el-submenu index="2-2">
              <template slot="title">入库单预览</template>
              <el-menu-item
                index="/dashboard/odo/enterPreview/allEnter"
                :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
              >所有入库单</el-menu-item>
            </el-submenu>
            <el-submenu index="2-3">
              <template slot="title">缺货单预览</template>
              <el-menu-item
                index="/dashboard/odo/shortagePreview/allShortage"
                :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
              >所有缺货单</el-menu-item>
              <el-menu-item
                index="/dashboard/odo/shortagePreview/toBePurchasedShortage"
                :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
              >待采购缺货单</el-menu-item>
              <el-menu-item
                index="/dashboard/odo/shortagePreview/purchasedShortage"
                :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
              >已采购缺货单</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item
              index="/dashboard/odo/allOdoTable"
              :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
            >出库单预览</el-menu-item>-->
            <!-- <el-menu-item index="2-2">选项2</el-menu-item> -->
          </el-menu-item-group>
          <!-- <el-menu-item-group title="分组二">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>-->
          <el-menu-item-group title="操作">
            <el-submenu index="2-4">
              <template slot="title">库存选项</template>
              <el-menu-item
                index="/dashboard/odo/odoOptions/outBounds"
                :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
              >出库</el-menu-item>
              <el-menu-item
                index="/dashboard/odo/odoOptions/enter"
                :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
              >入库</el-menu-item>
              <el-menu-item
                index="/dashboard/odo/odoOptions/query"
                :disabled="!(admin.departmentId == 2||admin.departmentId == 7||admin.departmentId == 8)"
              >库存浏览</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-truck"></i>发货管理
          </template>
          <el-menu-item-group>
            <template slot="title">历史</template>
            <el-menu-item
              index="/dashboard/invoice"
              :disabled="!(admin.departmentId == 3||admin.departmentId == 7||admin.departmentId == 8)"
            >发货单预览</el-menu-item>
            <!-- <el-menu-item index="3-2">选项2</el-menu-item> -->
          </el-menu-item-group>
          <el-menu-item-group title="操作">
            <el-submenu index="3-1">
              <template slot="title">发货选项</template>
              <el-menu-item
                index="/dashboard/invoice/invoiceOptions/sendOut"
                :disabled="!(admin.departmentId == 3||admin.departmentId == 7||admin.departmentId == 8)"
              >发货</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
          <!-- <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>-->
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-bicycle"></i>还车管理
          </template>
          <el-menu-item-group>
            <template slot="title">历史</template>
            <el-submenu index="4-1">
              <template slot="title">还车单预览</template>
              <el-menu-item
                index="/dashboard/return/returnPreview/allReturn"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >所有还车单</el-menu-item>
              <el-menu-item
                index="/dashboard/return/returnPreview/toBeVerifiedReturn"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >待审核还车单</el-menu-item>
              <el-menu-item
                index="/dashboard/return/returnPreview/failedReturn"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >未通过还车单</el-menu-item>
              <el-menu-item
                index="/dashboard/return/returnPreview/toBeCheckedReturn"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >待验收还车单</el-menu-item>
              <el-menu-item
                index="/dashboard/return/returnPreview/checkedReturn"
                :disabled="!(admin.departmentId == 1||admin.departmentId == 7||admin.departmentId == 8)"
              >已验收还车单</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-check"></i>验收管理
          </template>
          <el-menu-item-group>
            <template slot="title">历史</template>
            <el-submenu index="5-1">
              <template slot="title">验收单预览</template>
              <el-menu-item
                index="/dashboard/check/checkPreview/allCheck"
                :disabled="!(admin.departmentId == 4||admin.departmentId == 7||admin.departmentId == 8)"
              >所有验收单</el-menu-item>
              <el-menu-item
                index="/dashboard/check/checkPreview/toBeEnteredCheck"
                :disabled="!(admin.departmentId == 4||admin.departmentId == 7||admin.departmentId == 8)"
              >待入库验收单</el-menu-item>
              <el-menu-item
                index="/dashboard/check/checkPreview/enteredCheck"
                :disabled="!(admin.departmentId == 4||admin.departmentId == 7||admin.departmentId == 8)"
              >已入库验收单</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">操作</template>
            <el-menu-item
              index="/dashboard/check/checkOptions/selectReturn"
              :disabled="!(admin.departmentId == 4||admin.departmentId == 7||admin.departmentId == 8)"
            >验收货物</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-shopping-cart-1"></i>采购管理
          </template>
          <el-menu-item-group>
            <template slot="title">历史</template>
            <el-submenu index="6-1">
              <template slot="title">采购单预览</template>
              <el-menu-item
                index="/dashboard/purchase/purchasePreview/allPurchase"
                :disabled="!(admin.departmentId == 5||admin.departmentId == 7||admin.departmentId == 8)"
              >所有采购单</el-menu-item>
              <el-menu-item
                index="/dashboard/purchase/purchasePreview/toBeCheckedPurchase"
                :disabled="!(admin.departmentId == 5||admin.departmentId == 7||admin.departmentId == 8)"
              >待验收采购单</el-menu-item>
              <el-menu-item
                index="/dashboard/purchase/purchasePreview/checkedPurchase"
                :disabled="!(admin.departmentId == 5||admin.departmentId == 7||admin.departmentId == 8)"
              >已验收采购单</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">操作</template>
            <el-menu-item
              index="/dashboard/purchase/doPurchase"
              :disabled="!(admin.departmentId == 5||admin.departmentId == 7||admin.departmentId == 8)"
            >采购</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-user"></i>员工管理
          </template>
          <el-menu-item
            index="/dashboard/staff/allAdminPreview"
            :disabled="!(admin.departmentId == 6||admin.departmentId == 7||admin.departmentId == 8)"
          >所有员工</el-menu-item>
          <el-menu-item
            :disabled="!(admin.departmentId == 6||admin.departmentId == 7||admin.departmentId == 8)"
            index="/dashboard/addAdmin"
          >添加员工</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-setting"></i>系统管理
          </template>
          <el-menu-item
            index="/dashboard/system/allLogs"
            :disabled="!(admin.departmentId == 7||admin.departmentId == 8)"
          >系统日志</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <BreadCrumb class="bread_crumb_container"></BreadCrumb>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button type="text" size="medium" @click="handleProfile">信息</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button
                type="text"
                size="medium"
                :disabled="!(admin.departmentId == 6||admin.departmentId == 7||admin.departmentId == 8)"
                @click="handleAdd"
              >添加</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" size="medium" @click="handleLogout">注销</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>欢迎您，{{admin.name}}</span>
      </el-header>

      <el-main class="main">
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="less" scoped>
.main {
  height: 100%;
  // background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  background-color: #f3f3f3;
}
.el-header {
  background-color: #ffffff;
  // color: rgb(51, 51, 51);
  line-height: 60px;
  box-shadow: 3px 3px 3px #f6f7f7;
  .bread_crumb_container {
    float: left;
  }
}

.el-aside {
  color: #333;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<script>
import store from "../store";
import router from "../router";
import { Message } from "element-ui";
import BreadCrumb from "../components/Breadcrumb";
import { mapActions } from "vuex";

export default {
  components: {
    BreadCrumb
  },
  data() {
    return {
      admin: {},
      index: ""
    };
  },
  computed: {
    // index(){
    //   console.log("~~~~~~~~~~",this.$route.path);
    //   return this.$route.path
    // }
  },
  watch: {
    $route(to, from) {
      // console.log(to.path);
      this.index = to.path;
    }
  },
  created() {
    // console.log("~~~~~~~~~~",this.$route.path);

    this.admin = store.getters.admin;
  },
  methods: {
    ...mapActions(["adminLogout"]),
    handleLogout() {
      this.adminLogout().then(response => {
        Message.success("注销成功！");
      });
    },
    handleProfile() {
      router.push({ path: "/dashboard/adminProfile" });
    },
    handleAdd() {
      router.push({ path: "/dashboard/addAdmin" });
    }
  }
};
</script>