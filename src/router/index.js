import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// import homepage from '../views/homepage.vue'
// import shoppingMall from '../views/shopping-mall.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    // component: homepage
    component: () => import('../views/homepage.vue')
    // component: () => import('../views/Home.vue')
  },
  {
    // 预约详情页
    path: '/productInfo',
    name: 'productInfo',
    component: () => import('../views/productInfo.vue')
    // component: shoppingMall
  },
  {
    // 预约订单
    path: '/order',
    name: 'order',
    component: () => import('../views/order.vue')
    // component: shoppingMall
  },
  {
    // 项目订单
    path: '/myOrder',
    name: 'myOrder',
    component: () => import('../views/myOrder.vue')
    // component: shoppingMall
  },
  {
    // 预约单详情
    path: '/appointmentInfo',
    name: 'appointmentInfo',
    component: () => import('../views/appointmentInfo.vue')
    // component: shoppingMall
  },
  {
    // 项目搜索页
    path: '/projectSearchList',
    name: 'projectSearchList',
    component: () => import('../views/projectSearchList.vue'),
    // meta: {
    //   keepAlive: true, 
    //   isBack: false
    // }
  },

  // 商城路由
  {
    // 商城:首页
    path: '/shopping-mall',
    name: 'shopping-mall',
    component: () => import('../views/shopping-mall.vue')
    // component: shoppingMall
  },
  {
    // 商城:地址列表
    path: '/address',
    name: 'address',
    component: () => import('../views/address.vue')
    // component: shoppingMall
  },
  {
    // 商城:添加地址
    path: '/addAddress',
    name: 'addAddress',
    component: () => import('../views/addAddress.vue')
    // component: shoppingMall
  },
  {
    // 商城:编辑地址
    path: '/editeAddress',
    name: 'editeAddress',
    // component: () => import('../views/editeAddress.vue')
    component: () => import('../views/addAddress.vue')
    
    // component: shoppingMall
  },
  {
    // 商城商品页
    path: '/goodsInfo',
    name: 'goodsInfo',
    component: () => import('../views/goodsInfo.vue')
    // component: shoppingMall
  },
  {
    // 用户评价
    path: '/reviews',
    name: 'reviews',
    component: () => import('../views/reviews.vue')
    // component: shoppingMall
  },
  {
    // 确认订单
    path: '/goodsOrder',
    name: 'goodsOrder',
    component: () => import('../views/goodsOrder.vue')
    // component: shoppingMall
  },
  {
    // 订单列表
    path: '/orderList',
    name: 'orderList',
    component: () => import('../views/orderList.vue')
    // component: shoppingMall
  },
  {
    // 创建商品订单
    path: '/createGoodsOrder',
    name: 'createGoodsOrder',
    component: () => import('../views/createGoodsOrder.vue')
    // component: shoppingMall
  },
  {
    // 订单详情
    path: '/orderInfo',
    name: 'orderInfo',
    component: () => import('../views/orderInfo.vue')
    // component: shoppingMall
  },
  {
    // 购物车
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart.vue')
    // component: shoppingMall
  },
  {
    // 商品列表
    path: '/goodsSearchList',
    name: 'goodsSearchList',
    component: () => import('../views/goodsSearchList.vue')
    // component: shoppingMall
  },

  {
    // 获取优惠券
    path: '/getCoupons',
    name: 'getCoupons',
    component: () => import('../views/getCoupons.vue')
  },
  

  // 预约和商城共享页
  {
    // 搜索页
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue')
    // component: shoppingMall
  },
  {
    // 付款页
    path: '/payment',
    name: 'payment',
    component: () => import('../views/payment.vue')
    // component: shoppingMall
  },
  
  


  // 美哒日记 
  
  {
    // 日记列表页
    path: '/diaryList',
    name: 'diaryList',
    component: () => import('../views/diaryList.vue')
    // component: shoppingMall
  },
  {
    // 写日记
    path: '/diaryRecord',
    name: 'diaryRecord',
    component: () => import('../views/diaryRecord.vue')
    // component: shoppingMall
  },
  {
    // 日记详情页
    path: '/diaryInfo',
    name: 'diaryInfo',
    component: () => import('../views/diaryInfo.vue')
    // component: shoppingMall
  },

  // 我的
  {
    // 我的主页
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine.vue')
    // component: shoppingMall
  },
  {
    // 我的资料页
    path: '/myinfo',
    name: 'myinfo',
    component: () => import('../views/myInfo.vue')
    // component: shoppingMall
  },
  {
    // 我的修改昵称页
    path: '/changeName',
    name: 'changeName',
    component: () => import('../views/changeName.vue')
    // component: shoppingMall
  },
  {
    // 我的修改昵称页
    path: '/changeSignature',
    name: 'changeSignature',
    component: () => import('../views/changeSignature.vue')
    // component: shoppingMall
  },
  {
    // 我的通知和消息
    path: '/notice',
    name: 'notice',
    component: () => import('../views/notice.vue')
    // component: shoppingMall
  },
  {
    // 我的日记
    path: '/myDiary',
    name: 'myDiary',
    component: () => import('../views/myDiary.vue')
    // component: shoppingMall
  },
  {
    // 我的关注
    path: '/myAttention',
    name: 'myAttention',
    component: () => import('../views/myAttention.vue')
    // component: shoppingMall
  },
  {
    // 我的收藏
    path: '/myCollect',
    name: 'myCollect',
    component: () => import('../views/myCollect.vue')
    // component: shoppingMall
  },
  {
    // 我的足迹
    path: '/myTrack',
    name: 'myTrack',
    component: () => import('../views/myTrack.vue')
    // component: shoppingMall
  },
  {
    // 会员中心
    path: '/vipCenter',
    name: 'vipCenter',
    component: () => import('../views/vipCenter.vue')
    // component: shoppingMall
  },
  {
    // 银行卡列表
    path: '/bankCard',
    name: 'bankCard',
    component: () => import('../views/bankCard.vue')
    // component: shoppingMall
  },
  {
    // 编辑银行卡
    path: '/editeBankCard',
    name: 'editeBankCard',
    component: () => import('../views/editeBankCard.vue')
    // component: shoppingMall
  },
  {
    // 我的钱包
    path: '/myWallet',
    name: 'myWallet',
    component: () => import('../views/myWallet.vue')
    // component: shoppingMall
  },

  {
    // 立即提现
    path: '/withdraw',
    name: 'withdraw',
    component: () => import('../views/withdraw.vue')
    // component: shoppingMall
  },

  {
    // 我的明细
    path: '/myCostDetail',
    name: 'myCostDetail',
    component: () => import('../views/myCostDetail.vue')
    // component: shoppingMall
  },

  {
    // 我的团队
    path: '/myTeam',
    name: 'myTeam',
    component: () => import('../views/myTeam.vue')
    // component: shoppingMall
  },
  {
    // 我的推广
    path: '/popularize',
    name: 'popularize',
    component: () => import('../views/popularize.vue')
    // component: shoppingMall
  },

  {
    // 我的优惠券
    path: '/myCoupons',
    name: 'myCoupons',
    component: () => import('../views/myCoupons.vue')
    // component: shoppingMall
  },

  {
    // 使用优惠券
    path: '/useCoupons',
    name: 'useCoupons',
    component: () => import('../views/useCoupons.vue')
    // component: shoppingMall
  },


  
  {
    // 提示在微信中打开
    path: '/openInWeiXin',
    name: 'openInWeiXin',
    component: () => import('../views/openInWeiXin.vue')
    // component: shoppingMall
  },
  {
    // 项目微信支付成功提示页
    path: '/successPay',
    name: 'successPay',
    component: () => import('../views/successPay.vue')
    // component: shoppingMall
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
