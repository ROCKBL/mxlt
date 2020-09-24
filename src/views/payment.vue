<template>
	<div class="payment">
		<van-nav-bar title="支付页面"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		<div class="paymentBody">
			<div class="paymentBodyTitle">选择支付方式</div>

			<div class="paymentBodyBox">
				<div class="paymentBodyPayRow" @click="payWay='wechart'">
					<van-icon class="iconfont" class-prefix='icon' name='weixinzhifu' color="#09BB07" size="32" />
					<div>微信支付</div>
					<van-icon class="payRadio" v-if="payWay=='wechart'" name="checked" color="#FF8C34" size="22" />
					<van-icon class="payRadio" v-else name="circle" size="22" />
				</div>
				<div class="divider"></div>
				<div class="paymentBodyPayRow" @click="payWay='wallet'">
					<van-icon class="iconfont" class-prefix='icon' name='tianchongxing-' color="#FF8C34" size="32" />
					<div>钱包支付</div>
					<van-icon class="payRadio" v-if="payWay=='wallet'" name="checked" color="#FF8C34" size="22" />
					<van-icon class="payRadio" v-else name="circle" size="22" />
				</div>
			</div>

			<van-button class="confirmPay" type="warning" block>确认支付</van-button>
		</div>
		

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
			orderid:"",//订单id
			payWay:"wechart",//wechart:微信支付， wallet:钱包支付
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
        

	},
	mounted(){

	},
	created(){}

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

    .payment .paymentBody{
    	width: calc(100% - 30px);
    	margin:0px auto;
    	text-align: left;
    }

    .payment .confirmPay{
    	background-color: #F7A57D;
    	border: 1px solid #F7A57D;
    	font-size: 15px;
    	box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    	border-radius:10px;
    	margin-top: 40px;
    }

    .payment .paymentBodyBox{
    	box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    	border-radius:8px;
    	padding:0px 10px;
    	margin:10px 0px;
    	font-size: 14px;
    	color: #333333;
    }
    .payment .divider{
    	border: 1px solid rgba(0,0,0,0.1);
    }
    .payment .paymentBodyPayRow{
    	padding:10px 0px;
    	display: flex;
    	align-items: center;
    }
    .payment .paymentBodyTitle{
    	margin:10px 0px;
    }
    .payment .payRadio{
    	margin-left: auto;
    }
    .payment .iconfont{
    	margin-right: 10px;
    }
</style>