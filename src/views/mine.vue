<template>
    <div class="mine">
        <van-nav-bar title="我的"  class="pageNavNative" >
            <template #right>
                <van-icon class="navLeftIcon iconfont" class-prefix='icon' name="tongzhi" size="16" color="white" @click="goNotice" />
                <van-icon name="setting-o" size="18" @click="goUserInfo"  />
            </template>
        </van-nav-bar>

        <div class="headBox">
            <div class="headUserInfo" @click="goUserInfo">
                <van-image class="headUserInfoPic" round width="50" height="50" :src="userInfo.avatar" />
                <div class="headUserInfoShort" >
                    <div>
                        {{ userInfo.name }}
                        <van-icon v-if="userInfo.sex=='1'" class="iconfont" class-prefix='icon' name='nan' color="blue" />
                        <van-icon v-else class="iconfont" class-prefix='icon' name='nv' color="red" />
                    </div>
                    <div>关注&nbsp{{ userInfo.attentionNum }}&nbsp | &nbsp粉丝&nbsp{{ userInfo.beAttentionNum }}</div>
                </div>
                <van-icon class="headUserInfoIcon" name="arrow" />
            </div>
            <div class="headUserAction">
                <div @click="seeDiary">
                    <div>{{ userInfo.diaryNum }}</div>
                    <div>日记</div>
                </div>
                <div @click="seeCollect">
                    <div>{{ userInfo.colltectNum }}</div>
                    <div>收藏</div>
                </div>
                <div>
                    <div>{{ userInfo.money }}</div>
                    <div>余额</div>
                </div>
            </div>
  
            <div class="headUserVipWrap ">
                <div class="headUserVip">
                    <div class="headUserVipTop">
                        <div><van-icon class="iconfont " class-prefix='icon' name='vipdiamond-f' style="margin-right: 5px;" />会员中心</div>
                        <div @click="seeVipCenter">点击此处区域进入会员中心<van-icon name="arrow" /></div>
                    </div>
                    <div class="headUserVipBottom" v-if="userInfo.role=='MEMBER'">您还不是会员哦，开通立享特权~</div>
                    <div class="headUserVipBottom" v-else>{{ getUserLevel(userInfo.role) }}</div>
                    <van-icon  class="iconfont headUserVipIcon" class-prefix='icon' name='v' color="" size="60" />
                </div>
            </div>
        </div>

        <div class="contentRow firstRow projectOrderItems">
            <div class="contentRowTitle">项目订单</div>
            <div class="contentRowItems">
                <div class="contentRowItem" v-for="item in projectOrderList" @click="seeProjectOrder(item)">
                    <van-icon class="iconfont" :class="item.class" :class-prefix="item.iconPrefix" :name="item.icon"  :size="item.size" />
                    <div>{{ item.name }}</div>
                </div>
            </div>
            
        </div>
        <div class="contentRow">
            <div class="contentRowTitle">商城订单</div>
            <div class="contentRowItems shopOrderItems ">
                <div class="contentRowItem" v-for="item in shopOrderList" @click="seeGoodsOrder(item)">
                    <van-icon class="iconfont" :class="item.class" :class-prefix="item.iconPrefix" :name="item.icon"  :size="item.size" :badge="item.badge" />
                    <div>{{ item.name }}</div>
                </div>
            </div>
        </div>
        <div class="contentRow" style="margin-bottom: 60px;">
            <div class="contentRowTitle">工具与服务</div>
            <div class="contentRowItems toolsItems">
                <div class="contentRowItem" v-for="item in toolsList" @click="seeTools(item)">
                    <div class="iconfontWrap">
                        <van-icon class="iconfont" :class="item.class" :class-prefix="item.iconPrefix" :name="item.icon"  :size="item.size" />
                    </div>
                    <div>{{ item.name }}</div>
                </div>
            </div>
        </div>

        
        <!-- 底部导航 -->
        <van-tabbar v-model="bottomActive" active-color="#FF8C34" @change="tabClickBottom">
            <van-tabbar-item v-for="btn in bottomButtonList" :icon="btn.icon">{{ btn.name}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script type="text/javascript">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import Vue from 'vue'
import store from '@/store'

// // 手动引入vant单个组件
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';

// import Vant from 'vant'
// import 'vant/lib/index.css'


// Vue.use(Vant)

// 阿里图标文件
// import "@/assets/iconfont/iconfont.css";

import { mapState } from 'vuex'

export default {
  	name: '',
  	store,
  	data(){
		return{
            bottomActive:3,
            bottomButtonList:[
                {name:"首页",url:"/",icon:"wap-home-o"},
                {name:"美哒日记",url:"/diaryList",icon:"notes-o"},
                {name:"商城",url:"/shopping-mall",icon:"shop-o"},
                {name:"我的",url:"/mine",icon:"contact"},
            ],

            attentionNum:1,
            fansNum:2,
            diaryNum:5,
            collectNum:6,
            // trackNum:7,
            leftMoney:"10.00",
            // userName:"防晒霜",
            // gender:"男",
            isVip:false,
            projectOrderList:[
                {name:"全部订单",iconPrefix:"icon",icon:"icon",class:"linearYellow",size:"34"},

                {name:"预约单",iconPrefix:"icon",icon:"yuyuezhongxin",class:"linearBlue",size:"40"},
                {name:"已消费",iconPrefix:"icon",icon:"xiaofei",class:"linearRed",size:"42"},
                {name:"已完成",iconPrefix:"icon",icon:"dingdan-yiwancheng",class:"linearPurple",size:"40"},
            ],
            shopOrderList:[
                {name:"待付款",iconPrefix:"icon",icon:"qianbao1",size:"28",},
                {name:"待发货",iconPrefix:"icon",icon:"daifahuo",size:"28"},
                {name:"待收货",iconPrefix:"icon",icon:"daishouhuo",size:"26"},
                {name:"已完成",iconPrefix:"icon",icon:"ziyuan",size:"24"},
                {name:"全部订单",iconPrefix:"icon",icon:"dingdan",size:"24"},
            ],
            toolsList:[
                {name:"购物车",iconPrefix:"icon",icon:"gouwuche",size:"20",route:"/cart"},
                {name:"收货地址",iconPrefix:"icon",icon:"dizhi",size:"28",route:"/address"},
                {name:"优惠券",iconPrefix:"icon",icon:"youhuiquan",size:"28",route:"/myCoupons"},
                {name:"钱包明细",iconPrefix:"icon",icon:"jifenmingxi",size:"22",route:"/myWallet"},
                // {name:"钱包",iconPrefix:"icon",icon:"qianbao",size:"28"},
                {name:"绑定卡号",iconPrefix:"icon",icon:"buoumaotubiao26",size:"22",route:"/bankCard"},
                {name:"我的推广",iconPrefix:"icon",icon:"erweima",size:"26",route:"/popularize"},
                {name:"我的团队",iconPrefix:"icon",icon:"tuandui",size:"24",route:"/myTeam"},
                
            ]
		}
  	},
  	computed:{
        ...mapState({
            userInfo(state){ return state.userInfo},
        })
  	},
  	watch:{},
  	components: {

  	},
  	methods:{

        getUserLevel(s){
            if(s=="MEMBER"){
                return "普通会员"
            }
            if(s=="VIP_MEMBER"){
                return "白金会员"
            }
            if(s=="VIP_MAJORDOMO"){
                return "VIP 总监"
            }
            if(s=="DIAMOND_MEMBER"){
                return "钻石会员"
            }
            if(s=="BOARD_MEMBER"){
                return "董事会员"
            }
        },

        tabClickBottom(index){
            // 底部跳转
 
            this.$router.replace(this.bottomButtonList[index].url)

        },
        goUserInfo(){
            this.$router.push("/myinfo");
        },
        goNotice(){
            this.$router.push("/notice");
        },
        seeDiary(){
            this.$router.push("/myDiary");
        },
        seeCollect(){
            this.$router.push("/myCollect");
        },
        seeVipCenter(){
            this.$router.push("/vipCenter");
        },
        seeProjectOrder(item){
            // this.$router.push("/myOrder");
            this.$router.push({
                name: 'myOrder',
                query: { name:item.name }
            });
        },
        seeGoodsOrder(item){
            // this.$router.push("/orderList");
            this.$router.push({
                name: 'orderList',
                query: { name:item.name }
            });
        },
        seeTools(item){
            this.$router.push(item.route)
        },

        init(){
            // 初始化界面数据
        },

  	},
  	mounted(){


  	},
  	created(){
        // 初始化数据
        store.dispatch("getUserInfo").then(function(){

        })
    }

}
</script>

<style type="text/css">
    .pageNavNative{
        height: 66px;
        background-color: #FF8C34;
    }
    .pageNavNative .van-nav-bar__title{
        color: white;
        font-size: 18px;
        /*font-weight: 500;*/
    }
    .pageNavNative .van-icon{
        color: white;
        font-size:20px;
    }
    
    .pageNavNative .navLeftIcon{
        margin-right: 10px;
    }
    
    .mine .pageNavNative.van-hairline--bottom::after{
        border: 0px;
    }

    .mine .linearYellow{
        background: linear-gradient(to top, #FFC933, #FFDA75);
        -webkit-background-clip: text;
        color: transparent;
    }
    .mine .linearBlue{
        background: linear-gradient(to top, #29DCFF, #B1F2FF);
        -webkit-background-clip: text;
        color: transparent;
    }
    .mine .linearRed{
        background: linear-gradient(to top, #FF1F1F, #FFA6A6);
        -webkit-background-clip: text;
        color: transparent;
    }
    .mine .linearPurple{
        background: linear-gradient(to top, #5600FF, #A7ADFC);
        -webkit-background-clip: text;
        color: transparent;
    }
    
    .mine{
        text-align: left;
        overflow-x: hidden;
    }
    .mine .headBox{
        position: relative;
        padding-bottom: 10px;
        color: white;
        font-size: 14px;
        background-color: #FF8C34;

    }
    .mine .headUserInfo{
        width: calc(100% - 30px);
        display: flex;
        align-items: center;
        margin: 0px auto;
        padding: 10px 0px;
    }
    .mine .headUserInfoIcon{
        margin-left: auto;
        font-size: 20px;
    }
    .mine .headUserInfoPic{
        padding: 3px;
        background-color: white;
        margin-right: 10px;
    }
    .mine .headUserInfoShort :nth-child(2){
        font-size: 11px;
        margin-top: 5px;
    }

    .mine .headUserAction{
        width: calc(100% - 30px);
        display: flex;
        align-items: center;
        margin: 10px auto;
        justify-content: space-around;
        text-align: center;

    }
    .mine .headUserAction>div :nth-child(1){
        font-size: 20px;
        font-weight: bold;
        margin:5px 0px;
    }
    .mine .headUserAction>div :nth-child(2){
        font-size: 12px;
    }
    
    .mine .headUserVip{
        width:calc(83% - 30px);
        margin:0px auto;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        border-radius: 10px;
        position: relative;
        color: #FFD500;
        font-size: 11px;
        padding: 15px;
        box-sizing: border-box;
    }
    .mine .headUserVipTop{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .mine .headUserVipTop :nth-child(1){
        font-size: 14px;
    }
    .mine .headUserVipTop :nth-child(2){
        display: flex;
        align-items: center;
    }
    .mine .headUserVipBottom{
        margin-top: 20px;
    }
    .mine .headUserVipIcon{
        position: absolute;
        bottom: 20px;
        right: 20px;
        color: rgba(0,0,0,0.25);
        pointer-events: none;
    }

    .mine .headUserVipWrap{
      width: 120%;
      height: 90px;
      /*margin-left: -10%;*/
      position: absolute;
      left: -10%;    
      /*bottom: -20px;*/
      border-radius: 0 0 50% 50%;  
      background: #FF8C34;
      /*z-index: -1;*/
      box-shadow:0px 6px 6px rgba(0,0,0,0.16);
      overflow: hidden;
    }
    
    
    .mine .contentRow{
        width: calc(100% - 30px);
        margin:0px auto;
    }
    .mine .firstRow{
        /*margin-top:90px;*/
        /*margin-top:390px;*/
        padding-top: 300px;
        padding-top: 90px;
    }

    .mine .contentRowTitle{
        color: #333333;
        font-size: 15px;
        font-weight: bold;
    }
    .mine .contentRowItems{
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .mine .contentRowItem{
        text-align: center;
        font-size: 11px;
        color: #666666;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0px;
    }

    .mine .toolsItems{
        flex-wrap: wrap;
        justify-content: initial;
    }
    .mine .toolsItems .contentRowItem{
        width: 25%;
        
    }
    .mine .toolsItems .iconfontWrap{
        background:rgba(255,233,216,1);
        border-radius:50%;
        width: 40px;
        height: 40px;
        color: #FF3434;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
    }

    .mine .shopOrderItems .iconfont{
        color: #FF8C34;
        margin-bottom: 5px;
        position: relative;
    }
    
    .mine .projectOrderItems .iconfont{
        margin-bottom: 5px;
    }
    .mine .projectOrderItems .contentRowItem{
        font-size: 14px;
    }
</style>