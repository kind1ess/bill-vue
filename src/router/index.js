import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/Home'
import profile from '../views/Profile'
import cart from '../views/Cart'
import orderDetail from '../views//OrderDetail'
import billOrderHistory from '../views/BillOrderHistory'
import adminLogin from '../views/AdminLogin'
import dashboard from '../views/Dashboard'
import allOrderTable from '../views/AllOrderTable'
import bgOrderDetail from '../views/BgOrderDetail'
import allOdoTable from '../views/AllOdoTable'
import adminProfile from '../views/AdminProfile'
import addAdin from '../views/AddAdmin'
import helloAdmin from '../views/HelloAdmin'
import forbidden from '../views/403'
import layout from '../components/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      component: home,
      name: "home",
      meta: {
        title: "首页",
        userAuth: true
      }
    }, {
      path: "/profile",
      component: profile,
      name: "profile",
      meta: {
        title: "个人信息",
        userAuth: true
      }
    }, {
      path: "/cart",
      component: cart,
      name: "cart",
      meta: {
        title: "购物车",
        userAuth: true
      }
    }, {
      path: "/orderDetail/:billOrderId",
      component: orderDetail,
      name: "orderDetail",
      meta: {
        title: "订单详情",
        userAuth: true
      }
    }, {
      path: "/billOrderHistory",
      component: billOrderHistory,
      name: "billOrderHistory",
      meta: {
        title: "历史订单",
        userAuth: true
      }
    }, {
      path: "/returnDetail/:billId",
      component: () => import('../views/ReturnDetail'),
      name: "returnDetail",
      meta: {
        title: "还车单详情",
        userAuth: true
      }
    }, {
      path:"/billReturnHistory",
      component:() => import('../views/BillReturnHistory'),
      name:"billReturnHistory",
      meta:{
        title:"历史还车单",
        userAuth:true
      }
    },{
      path: "/adminLogin",
      component: adminLogin,
      name: "adminLogin",
      meta: {
        title: "管理员登录"
      }
    }, {
      path: "/dashboard",
      component: dashboard,
      name: "dashboard",
      meta: {
        title: "dashboard",
        adminAuth: true
      },
      children: [
        {
          path: '',
          component: helloAdmin,
          name: "helloAdmin",
          meta: {
            adminAuth: true
          }
        },
        {
          path: "order",
          name: "order",
          component: layout,
          redirect: "/dashboard/order/orderPreview",
          meta: {
            title: "订单管理",
            adminAuth: true
          },
          children: [
            {
              path: "orderPreview",
              component: layout,
              name: "orderPreview",
              redirect: "/dashboard/order/orderPreview/allOrderTable",
              meta: {
                title: "订单预览",
                adminAuth: true
              },
              children: [
                {
                  path: "allOrderTable",
                  component: allOrderTable,
                  name: "allOrderTable",
                  meta: {
                    title: "所有订单",
                    adminAuth: true
                  },
                },
                {
                  path: "toBeVeryfiedOrder",
                  component: () => import('../views/ToBeVerifiedOrder'),
                  name: "toBeVeryfiedOrder",
                  meta: {
                    title: "待审核订单",
                    adminAuth: true
                  }
                },
                {
                  path: "failedOrder",
                  component: () => import('../views/FailedOrder'),
                  name: "failedOrder",
                  meta: {
                    title: "未通过订单",
                    adminAuth: true
                  }
                },
                {
                  path: "toBeOutBoundOrder",
                  component: () => import('../views/ToBeOutBoundOrder'),
                  name: "toBeOutBoundOrder",
                  meta: {
                    title: "待出库订单",
                    adminAuth: true
                  }
                },
                {
                  path: "toBeShippedOrder",
                  component: () => import('../views/toBeShippedOrder'),
                  name: "toBeShippedOrder",
                  meta: {
                    title: "待发货订单",
                    adminAuth: true
                  }
                },
                {
                  path: "shippedOrder",
                  component: () => import('../views/shippedOrder'),
                  name: "shippedOrder",
                  meta: {
                    title: "已发货订单",
                    adminAuth: true
                  }
                },
                {
                  path: "returnedOrder",
                  component: () => import('../views/ReturnedOrder'),
                  name: "returnedOrder",
                  meta: {
                    title: "已归还订单",
                    adminAuth: true
                  }
                }
              ]
            },
            // {
            //   path: "allOrderTable",
            //   component: allOrderTable,
            //   name: "allOrderTable",
            //   meta: {
            //     title: "订货单预览",
            //     adminAuth: true
            //   },
            // },
            {
              path: "bgOrderDetail/:billId",
              component: bgOrderDetail,
              name: "bgOrderDetail",
              meta: {
                title: "订货单详情",
                adminAuth: true
              }
            }
          ]
        },
        {
          path: "odo",
          component: layout,
          name: "odo",
          redirect: "/dashboard/odo/odoPreview",
          meta: {
            title: "仓库管理",
            adminAuth: true
          },
          children: [
            {
              path: "odoPreview",
              component: layout,
              name: "odoPreview",
              redirect: "/dashboard/odo/odoPreview/allOdoTable",
              meta: {
                title: "出库单预览",
                adminAuth: true
              },
              children: [
                {
                  path: "allOdoTable",
                  component: allOdoTable,
                  name: "allOdoTable",
                  meta: {
                    title: "所有出库单",
                    adminAuth: true
                  }
                },
                {
                  path: "toBeShippedOdo",
                  component: () => import('../views/ToBeShippedOdo'),
                  name: "toBeShippedOdo",
                  meta: {
                    title: "待发货出库单",
                    adminAuth: true
                  }
                },
                {
                  path: "shippedOdo",
                  component: () => import('../views/ShippedOdo'),
                  name: "shippedOdo",
                  meta: {
                    title: "已发货出库单",
                    adminAuth: true
                  }
                }
              ]
            },
            {
              path:"enterPreview",
              component:layout,
              name:"enterPreview",
              meta:{
                title:"入库单预览",
                adminAuth:true
              },
              children:[
                {
                  path:"allEnter",
                  component:() => import('../views/AllEnter'),
                  name:"allEnter",
                  meta:{
                    title:"所有入库单",
                    adminAuth:true
                  }
                }
              ]
            },
            {
              path:"shortagePreview",
              component:layout,
              name:"shortagePreview",
              redirect:"/dashboard/odo/shortagePreview/allShortage",
              meta:{
                title:"缺货单预览",
                adminAuth:true
              },
              children:[
                {
                  path:"allShortage",
                  component:() => import('../views/AllShortage'),
                  name:"allShortage",
                  meta:{
                    title:"所有缺货单",
                    adminAuth:true
                  }
                },
                {
                  path:"toBePurchasedShortage",
                  component:() => import('../views/ToBePurchasedShortage'),
                  name:"toBePurchasedShortage",
                  meta:{
                    title:"待采购缺货单",
                    adminAuth:true
                  }
                },
                {
                  path:"purchasedShortage",
                  component:() => import('../views/PurchasedShortage'),
                  name:"purchasedShortage",
                  meta:{
                    title:"已采购缺货单",
                    adminAuth:true
                  }
                }
              ]
            },
            {
              path: "odoOptions",
              component: layout,
              name: "odoOptions",
              redirect: "/dashboard/odo/odoOptions/outBounds",
              meta: {
                title: "库存选项",
                adminAuth: true
              },
              children: [
                {
                  path: "outBounds",
                  component: layout,
                  name: "outBounds",
                  meta: {
                    title: "出库",
                    adminAuth: true
                  },
                  children: [
                    {
                      path: '',
                      component: () => import('../views/SelectOrder'),
                      name: "selectOrder",
                      meta: {
                        adminAuth: true
                      }
                    },
                    {
                      path: "odoVo/:billId",
                      component: () => import('../views/AddToOdoSuccess'),
                      name: "odoVo",
                      meta: {
                        title: "出库成功",
                        adminAuth: true
                      }
                    }
                  ]
                },
                {
                  path:"enter",
                  component:layout,
                  name:"enter",
                  redirect:"/dashboard/odo/odoOptions/enter/selectCheck",
                  meta:{
                    title:"入库",
                    adminAuth:true
                  },
                  children:[
                    {
                      path:"selectCheck",
                      component:() => import('../views/SelectCheck'),
                      name:"selectCheck",
                      meta:{
                        adminAuth:true
                      }
                    },
                    {
                      path:"addToEnterSuccess/:billId",
                      component:() => import('../views/AddToEnterSuccess'),
                      name:"addToEnterSuccess",
                      meta:{
                        title:"入库成功",
                        adminAuth:true
                      }
                    }
                  ]
                },
                {
                  path:"query",
                  component:layout,
                  name:"query",
                  meta:{
                    title:"库存查询",
                    adminAuth:true
                  },
                  children:[
                    {
                      path:"",
                      component:() => import('../views/QueryReserve'),
                      name:"queryReserve",
                      meta:{
                        adminAuth:true
                      }
                    },
                    {
                      path:"generateShortage",
                      component:() => import('../views/GenerateShortage'),
                      name:"generateShortage",
                      meta:{
                        title:"生成缺货单",
                        adminAuth:true
                      }
                    },
                    {
                      path:"addToShortageSuccess/:billId",
                      component:() => import('../views/AddToShortageSuccess'),
                      name:"addToShortageSuccess",
                      meta:{
                        title:"生成缺货单成功",
                        adminAuth:true
                      }
                    }
                  ]
                }
              ]
            },
          ]
        },
        {
          path: 'invoice',
          component: layout,
          name: 'invoice',
          redirect: '/dashboard/invoice/allInvoiceTable',
          meta: {
            title: "发货管理",
            adminAuth: true
          },
          children: [
            {
              path: 'allInvoiceTable',
              component: () => import('../views/AllInvoiceTable'),
              name: 'allInvoiceTable',
              meta: {
                title: "发货单预览",
                adminAuth: true
              }
            },
            {
              path: 'invoiceOptions',
              component: layout,
              name: 'invoiceOptions',
              redirect: "/dashboard/invoice/invoiceOptions/sendOut",
              meta: {
                title: "发货选项",
                adminAuth: true
              },
              children: [
                {
                  path: "sendOut",
                  component: layout,
                  name: "sendOut",
                  meta: {
                    title: "发货",
                    adminAuth: true
                  },
                  children: [
                    {
                      path: '',
                      component: () => import('../views/SelectOdo'),
                      name: "selectOdo",
                      meta: {
                        adminAuth: true
                      }
                    },
                    {
                      path: "addToInvoiceSuccess",
                      component: () => import('../views/AddToInvoiceSuccess'),
                      name: "addToInvoiceSuccess",
                      meta: {
                        title: "发货成功",
                        adminAuth: true
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: "staff",
          component: layout,
          name: "staff",
          redirect: "/dashboard/staff/allAdminPreview",
          meta: {
            title: "员工管理",
            adminAuth: true
          },
          children: [
            {
              path: "allAdminPreview",
              component: () => import('../views/AllAdminPreview'),
              name: "allAdminPreview",
              meta: {
                title: "所有员工",
                adminAuth: true
              }
            }
          ]
        },
        {
          path: "adminProfile",
          component: adminProfile,
          name: "adminProfile",
          meta: {
            title: "管理员信息",
            adminAuth: true
          }
        },
        {
          path: "addAdmin",
          component: addAdin,
          name: "addAdmin",
          meta: {
            title: "添加管理员",
            adminAuth: true
          }
        },
        {
          path: "403",
          component: forbidden,
          name: "403",
          meta: {
            title: "403",
            adminAuth: true
          }
        },
        {
          path: "return",
          component: layout,
          name: "return",
          redirect: "/dashboard/return/returnPreview",
          meta: {
            title: "还车管理",
            adminAuth: true
          },
          children: [
            {
              path: "returnPreview",
              component: layout,
              name: "returnPreview",
              redirect: "/dashboard/return/returnPreview/allReturn",
              meta: {
                title: "还车单预览",
                adminAuth: true
              },
              children: [
                {
                  path: "allReturn",
                  component: () => import('../views/Allreturn'),
                  name: "allReturn",
                  meta: {
                    title: "所有还车单",
                    adminAuth: true
                  }
                },
                {
                  path: "toBeVerifiedReturn",
                  component: () => import('../views/ToBeVerifiedReturn'),
                  name: "toBeVerifiedReturn",
                  meta: {
                    title: "待审核还车单",
                    adminAuth: true
                  }
                },
                {
                  path: "failedReturn",
                  component: () => import('../views/FailedReturn'),
                  name: "failedReturn",
                  meta: {
                    title: "未通过还车单",
                    adminAuth: true
                  }
                },
                {
                  path: "toBeCheckedReturn",
                  component: () => import('../views/ToBeCheckedReturn'),
                  name: "toBeCheckedReturn",
                  meta: {
                    title: "待验收还车单",
                    adminAuth: true
                  }
                },
                {
                  path: "checkedReturn",
                  component: () => import('../views/CheckedReturn'),
                  name: "checkedReturn",
                  meta: {
                    title: "已验收还车单",
                    adminAuth: true
                  }
                }
              ]
            }
          ]
        },
        {
          path: "check",
          component: layout,
          name: "check",
          redirect: "/dashboard/check/checkPreview",
          meta: {
            title: "验收管理",
            adminAuth: true
          },
          children: [
            {
              path: "checkPreview",
              component: layout,
              name: "checkPreview",
              redirect: "/dashboard/check/checkPreview/allCheck",
              meta: {
                title: "验收单预览",
                adminAuth: true
              },
              children: [
                {
                  path: "allCheck",
                  component: () => import('../views/AllCheck'),
                  name: "allCheck",
                  meta: {
                    title: "所有验收单",
                    adminAuth: true
                  }
                },
                {
                  path: "toBeEnteredCheck",
                  component: () => import('../views/ToBeEnteredCheck'),
                  name: "toBeEnteredCheck",
                  meta: {
                    title: "待入库验收单",
                    adminAuth: true
                  }
                },
                {
                  path: "enteredCheck",
                  component: () => import('../views/EnteredCheck'),
                  name: "enteredCheck",
                  meta: {
                    title: "已入库验收单",
                    adminAuth: true
                  }
                }
              ]
            },
            {
              path: "checkOptions",
              component: layout,
              name: "checkOptions",
              redirect: "/dashboard/check/checkOptions/selectReturn",
              meta: {
                title: "验收货物",
                adminAuth: true
              },
              children: [
                {
                  path: "selectReturn",
                  component: () => import('../views/SelectReturn'),
                  name: "selectReturn",
                  meta: {
                    adminAuth: true
                  }
                },
                {
                  path: "addToCheckSuccess/:billId",
                  component: () => import('../views/AddToCheckSuccess'),
                  name: "addToCheckSuccess",
                  meta: {
                    title: "验收成功",
                    adminAuth: true
                  }
                }
              ]
            }
          ]
        },
        {
          path:"purchase",
          component:layout,
          name:"purchase",
          redirect:"/dashboard/purchase/purchasePreview",
          meta:{
            title:"采购管理",
            adminAuth:true
          },
          children:[
            {
              path:"purchasePreview",
              component:layout,
              name:"purchasePreview",
              redirect:"/dashboard/purchase/purchasePreview/allPurchase",
              meta:{
                title:"采购单预览",
                adminAuth:true
              },
              children:[
                {
                  path:"allPurchase",
                  component:() => import('../views/AllPurchase'),
                  name:"allPurchase",
                  meta:{
                    title:"所有采购单",
                    adminAuth:true
                  }
                },
                {
                  path:"toBeCheckedPurchase",
                  component:() => import('../views/ToBeCheckedPurchase'),
                  name:"toBeCheckedPurchase",
                  meta:{
                    title:"待验收采购单",
                    adminAuth:true
                  }
                },
                {
                  path:"checkedPurchase",
                  component:() => import('../views/CheckedPurchase'),
                  name:"checkedPurchase",
                  meta:{
                    title:"已验收采购单",
                    adminAuth:true
                  }
                }
              ]
            },
            {
              path:"doPurchase",
              component:layout,
              name:"doPurchase",
              redirect:"/dashboard/purchase/doPurchase/selectShortage",
              meta:{
                title:"采购",
                adminAuth:true
              },
              children:[
                {
                  path:"selectShortage",
                  component:() => import('../views/SelectShortage'),
                  name:"selectShortage",
                  meta:{
                    adminAuth:true
                  }
                },
                {
                  path:"addToPurchaseSuccess/:billId",
                  component:() => import('../views/AddToPurchaseSuccess'),
                  name:"addToPurchaseSuccess",
                  meta:{
                    title:"采购成功",
                    adminAuth:true
                  }
                }
              ]
            }
          ]
        },
        {
          path:"system",
          component:layout,
          name:"system",
          redirect:"/dashboard/system/allLogs",
          meta:{
            title:"系统管理",
            adminAuth:true
          },
          children:[
            {
              path:"allLogs",
              component:() => import('../views/AllLogs'),
              name:"allLogs",
              meta:{
                title:"系统日志",
                adminAuth:true
              }
            }
          ]
        }
      ]
    },
    {
      path: "/404",
      component: () => import('../views/404'),
      name: "404",
      meta: {
        title: "404"
      }
    }
  ]
})
