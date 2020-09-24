<template>
    <div>
        <!-- <van-nav-bar title="嘀哒商城" left-text="" right-text="" left-arrow @click-left="onClickLeft" class="pageNav" /> -->
        <van-nav-bar title="嘀哒商城" left-text="" right-text=""  class="pageNav" />
    	<div class="pageContent">
            <!-- 搜索框 -->
            <div class="shoppingMallHeader">
                <van-search class="roundborder"  v-model="searchValue" placeholder="需要什么商品" />
                <van-icon name="cart" size="24px" color="#FF8C34" @click="goCart" />
            </div>
          <!-- 头部ad -->
        		<div class="headTips">
                <div class="tipName">大牌品质</div>
                <div class="splitLine"></div>
                <div class="tipName">工厂价格</div>
                <div class="splitLine"></div>
                <div class="tipName">超值折扣</div>
                <div class="splitLine"></div>
                <div class="tipName">快递包邮</div>
                <div class="splitLine"></div>
                <div class="tipName">无忧退款</div>
            </div>
            <!-- 轮播 -->
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#999999">
                <van-swipe-item v-for=" pic in swipeList " :key="pic.url">
                    <van-image width="100%"  :src="pic.pic" @click="imgClick(pic.url)" />
                </van-swipe-item>
            </van-swipe>
            
            <van-swipe class="my-swipe1 " indicator-color="#999999">
                <van-swipe-item class="swipeTypes">
                    <div class="swipeType" v-for="item in swipeList1" :key="item.url" @click="swipeTypeClick(item.url)">
                        <van-image class="swipeTypePic" :src="item.pic" />
                        <div class="swipeTypeName">{{ item.name }}</div>
                    </div>
                </van-swipe-item>
            </van-swipe>

            <van-image class="banner" width="100%"  :src="require('../assets/imgs/39.png')" />
            
            <!-- 限时秒杀 -->
            <div class="flashSale">
                <van-image class="flashSaleIcon" :src="require('../assets/imgs/clock.png')" />
                <div class="flashSaleTitle">限时抢购</div>
                <van-count-down :time="time" class="flashSaleTime">
                  <template v-slot="timeData">
                    <span class="block">{{ timeData.hours }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.minutes }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.seconds }}</span>
                  </template>
                </van-count-down>
                <van-icon class="flashSaleRightIcon" name="arrow" color="#999999" />
            </div>
            
            <!-- 商品特色 -->
            <div class="Recommend">
                <div class="RecommendHead">
                    <div class="RecommendHeadTitle">特色商品</div>
                    <van-icon class="RecommendHeadIcon" name="arrow" color="#999999" />
                </div>
                <div class="RecommendBody">
                    <div v-for="Recommend in Recommends" class="RecommendProduct">
                        <van-image class="RecommendPic" width="100%" :src="Recommend.pic" />
                        <div class="RecommendName">￥{{ Recommend.name }}</div>
                        <div class="RecommendPrice">￥{{ Recommend.price }}</div>
                    </div>
                </div>
            </div>
            
            <!-- 精品推荐 -->
            <div class="guessYouLike">
                <van-divider :style="{ color: '#FF8C34', borderColor: '#FF8C34', padding: '0 15%' }">
                    精品推荐
                </van-divider>
                <!-- <van-list class="productListWrap" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
                    <div class="productList">
                        <product class="product" v-for="product in products" :key="product.id" :productInfo="product" @clickProduct="clickProduct(product)"></product>
                    </div>
                    
                <!-- </van-list> -->
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
			active: 0,

            swipeList:[
                {pic:require('../assets/imgs/28.png'),url:"11"},
                {pic:require("../assets/imgs/29.png"),url:"22"},

            ],
            swipeList1:[
                {url:"11",name:"保健品",pic:require('../assets/imgs/shoppingmall_1.png')},
                {url:"22",name:"护肤专区",pic:require('../assets/imgs/shoppingmall_2.png')},
                {url:"33",name:"术后修复",pic:require('../assets/imgs/shoppingmall_3.png')},
                {url:"44",name:"彩妆专区",pic:require('../assets/imgs/shoppingmall_4.png')},
                {url:"55",name:"生活必备",pic:require('../assets/imgs/shoppingmall_5.png')},
                {url:"66",name:"网红爆款",pic:require('../assets/imgs/shoppingmall_6.png')},
                {url:"77",name:"香奈儿",pic:require('../assets/imgs/shoppingmall_7.png')},
                {url:"88",name:"圣罗兰",pic:require('../assets/imgs/shoppingmall_8.png')},
                {url:"99",name:"雅诗兰黛",pic:require('../assets/imgs/shoppingmall_9.png')},
                {url:"00",name:"法国娇兰",pic:require('../assets/imgs/shoppingmall_10.png')},
            ],

            time:0,

            Recommends:[
                {name:"伊思红参蜗牛水乳套装",pic:require('../assets/imgs/x1.png'),price:"1400.00",url:"123"},
                {name:"香奈儿邂逅系列 邂逅香水系列",pic:require('../assets/imgs/x2.png'),price:"580.00",url:"1234"},
                {name:"倩碧匀净卓研淡斑双效精华露",pic:require('../assets/imgs/x3.png'),price:"3900.00",url:"1235"},
            ],

            products:[
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",oldPrice:"1600",pic:require("../assets/imgs/23.png"),sellNum:224,id:1},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",oldPrice:"1600",pic:require("../assets/imgs/22.png"),sellNum:224,id:2},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",oldPrice:"1600",pic:require("../assets/imgs/21.png"),sellNum:224,id:3},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",oldPrice:"1600",pic:require("../assets/imgs/18.png"),sellNum:224,id:4},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",oldPrice:"1600",pic:require("../assets/imgs/17.png"),sellNum:224,id:5},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",oldPrice:"1600",pic:require("../assets/imgs/19.png"),sellNum:224,id:6},
            ],
            // loading:true,
            // finished:false,

            bottomActive:2,
            bottomButtonList:[
                {name:"首页",url:"/",icon:"wap-home-o"},
                {name:"美哒日记",url:"/diaryList",icon:"notes-o"},
                {name:"商城",url:"/shopping-mall",icon:"shop-o"},
                {name:"我的",url:"/mine",icon:"contact"},
            ],
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
        onClickLeft(){
            this.$router.go(-1)
        },
  		goCart(){
            // 跳转购物车页面
        },
        onLoad(){},
        clickProduct(product){
            this.$router.push({ 
                name: 'goodsInfo',
                query: { product:JSON.stringify(product), }
            })
        },
        imgClick(){},
        swipeTypeClick(){},
        init(){},
        tabClickBottom(index){
            // 底部跳转
            this.$router.replace(this.bottomButtonList[index].url)
        },
  	},
  	mounted(){
        this.time=60*60*1000;
  	},
  	created(){}

}
</script>

<style type="text/css" >
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

    .shoppingMallHeader .van-search{
        background-color: rgba(255,255,255,0);
    }


    .shoppingMallHeader .roundborder{
        width: calc(100% - 40px);
    }
	.roundborder>div{
		border-radius: 10px;
		background-color: #EBEBEB;
		color: #999999;
    
	}
	.roundborder i{
		color: #999999;
	}
    .shoppingMallHeader{
        display: flex;
        align-items: center;
    }
    .headTips{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666666;
    }
    .tipName{
        margin:0px 10px;
        font-size: 11px;
    }
    .splitLine{
        border-left: 1px solid #666666;
        height: 11px;
    }


    .my-swipe{
        margin:20px 0px;
    }
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        /*line-height: 150px;*/
        text-align: center;
        /*background-color: #39a9ed;*/
    }
    .van-swipe__indicator--active{
        width: 20px;
        border-radius: 5px;
        background-color:#FF8C34!important;
    }
    .my-swipe1{
        width: calc(100% - 30px);
        margin:auto;
        border-radius: 10px;
        box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
        /*line-height: 150px;*/
    }
    .swipeTypes{
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0px;
        
    }
    .swipeType{
        width: 20%;
        box-sizing: border-box;
        margin-bottom: 20px;
        font-size: 12px;
    }
    .swipeTypeName{
        margin-top: 5px;
    }
    

    /*banner*/
    .banner{
        margin:20px 0px;
    }

    /*精品推荐*/
    .Recommend{
        width: calc(100% - 30px);
        margin:20px auto;
        border-radius: 10px;
        box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
        box-sizing: border-box;
        padding: 20px 0px;
    }
    .Recommend .RecommendHead{
        display: flex;
        align-items: center;
    }
    .Recommend .RecommendHeadTitle{
        background: rgba(255, 140, 52, 1);
        color: white;
        text-align: center;
        font-size: 14px;
        /*font-weight: bold;*/
        border-radius: 0px 20px 20px 0px;
        padding:4px 15px;

    }
    .Recommend .RecommendHeadIcon{
        margin-left: auto;
        font-size: 20px;
        font-weight: bold;
        margin-right: 10px;
    }
    .Recommend .RecommendBody{
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    .Recommend .RecommendProduct{
        width: calc(33.33% - 6px);
        text-align: left;
    }
    .Recommend .RecommendPic{}
    .Recommend .RecommendName{
        color: #666666;
        font-size: 12px;
        margin:10px 0px;
    }
    .Recommend .RecommendPrice{
        color: #FE5050;
        font-size: 16px;
    }


    /*限时秒杀*/
    .flashSale{
        display: flex;
        align-items: center;
        margin:10px auto;
        border-radius: 10px;
        width: calc(100% - 30px);
        box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
        box-sizing: border-box;
        padding: 15px 10px;
    }
    .flashSale .flashSaleTime{
        margin-left: auto;
    }
    .flashSale .flashSaleTitle{
        font-weight: bold;
        margin-left: 10px;
    }
    .flashSale .colon {
        display: inline-block;
        margin: 0 4px;
        color: rgba(43, 44, 48, 0.8);
        font-weight: bold;

    }
    .flashSale .block {
        display: inline-block;
        width: 22px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background-color: rgba(43, 44, 48, 0.8);
        border-radius: 5px;
    }
    .flashSale .flashSaleRightIcon{
        font-size: 20px;
        font-weight: bold;
    }
    
    /*猜你喜欢*/
    .productList{
        width: calc(100% - 20px);
        margin: 20px auto;
        display: flex;
        flex-wrap: wrap;

    }
    .product{
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin:5px 5px;
        box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
        border-radius:10px;

    }


</style>