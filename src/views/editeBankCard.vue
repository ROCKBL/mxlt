<template>
	<div class="editeBankCard">
		<van-nav-bar title="绑定银行卡"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="cardForm">
			<!-- <van-field label="银行类型:" :value="bank" readonly right-icon="arrow" placeholder="请选择银行卡类型" @click="chooseBank" /> -->

			<van-field v-model="bankInfo.type" label="银行类型:" placeholder="请输入银行名称，如中国银行" />
			<van-field v-model="bankInfo.name" label="真实姓名:" placeholder="请输入您的真实姓名" />
			<van-field v-model="bankInfo.cardId" label="身份证号:" placeholder="请输入您的身份证号" />
			<van-field v-model="bankInfo.phone" type="number" label="手机号码:" placeholder="请输入您的手机号码" />
			<van-field v-model="bankInfo.cardNo" type="number" label="银行卡号:" placeholder="请输入您的银行卡号" />
		</div>

		<van-button @click="add" v-if="type=='add'" class="submit" type="primary" block>确定</van-button>
		<van-button @click="modify" v-else class="submit" type="primary" block>确定</van-button>

		<!-- <van-popup v-model="bankShowFlag" position="bottom"  round>
			<div class="van-hairline--bottom popupItem" v-for="bank in bankList" @click="bankConfirm(bank)">{{ bank }}</div>
		</van-popup> -->
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

import { bmodfiy,bpublish} from '@/api/bank'

import { mapState } from 'vuex'

export default {
	name: '',
	store,
	data(){
		return{
			// bankList:["建设银行","交通银行"],
			// bank:"",
			// userName:"",
			// bankId:null,

			bankInfo:{
				// cardId 身份证
				// cardNo 银行卡号
				// defaultIs 是否默认
				// name 姓名
				// phone 手机号码
				// type 银行隶属
			},

			// bankShowFlag:false,
			type:"add",//新增模式还是编辑模式
		}
	},
	computed:{
		...mapState({
            userInfo(state){ return state.userInfo},
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
        testPhone(phone){
        	if(!(/^1[3456789]\d{9}$/.test(phone))){
        		this.Toast("请输入正确的手机号码")
		        return false; 
		    } 
		    return true
        },
        testCardId(cardId){
        	var reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
        	// var reg = /^(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)$/;
		    if(reg.test(cardId) === false){
		    	this.Toast("请输入正确的身份证号")
		        return false;
		    }
		    return true;
        },
        testCardNo(cardNo){
        	var reg = /^([1-9]{1})(\d{15}|\d{18})$/; 
        	if(reg.test(cardNo) === false){
		    	this.Toast("请输入正确的银行卡号")
		        return false;
		    }
		    return true;
        },
        alltest(){
        	return this.testPhone(this.bankInfo.phone)&&this.testCardId(this.bankInfo.cardId)&&this.testCardNo(this.bankInfo.cardNo)
        },
        add(){
        	var that=this;
        	// 跳转添加银行卡
        	if(!this.alltest()){
        		return
        	};
        	this.bankInfo.defaultIs=true
        	bpublish(this.bankInfo).then(function(res){
        		// console.log(res)
        		if(res.msg=="success"){
        			that.$router.go(-1)
        		}
        	})
        },
        modify(){
        	var that=this;
        	if(!this.alltest()){
        		return
        	};
        	bmodfiy(this.bankInfo).then(function(res){
        		// console.log(res)
        		if(res.msg=="success"){
        			that.$router.go(-1)
        		}
        	})
        },


        // chooseBank(){
        // 	this.bankShowFlag=true
        // },
        // bankConfirm(bank){
        // 	this.bankShowFlag=false
        // 	this.bank=bank
        // }

	},
	mounted(){

	},
	created(){
		var o=this.$router.currentRoute.query.o;
		if(o){
			this.type="edite"
			this.bankInfo=JSON.parse(o)
		}
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