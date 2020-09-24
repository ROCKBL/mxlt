<template>
	<div class="orderList">
		<van-nav-bar title="订单"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		<van-tabs v-model="active" color="#FF8C34" title-active-color="#FF8C34" title-inactive-color="#999999" @click="onTabsClick">
		  	<van-tab title="全部">
		  		<div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNum }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<div class="orderItemBodyGoods" v-for="goods in order.goodsList">
		  					<van-image :src="goods.pic" class="orderItemBodyGoodsPic" />
		  					<div class="">
		  						<div class="orderItemBodyGoodsName">{{ goods.name }}</div>
		  						<div class="orderItemBodyGoodsNum">
		  							<div class="label">数量</div>
		  							<div class="value">X{{ goods.number }}</div>
		  						</div>
		  						<div class="orderItemBodyGoodsPrice">
		  							<div class="label">单价</div>
		  							<div class="value">￥{{ goods.price }}</div>
		  						</div>
		  					</div>
		  				</div>
		  				<div class="orderItemTotal">
		  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
		  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
		  					<div class="orderItemTotalLabel">合计：</div>
		  					<div class="orderItemTotalUnit">￥</div>
		  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
		  				</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<van-button class="orderItemFootButton orderItemFootButtonleft" round type="default" size="small" color="#FF8C34" plain @click="payOrder(order)">立即支付</van-button>
		  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="removeOrder(order)">删除订单</van-button>
		  			</div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="待付款">
				<div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNum }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<div class="orderItemBodyGoods" v-for="goods in order.goodsList">
		  					<van-image :src="goods.pic" class="orderItemBodyGoodsPic" />
		  					<div class="">
		  						<div class="orderItemBodyGoodsName">{{ goods.name }}</div>
		  						<div class="orderItemBodyGoodsNum">
		  							<div class="label">数量</div>
		  							<div class="value">X{{ goods.number }}</div>
		  						</div>
		  						<div class="orderItemBodyGoodsPrice">
		  							<div class="label">单价</div>
		  							<div class="value">￥{{ goods.price }}</div>
		  						</div>
		  					</div>
		  				</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<div class="orderItemTotal">
		  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
		  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
		  					<div class="orderItemTotalLabel">合计：</div>
		  					<div class="orderItemTotalUnit">￥</div>
		  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
		  				</div>
		  			</div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="待发货">
				<div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNum }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<div class="orderItemBodyGoods" v-for="goods in order.goodsList">
		  					<van-image :src="goods.pic" class="orderItemBodyGoodsPic" />
		  					<div class="">
		  						<div class="orderItemBodyGoodsName">{{ goods.name }}</div>
		  						<div class="orderItemBodyGoodsNum">
		  							<div class="label">数量</div>
		  							<div class="value">X{{ goods.number }}</div>
		  						</div>
		  						<div class="orderItemBodyGoodsPrice">
		  							<div class="label">单价</div>
		  							<div class="value">￥{{ goods.price }}</div>
		  						</div>
		  					</div>
		  				</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<div class="orderItemTotal">
		  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
		  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
		  					<div class="orderItemTotalLabel">合计：</div>
		  					<div class="orderItemTotalUnit">￥</div>
		  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
		  				</div>
		  			</div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="待收货">
				<div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNum }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<div class="orderItemBodyGoods" v-for="goods in order.goodsList">
		  					<van-image :src="goods.pic" class="orderItemBodyGoodsPic" />
		  					<div class="">
		  						<div class="orderItemBodyGoodsName">{{ goods.name }}</div>
		  						<div class="orderItemBodyGoodsNum">
		  							<div class="label">数量</div>
		  							<div class="value">X{{ goods.number }}</div>
		  						</div>
		  						<div class="orderItemBodyGoodsPrice">
		  							<div class="label">单价</div>
		  							<div class="value">￥{{ goods.price }}</div>
		  						</div>
		  					</div>
		  				</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<div class="orderItemTotal">
		  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
		  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
		  					<div class="orderItemTotalLabel">合计：</div>
		  					<div class="orderItemTotalUnit">￥</div>
		  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
		  				</div>
		  			</div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="待评价">
				<div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNum }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<div class="orderItemBodyGoods" v-for="goods in order.goodsList">
		  					<van-image :src="goods.pic" class="orderItemBodyGoodsPic" />
		  					<div class="">
		  						<div class="orderItemBodyGoodsName">{{ goods.name }}</div>
		  						<div class="orderItemBodyGoodsNum">
		  							<div class="label">数量</div>
		  							<div class="value">X{{ goods.number }}</div>
		  						</div>
		  						<div class="orderItemBodyGoodsPrice">
		  							<div class="label">单价</div>
		  							<div class="value">￥{{ goods.price }}</div>
		  						</div>
		  					</div>
		  				</div>

		  				<div class="orderItemTotal">
		  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
		  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
		  					<div class="orderItemTotalLabel">合计：</div>
		  					<div class="orderItemTotalUnit">￥</div>
		  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
		  				</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<van-button class="orderItemFootButton orderItemFootButtonleft" round type="default" size="small" color="#FF8C34" plain @click="appraiseOrder(order)">去评价</van-button>
		  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="removeOrder(order)">删除订单</van-button>
		  			</div>
		  		</div>
		  	</van-tab>
		</van-tabs>

		<van-empty v-if="orderList.length==0" class="emptyImg" :image="emptyImg" description="您还没有相关订单"/>
	</div>
</template>

<script type="text/javascript">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import Vue from 'vue';
import store from '@/store';

// // 手动引入vant单个组件
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';

import Vant from 'vant';
import 'vant/lib/index.css';
import { Dialog } from 'vant';

Vue.use(Vant);
Vue.use(Dialog);

export default {
	name: '',
	store,
	data(){
		return{
			active:0,
			orderList:[
				{orderNum:"KB123456789",status:"未支付",id:1,deliverFee:0,totalNum:2,totalprice:"433.44",goodsList:[
					{name:"【奥昵玻尿酸0.5ml】守护年 轻的秘密",price:"289.00", pic:"https://img.yzcdn.cn/vant/cat.jpeg",number:1},
					{name:"【奥昵玻尿酸0.5ml】守护年 轻的秘密",price:"289.00", pic:"https://img.yzcdn.cn/vant/cat.jpeg",number:1}
				]}
			],//多个Tab共用一个数组

			emptyImg:require("../assets/imgs/empty.png")
		}
	},
	computed:{
		
	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        onTabsClick(name, title){
        	console.log(name,"xx" ,title)
        	// 服务器获取订单数据
        },
        removeOrder(order){
        	// 删除订单
        },
        confirmOrder(order){
        	// 确认订单
        },
        appraiseOrder(order){
        	// 评价订单
        },
        payOrder(order){
        	// 立即支付
        }

	},
	mounted(){

	},
	created(){

	}

}
</script>

<style type="text/css" >
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
	
	.orderList{
		font-size: 14px;
	}
	.orderList .orderItem{
		border-radius:10px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		width: calc(100% - 30px);
		margin:10px auto;
	}
	
	.orderList .orderItemHead{
		display: flex;
		align-items: center;
		padding: 10px;
	}
	.orderList .orderItemHeadOrderNum{
		border-left: 3px solid #F20049;
		padding-left: 5px;
	}
	.orderList .orderItemHeadStatus{
		margin-left: auto;
		color: #FF3434;
	}
	.orderList .orderItemFoot{
		display: flex;
		border-top:1px solid rgba(0,0,0,.1);
		padding: 10px;
	}
	.orderList .orderItemFootButton{
		/*margin:0px 10px;*/
		margin-right: 10px;
	}
	.orderList .orderItemFootButtonleft{
		margin-left: auto;
	}
	
	
	.orderList .orderItemBody{
		/*display: flex;*/
		padding: 10px;
		text-align: left;
	}
	.orderList .orderItemBodyGoods{
		display: flex;
		align-items: flex-start;
		margin-bottom: 10px;
	}
	.orderList .orderItemBodyGoodsPic{
		width: 80px;
	}
	.orderList .orderItemBodyGoodsName{
		/*margin:0px 10px;*/
		margin-right: 10px;
		margin-bottom: 10px;
	}
	.orderList .orderItemBodyGoodsPrice{
		color: #FE5050;

	}
	.orderList .orderItemBodyGoodsNum,.orderList .orderItemBodyGoodsPrice{
		display: flex;
		margin:2px 10px;
		margin-right: 0px;
	}
	.orderList .label{
		font-size: 11px;
		color: #333333;
	}
	.orderList .value{
		margin-left: auto;
		font-size: 14px;
		color: #333333;
	}

	.orderList .emptyImg .van-empty__image{
		width: 100px;
		height: 100px;
		background-color: #FFE8D6;
		border-radius: 50%;

	}

	.orderList .orderItemTotal{
		display: flex;
		align-items: center;
		font-size: 11px;
		color: #999999;
		flex:1;
	}
	.orderList .orderItemTotalMoney{
		font-weight: bold;
		color: #FE5050;
		font-size: 16px;
	}
	.orderList .orderItemTotalUnit{
		color: #FF3434;
		font-size: 14px;
		font-weight: bold;
	}
	.orderList .orderItemTotalDeliverFee{
		margin-left: auto;
	}
	.orderList .orderItemTotalLabel{
		color: #333333;
	}
</style>