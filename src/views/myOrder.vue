<template>
	<div class="myOrder">
		<van-nav-bar title="订单"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		<van-tabs v-model="active" color="#FF8C34" title-active-color="#FF8C34" title-inactive-color="#999999" @click="onTabsClick">
		  	<van-tab title="全部">
		  		<!-- <div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadHospital">{{ order.hospitalName }}</div>
		  				<div class="orderItemHeadStatus">{{ getStateName(order.orderState) }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<van-image :src="order.firstImage" class="orderItemBodyPic" />
		  				<div class="orderItemBodyName">{{ order.projectName }}</div>
		  				<div class="orderItemBodyPrice">￥{{ order.money }}</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="removeOrder(order)">删除订单</van-button>

		  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="confirmOrder(order)">确认实施</van-button>
		  			</div>
		  		</div> -->
		  	</van-tab>
		  	<van-tab title="预约中">
				<!-- <div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadHospital">{{ order.hospitalName }}</div>
		  				<div class="orderItemHeadStatus">{{ getStateName(order.orderState) }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<van-image :src="order.firstImage" class="orderItemBodyPic" />
		  				<div class="orderItemBodyName">{{ order.projectName }}</div>
		  				<div class="orderItemBodyPrice">￥{{ order.money }}</div>
		  			</div>

		  		</div> -->
		  	</van-tab>
		  	<van-tab title="已实施">
				<!-- <div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadHospital">{{ order.hospitalName }}</div>
		  				<div class="orderItemHeadStatus">{{ getStateName(order.orderState) }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<van-image :src="order.firstImage" class="orderItemBodyPic" />
		  				<div class="orderItemBodyName">{{ order.projectName }}</div>
		  				<div class="orderItemBodyPrice">￥{{ order.money }}</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="confirmOrder(order)">确认实施</van-button>
		  			</div>
		  		</div> -->
		  	</van-tab>
		  	<van-tab title="已完成">
				<!-- <div v-for="order in orderList" class="orderItem">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadHospital">{{ order.hospitalName }}</div>
		  				<div class="orderItemHeadStatus">{{ getStateName(order.orderState) }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<van-image :src="order.firstImage" class="orderItemBodyPic" />
		  				<div class="orderItemBodyName">{{ order.projectName }}</div>
		  				<div class="orderItemBodyPrice">￥{{ order.money }}</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="removeOrder(order)">删除订单</van-button>
		  			</div>
		  		</div> -->
		  	</van-tab>
		</van-tabs>
		<div v-for="order in orderList" class="orderItem">
  			<div class="orderItemHead">
  				<div class="orderItemHeadHospital">{{ order.hospitalName }}</div>
  				<div class="orderItemHeadStatus">{{ getStateName(order.orderState) }}</div>
  			</div>
  			<div class="orderItemBody" @click="seeDetail(order)">
  				<van-image :src="order.firstImage" class="orderItemBodyPic" />
  				<div class="orderItemBodyName">{{ order.projectName }}</div>
  				<div class="orderItemBodyPrice">￥{{ order.money }}</div>
  			</div>
  			<div class="orderItemFoot">
  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" v-if="order.orderState==0" plain @click="removeOrder(order)">删除订单</van-button>
  				<van-button style="margin:10px;margin-left: 0px;" round type="info" size="small" v-if="order.orderState==0" plain  @click="payOrder(order)">我要付款</van-button>

  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" v-if="order.orderState==2" plain @click="confirmOrder(order)">确认实施</van-button>

  				<!-- <van-button class="orderItemFootButton" round type="default" size="small" color="#333333" v-if="order.orderState==1" plain @click="applyRefund(order)">申请退款</van-button> -->
  			</div>
  		</div>
		<van-empty v-if="orderList.length==0" class="emptyImg" :image="emptyImg" description="您还没有相关订单"/>
	</div>
</template>

<script type="text/javascript">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import Vue from 'vue';
import store from '@/store';

// // 手动引入vant单个组件
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';

// import Vant from 'vant';
// import 'vant/lib/index.css';
// import { Dialog } from 'vant';

// Vue.use(Vant);
// Vue.use(Dialog);

import { mapState } from 'vuex'
import { pdelete,pdetails,pcomsunerModifyConfirm,pmyPage,psendPay,papply } from '@/api/project'

export default {
	name: '',
	store,
	data(){
		return{
			active:0,
			orderList:[
				// {projectName:"【奥昵玻尿酸0.5ml】守护年 轻的秘密",hospitalName:"亚太美立方医疗美容",status:"未支付",money:"289.00",firstImage:"https://img.yzcdn.cn/vant/cat.jpeg",id:1}
			],//多个Tab共用一个数组

			emptyImg:require("../assets/imgs/empty.png")
		}
	},
	computed:{
		...mapState({
			userInfo(state){ return state.userInfo }
		})
	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        getStateName(num){
        	var s=""
        	// 0=待付款,1=预约中,2=已实施,3=已完成,4=申请退款,5=退款成功,6=退款拒绝
        	switch(num){
        		case 0:
        			s="待付款";
        			break;
        		case 1:
        			s="预约中";
        			break;
        		case 2:
        			s="已实施";
        			break;
        		case 3:
        			s="已完成";
        			break;
        		case 4:
        			s="申请退款";
        			break;
        		case 5:
        			s="退款成功";
        			break;
        		case 6:
        			s="退款拒绝";
        			break;
        	}
        	return s
        },
        onTabsClick(name, title){
        	// 服务器获取订单数据
        	this.getData()
        },
        payOrder(order){
        	// 支付订单
        	var that=this;
        	psendPay({
        		id:order.id
        	}).then(function(res){
        		var rtn=res.result
	    		wx.chooseWXPay({
		            timestamp: rtn.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		            nonceStr: rtn.nonceStr, // 支付签名随机串，不长于 32 位
		            package: rtn.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
		            signType: rtn.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		            paySign: rtn.paySign, // 支付签名
		            success: function (res) {
		              	console.log(res)
		              	// 支付成功后的回调函数

		              	// 跳转支付成功页面
		              	// that.getData()
		              	// that.$router.replace("/successPay")
		              	that.$router.go(-1)
		            }
		        });

        		
        	})
        },
        removeOrder(order){
        	// 删除订单
        	var that=this;
        	console.log(order)
        	pdelete({
        		id:order.id
        	}).then(function(res){
        		that.getData()
        	})
        },
        confirmOrder(order){
        	// 确认订单
        	var that=this;
        	pcomsunerModifyConfirm({
        		id:order.id
        	}).then(function(res){
        		that.getData()
        	})
        },
        seeDetail(order){
        	this.$router.push({
                name: 'appointmentInfo',
                query: { id:order.id }
            });
        },
        applyRefund(order){
        	var that=this;
        	papply({
        		id:order.id,
        		// reason: 原因
        	}).then(function(res){
        		that.getData()
        	})
        },
        getData(){
        	var that=this;
        	var data={
        		comsunerId:this.userInfo.id,
        		limit:999,
        		start:1
        	}
        	that.orderList.length=0;
        	switch(this.active){
        		case 1:
        			data.state=1;
        			break;
        		case 2:
        			data.state=2;
        			break;
        		case 3:
        			data.state=3;
        			break;
        	}
        	
        	pmyPage(data).then(function(res){
        		// console.log(res)
        		that.orderList=res.result.items
        	})
        }
	},
	mounted(){

	},
	created(){
		// console.log(this.$router.currentRoute.query.name)
		var name=this.$router.currentRoute.query.name
		switch(name){
			case "全部订单":
				this.active=0;
				break;
			case "预约单":
				this.active=1;
				break;
			case "已消费":
				this.active=2;
				break;
			case "已完成":
				this.active=3;
				break;
		}
		this.getData()


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