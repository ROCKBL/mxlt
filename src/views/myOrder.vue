<template>
	<div class="myOrder">
		<van-nav-bar title="订单"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		<van-tabs v-model="active" color="#FF8C34" title-active-color="#FF8C34" title-inactive-color="#999999" @click="onTabsClick">
		  	<van-tab title="全部">
		  		<div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadHospital">{{ order.hospital }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<van-image :src="order.pic" class="orderItemBodyPic" />
		  				<div class="orderItemBodyName">{{ order.name }}</div>
		  				<div class="orderItemBodyPrice">￥{{ order.price }}</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="removeOrder(order)">删除订单</van-button>
		  			</div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="预约中">
				<div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadHospital">{{ order.hospital }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<van-image :src="order.pic" class="orderItemBodyPic" />
		  				<div class="orderItemBodyName">{{ order.name }}</div>
		  				<div class="orderItemBodyPrice">￥{{ order.price }}</div>
		  			</div>

		  		</div>
		  	</van-tab>
		  	<van-tab title="已实施">
				<div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadHospital">{{ order.hospital }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<van-image :src="order.pic" class="orderItemBodyPic" />
		  				<div class="orderItemBodyName">{{ order.name }}</div>
		  				<div class="orderItemBodyPrice">￥{{ order.price }}</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="confirmOrder(order)">确认实施</van-button>
		  			</div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="已完成">
				<div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadHospital">{{ order.hospital }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<van-image :src="order.pic" class="orderItemBodyPic" />
		  				<div class="orderItemBodyName">{{ order.name }}</div>
		  				<div class="orderItemBodyPrice">￥{{ order.price }}</div>
		  			</div>
		  			<div class="orderItemFoot">
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
			active:1,
			orderList:[
				{name:"【奥昵玻尿酸0.5ml】守护年 轻的秘密",hospital:"亚太美立方医疗美容",status:"未支付",price:"289.00",pic:"https://img.yzcdn.cn/vant/cat.jpeg",id:1}
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
	
	.myOrder{
		font-size: 14px;
	}
	.myOrder .orderItem{
		border-radius:10px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		width: calc(100% - 30px);
		margin:10px auto;
	}
	
	.myOrder .orderItemHead{
		display: flex;
		align-items: center;
		padding: 10px;
	}
	.myOrder .orderItemHeadHospital{
		border-left: 3px solid #F20049;
		padding-left: 5px;
	}
	.myOrder .orderItemHeadStatus{
		margin-left: auto;
		color: #FF3434;
	}
	.myOrder .orderItemFoot{
		display: flex;
		border-top:1px solid rgba(0,0,0,.1);
	}
	.myOrder .orderItemFootButton{
		margin:10px;
		margin-left: auto;
	}
	
	.myOrder .orderItemBody{
		display: flex;
		padding: 10px;
		text-align: left;
	}
	.myOrder .orderItemBodyPic{
		width: 80px;
	}
	.myOrder .orderItemBodyName{
		margin:0px 10px;
	}
	.myOrder .orderItemBodyPrice{
		color: #FE5050;
		margin-left: auto;

	}

	.myOrder .emptyImg .van-empty__image{
		width: 100px;
		height: 100px;
		background-color: #FFE8D6;
		border-radius: 50%;

	}
</style>