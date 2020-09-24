<template>
	<div class="editeBankCard">
		<van-nav-bar title="钱包明细"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="cardForm">
			<van-field label="银行类型:" :value="bank" readonly right-icon="arrow" placeholder="请选择银行卡类型" @click="chooseBank" />
			<van-field v-model="userName" label="真实姓名:" placeholder="请输入您的真实姓名" />
			<van-field v-model="bankId" type="number" label="银行卡号:" placeholder="请输入您的银行卡号" />
		</div>

		<van-button @click="submit" class="submit" type="primary" block>确定</van-button>

		<van-popup v-model="bankShowFlag" position="bottom"  round>
			<div class="van-hairline--bottom popupItem" v-for="bank in bankList" @click="bankConfirm(bank)">{{ bank }}</div>
		</van-popup>
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
			bankList:["建设银行","交通银行"],
			bank:"",
			userName:"",
			bankId:null,
			bankShowFlag:false,

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
        submit(){
        	// 跳转添加银行卡
        },
        chooseBank(){
        	this.bankShowFlag=true
        },
        bankConfirm(bank){
        	this.bankShowFlag=false
        	this.bank=bank
        }
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

    .editeBankCard .submit{
    	background:rgba(255,140,52,1);
    	border-color: rgba(255,140,52,1);
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		border-radius:10px;
		width: calc(100% - 30px);
		margin:30px auto;
    }

    .editeBankCard .cardForm{
    	width: calc(100% - 30px);
    	margin:10px auto;
    	border-radius:10px;
    	box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    }

    .editeBankCard .van-cell{
    	background-color: transparent;
    }

    .editeBankCard .popupItem{
    	padding: 10px 0px;
    }
</style>