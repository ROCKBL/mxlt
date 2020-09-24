<template>
	<div class="bankCard">
		<van-nav-bar title="钱包明细"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="card" v-for="card in bankCards">
			<div class="cardInfo">
				<div class="bankName">{{ card.bankName }}</div>
				<div class="userName">{{ card.userName }}</div>
			</div>
			<div class="cardId">{{ card.cardId }}</div>
		</div>

		<van-button @click="addCard" class="addBtn" type="primary" block><van-icon name="plus" size="18" style="margin-right: 5px;" />添加银行卡</van-button>
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
			bankCards:[
				{bankName:"中国建设银行",userName:"菲菲",cardId:"6236681420020586931"},
				{bankName:"中国建设银行",userName:"菲菲",cardId:"6236681420020586931"},
			]
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
        addCard(){
        	// 跳转添加银行卡
        	this.$router.push("/editeBankCard")
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

    .bankCard .addBtn{
    	background-color: #FF8C34;
    	border-radius:10px;
    	box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    	width: 70%;
    	margin:30px auto;
    	border-color:  #FF8C34;
    	
    }
    .bankCard .van-button__text{
    	display: flex;
    	align-items: center;
    	font-size: 15px;
    }

    .bankCard .card{
    	background:linear-gradient(190deg,rgba(245,178,128,1) 0%,rgba(255,140,52,1) 100%);
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		border-radius:10px;
		color: white;
		font-size: 14px;
		text-align:left;
		width: calc(100% - 30px);
		margin: 10px auto;
    }

    .card .cardInfo{
    	display: flex;
    	align-items: center;
    	padding: 10px;
    }
    .card .bankName{
    	margin-right: 20px;
    }
    .card .cardId{
    	padding:10px;
    	margin-top: 10px;

    }
</style>