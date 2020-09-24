<template>
    <div class="homepage">
        <van-nav-bar title="医美"   class="pageNav" />
      	<div class="pageContent">
    	  	<!-- 搜索框 -->
            <van-search class="roundborder"  v-model="searchValue" placeholder="需要什么商品" />
            
            <!-- 头部导航 -->
  <!--   	  	<van-tabs v-model="active" @click="tabClick">
    			<van-tab title="医学美容"></van-tab>
    			<van-tab title="签到"></van-tab>
    			<van-tab title="嘀嗒商场"></van-tab>
    			<van-tab title="美学专家"></van-tab>
    		</van-tabs> -->
            
            <!-- 轮播 -->
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#999999">
              <van-swipe-item v-for=" pic in swipeList " :key="pic.url">
                  <van-image width="100%"  :src="pic.pic" @click="imgClick(pic.url)" />
              </van-swipe-item>
            </van-swipe>
            
            <!-- 产品分类 -->
            <van-swipe class="my-swipe1" indicator-color="#999999">
                <van-swipe-item class="swipeTypes">
                    <div class="swipeType" v-for="item in swipeList1" :key="item.url" @click="swipeTypeClick(item.url)">
                        <van-image class="swipeTypePic" :src="item.pic" />
                        <div class="swipeTypeName">{{ item.name }}</div>
                    </div>
                </van-swipe-item>
                <van-swipe-item class="swipeTypes">
                    <div class="swipeType" v-for="item in swipeList2" :key="item.url" @click="swipeTypeClick(item.url)">
                        <van-image class="swipeTypePic" :src="item.pic" />
                        <div class="swipeTypeName">{{ item.name }}</div>
                    </div>
                </van-swipe-item>
            </van-swipe>
            
            <!-- 活动专区 -->
            <div class="activitiesZone">
                <div class="activitiesZoneName">会员专区</div>
                <div class="activities">
                    <div class="activityItem" v-for="activity in activities" :key="activity.url" @click="activityClick(activity.url)">
                        <van-image width="100%" :src="activity.pic" />
                        <div class="activityWordsWrap">
                            <div class="activityWordsUp">{{ activity.upWords }}<van-icon name="play" size="12px" color="white" /></div>
                            <div class="activityWordsDown">{{ activity.downWords }}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 产品列表 -->
            <div class="shoppingList">
                <van-tabs class="shoppingListTab" v-model="activeList" @click="tabClickShoppingList">
                    <van-tab :title="item.name" v-for=" item in shoppingList" :name="item.name">

                            <van-list class="productListWrap" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                                <div class="productList">
                                    <product class="product" v-for="product in products" :key="product.id" :productInfo="product" @clickProduct="clickProduct"></product>
                                </div>
                            </van-list>
                        
                    </van-tab>
                </van-tabs>
                <!-- <div class="moreInfo" @click="moreInfo">更多</div> -->
            </div>
            
            <!-- 底部导航 -->
            <van-tabbar v-model="bottomActive" active-color="#FF8C34" @change="tabClickBottom">
                <van-tabbar-item v-for="btn in bottomButtonList" :icon="btn.icon">{{ btn.name}}</van-tabbar-item>
            </van-tabbar>

      	</div>

    </div>
</template>

<script type="text/javascript">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import product from '@/components/product.vue'

import Vue from 'vue'
import store from '@/store'

// // 手动引入vant单个组件
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

export default {
  	name: '',
  	store,
  	data(){
		return{
            searchValue:"",
			active: 0,//第一个滑窗激活窗口
            swipeList:[
                {pic:require('../assets/imgs/13.png'),url:"11"},
                {pic:require("../assets/imgs/15.png"),url:"22"},
                {pic:require("../assets/imgs/16.png"),url:"33"},
            ], //第一个滑窗数据
            swipeList1:[
                {url:"11",name:"O栈",pic:require('../assets/imgs/171.png')},
                {url:"22",name:"嘀哒商城",pic:require('../assets/imgs/172.png')},
                {url:"33",name:"医美严选",pic:require('../assets/imgs/173.png')},
                {url:"44",name:"名医名项",pic:require('../assets/imgs/174.png')},
                {url:"55",name:"医疗健康",pic:require('../assets/imgs/250.png')},
                {url:"66",name:"眼部",pic:require('../assets/imgs/175.png')},
                {url:"77",name:"鼻部",pic:require('../assets/imgs/176.png')},
                {url:"88",name:"胸部",pic:require('../assets/imgs/177.png')},
                {url:"99",name:"玻尿酸",pic:require('../assets/imgs/178.png')},
                {url:"00",name:"除皱瘦脸",pic:require('../assets/imgs/249.png')},
            ],//第二个滑窗第一屏数据
            swipeList2:[{url:"11",name:"O栈",pic:require('../assets/imgs/171.png')},],//第二个滑窗第二屏数据

            activities:[
                {pic:require("../assets/imgs/24.png"),url:"111",upWords:"VIP专区",downWords:"享受会员福利"},
                {pic:require("../assets/imgs/25.png"),url:"222",upWords:"特价专区",downWords:"优惠价格随你挑"},
                {pic:require("../assets/imgs/26.png"),url:"333",upWords:"钻石会员专区",downWords:"最高福利专区"},
            ],//活动专区数据

            bottomActive:0,

            shoppingList:[
                {url:"",name:"推荐"},
                {url:"",name:"眼部"},
                {url:"",name:"鼻部"},
                {url:"",name:"胸部"},
                {url:"",name:"玻尿酸"},
                {url:"",name:"除皱"},
                {url:"",name:"鼻部"},
                {url:"",name:"胸部"},
                {url:"",name:"玻尿酸"},
                {url:"",name:"除皱"},
            ],
            activeList:"推荐",

            products:[
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",company:"亚太美立方医疗美容",pic:require("../assets/imgs/23.png"),id:1},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",company:"亚太美立方医疗美容",pic:require("../assets/imgs/22.png"),id:2},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",company:"亚太美立方医疗美容",pic:require("../assets/imgs/21.png"),id:3},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",company:"亚太美立方医疗美容",pic:require("../assets/imgs/18.png"),id:4},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",company:"亚太美立方医疗美容",pic:require("../assets/imgs/17.png"),id:5},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",company:"亚太美立方医疗美容",pic:require("../assets/imgs/19.png"),id:6},
                
            ],
            // 测试用
            addproducts:[
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",company:"亚太美立方医疗美容",pic:require("../assets/imgs/17.png"),id:7},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",company:"亚太美立方医疗美容",pic:require("../assets/imgs/19.png"),id:8},
            ],

            bottomButtonList:[
                {name:"首页",url:"/",icon:"wap-home-o"},
                {name:"美哒日记",url:"/diaryList",icon:"notes-o"},
                {name:"商城",url:"/shopping-mall",icon:"shop-o"},
                {name:"我的",url:"/mine",icon:"contact"},
            ],


            loading:false,
            finished:false,


		}
  	},
  	computed:{
  		// showTab(){
  		// 	var showTab=true
  		// 	if(this.active){
  		// 		showTab=false
  		// 	}
  		// 	return showTab
  		// }
  	},
  	watch:{},
  	components: {
		// HelloWorld
        product
  	},
  	methods:{
  		tabClick(name, title){
            if(name==2){
              // 跳转商城
              this.$router.push('/shopping-mall')
            }
  			
  		},
        imgClick(url){
            console.log(url)
        },
        swipeTypeClick(url){
            console.log(url)
        },
        activityClick(url){
            console.log(url)
        },

        tabClickShoppingList(name, title){
            if(this.activeList==title){
                // 点击当前项
                return
            }
            this.updateProducts(this.shoppingList[name])

            console.log(name)
            console.log(title)
        },
        updateProducts(url){
            this.products.length=0;
            // 根据url去获取分类商品列表,更新products
        },
        tabClickBottom(index){
            // 底部跳转
 
            this.$router.replace(this.bottomButtonList[index].url)

        },
        moreInfo(){
            console.log("aa")
        },

        onLoad(){
            // 列表下拉加载
            console.log("aax")
            var that=this;
            setTimeout(function(){
                that.products=that.products.concat(that.addproducts)
                that.loading=false
            },5000)
        },

        clickProduct(product){
            // console.log(product)
            // 跳转产品页
            console.log(product)
            this.$router.push({ 
                name: 'productInfo',
                query: { product:JSON.stringify(product), }
            })
        },
        init(){
            // 初始化界面数据
        }
  	},
  	mounted(){
        this.init()

  	},
  	created(){
        // 初始化数据
        // this.swipeList=[];
        // this.swipeList1=[];
        // this.swipeList2=[];
        // this.activities=[];
    }

}
</script>

<style type="text/css">
    .pageContent{
        border-radius: 20px 20px 0px 0px;
        box-shadow:0px -4px 10px rgba(0,0,0,0.16);
        background-color: white;
        margin-top: 60px;
    }
    .pageNav{
        background-color: #FF8C34;
        position: absolute;
        width: 100%;
        height: 66px;
        top: 0px;
        left: 0px;
        z-index: -1;
        padding-bottom: 10px;
        
    }
    .pageNav .van-nav-bar__title{
        color: white;
        font-size: 18px;
        /*font-weight: 500;*/
    }
    .pageNav .van-icon{
        color: white;
        font-size:20px;
    }
    .pageNav .van-nav-bar__left{
        height: calc(100% - 10px);
    }
    .pageNav .van-nav-bar__left:active, .pageNav .van-nav-bar__right:active{
        opacity: 1
    }

    .homepage .van-search{
        background-color: rgba(255,255,255,0);
    }



    .homepage .van-swipe__indicator{
        background-color: #999999;
    }
	.homepage .roundborder>div{
		border-radius: 10px;
		background-color: #EBEBEB;
		color: #999999;
	}
	.homepage .roundborder i{
		color: #999999;
	}
    
    
    .homepage .my-swipe{
        margin:20px 0px;
    }
    .homepage .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        /*line-height: 150px;*/
        text-align: center;
        /*background-color: #39a9ed;*/
    }
    .homepage .van-swipe__indicator--active{
        width: 20px;
        border-radius: 5px;
        background-color:#FF8C34!important;
    }
    .homepage .my-swipe1{
        width: calc(100% - 30px);
        margin:auto;
        border-radius: 10px;
        box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
        /*line-height: 150px;*/
    }
    .homepage .swipeTypes{
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0px;
        
    }
    .homepage .swipeType{
        width: 20%;
        box-sizing: border-box;
        margin-bottom: 20px;
        font-size: 12px;
    }
    .homepage .swipeTypeName{
        margin-top: 5px;
    }
    



    /*活动专区*/
    .homepage .activitiesZone{
        width: calc(100% - 30px);
        margin:20px auto;
    }
    .homepage .activitiesZoneName{
        text-align: left;
        margin-bottom: 10px;
    }
    .homepage .activities{
        display: flex;
        justify-content: space-between;
    }
    .homepage .activityItem{
        position: relative;
        width: calc(33.33% - 6px);
    }
    .homepage .activityWordsWrap{
        position: absolute;
        bottom: 0px;
        left: 0px;
        background-color: rgba(0,0,0,0.2);
        width: 100%;
        color: white;
    }
    .homepage .activityWordsWrap>div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .homepage .activityWordsUp{
        font-size: 14px;
    }
    .homepage .activityWordsDown{
        font-size: 12px;
        margin-bottom: 6px;
    }
    
    .homepage .van-tab{
        color: #999999;
        /*font-weight: bold;*/
    }
    .homepage .van-tab--active{
        color: #FF8C34;
    }
    .homepage .van-tabs__line{
        background-color:#FF8C34;
    }
    
    
    /*产品列表*/
    .homepage .shoppingList{
        margin: 20px 0px;
        margin-bottom: 50px;
        position: relative;
    }
    .homepage .moreInfo{
        position: absolute;
        top: 0px;
        right: 0px;
        line-height: 44px;
        font-size: 12px;
        background: rgba(255,255,255,0.9);
        padding: 0px 15px;
        /*border-left: 2px soild rgba(100,100,100,0.5);*/
    }
    .homepage .productList{
        width: calc(100% - 20px);
        margin: 20px auto;
        display: flex;
        flex-wrap: wrap;

    }
    .homepage .product{
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin:5px 5px;
        box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
        border-radius:10px;

    }

</style>