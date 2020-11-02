<template>
	<div class="goodsOrder">
		<van-nav-bar title="确认订单"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="orderAddress" @click="changeAddress">
			<van-image class="orderAddressImg" round :src="locationUrl" />
			<div class="orderAddressContent">
				<div class="orderAddressContentUp">
					<div>{{ address.name }}</div>
					<div class="orderAddressContentUpPhone">{{ address.phone }}</div>
				</div>
				<div class="orderAddressContentDown">{{ address.province }}-{{ address.city }}-{{ address.area }}{{ address.address }}</div>
			</div>
			<van-icon class="orderAddressIcon" name="arrow" />
		</div>
		
		<div class="orderDetail">
			<div class="orderDetailGoods">
				<van-image class="orderDetailGoodsImg"  src="https://img.yzcdn.cn/vant/cat.jpeg" />
				<div class="orderDetailGoodsInfo">
					<div class="orderDetailGoodsInfoName">倩碧匀净卓研淡斑双效精华露</div>
					<div class="orderDetailGoodsInfoPriceWrap">
						<div class="orderDetailGoodsInfoPrice">￥289.00</div>
						<van-stepper class="orderDetailGoodsInfoPriceNum" v-model="goodsNum" />
					</div>
				</div>
			</div>
			<van-cell title="邮费" value="￥0.00" />

			<van-cell title="优惠券" is-link  >
				<div class="couponsMoney">
					-￥0.00
				</div>
			</van-cell>

			<van-cell title="可用0.00余额0.00元"  >
				<!-- <template #right-icon>
					<van-icon :name="leftMoneyIcon" :color="leftMoneyIconColor" size="20" @click="leftMoney" />
				</template> -->
			</van-cell>
			<van-cell title="总订单金额" value="￥289.00" />
		</div>

		<van-submit-bar :price="3050" button-text="提交订单" button-color="#FF8C34" @submit="onSubmit" class="submitRow" />

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

// import Vant from 'vant';
// import 'vant/lib/index.css';
import { Dialog } from 'vant';

// Vue.use(Vant);
Vue.use(Dialog);

import { agetDefalut } from '@/api/address'

export default {
	name: '',
	store,
	data(){
		return{
			address:{
				// name:"陈某某",
				// phone:"13858718329",
				// address:"浙江省-温州市-龙湾区浙南云谷X幢"
			},
			useLeftMoney:false,

			goodsNum:1,

			locationUrl:require('../assets/imgs/location.png')
		}
	},
	computed:{
		leftMoneyIcon(){
			if(this.useLeftMoney==true){
				return "checked"
			}
			return "circle"
		},
		leftMoneyIconColor(){
			if(this.useLeftMoney==true){
				return "#FF8C34"
			}
			return ""
		}
	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        changeAddress(){
        	// 跳转选择地址
        	this.$router.push("/address")
        },
        onSubmit(){},
        leftMoney(){

        	if(this.useLeftMoney==false){
        		this.useLeftMoney=true
        		return
        	}
        	if (this.useLeftMoney==true) {
        		this.useLeftMoney=false
        		return
        	}
        },
        getAddress(){
        	var that=this;
        	agetDefalut().then(function(response){
        		// console.log(response)
        		that.address=response.result
        	})
        }

	},
	mounted(){

	},
	created(){
		this.getAddress()
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

	.goodsOrder .orderAddress{
		width: calc(100% - 20px);
		margin:15px auto;
		border-radius:10px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		padding: 10px;
		box-sizing: border-box;

		display: flex;
		align-items: center;
		text-align: left;
		font-size: 14px;
	}

	.goodsOrder .orderDetail{
		width: calc(100% - 20px);
		margin:15px auto;
		border-radius:10px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		padding: 10px;
		box-sizing: border-box;
	}


	.goodsOrder .orderAddressIcon{
		margin-left: auto;
	}
	.goodsOrder .orderAddressImg{
		width: 50px;
		height: 50px;
	}
	.goodsOrder .orderAddressContent{
		margin-left: 15px;
	}
	.goodsOrder .orderAddressContentUp{
		display: flex;
		color: #666666;
		align-items: center;
	}
	.goodsOrder .orderAddressContentUpPhone{
		margin-left: 10px;
	}
	.goodsOrder .orderAddressContentDown{
		font-size: 11px;
		margin-top: 10px;
	}

	.goodsOrder .submitRow{
		box-shadow:0px -3px 6px rgba(0,0,0,0.16);
	}
	.goodsOrder .submitRow .van-submit-bar__text{
		text-align: left;
	}

	.goodsOrder .orderDetail{
		text-align: left;
	}
	.goodsOrder .orderDetail .van-cell__value{
		color: #333333;
	}

	.goodsOrder .orderDetail .van-cell{
		align-items: center;
	}
	
	.goodsOrder .orderDetail .van-cell{
		padding: 15px 0px;
	}

	.goodsOrder .orderDetailGoods{
		display: flex;
		font-size: 14px;
		color: #333333;
		/*align-items: center;*/
	}
	

	.goodsOrder .orderDetailGoodsImg{
		width: 80px;
	}
	.goodsOrder .orderDetailGoodsInfo{
		width: calc(100% - 100px);
		margin-left: 20px;
	}

	.goodsOrder .orderDetailGoodsInfoPriceWrap{
		display: flex;
		align-items: center;
		margin-top: 10px;
	}
	.goodsOrder .orderDetailGoodsInfoPriceNum{
		margin-left: auto;
	}
	.goodsOrder .orderDetailGoodsInfoPrice{
		color: #FE5050;
	}

	.couponsMoney{
		color: #FE5050
	}
</style>