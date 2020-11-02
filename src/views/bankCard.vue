<template>
	<div class="bankCard">
		<van-nav-bar title="银行卡"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="card" v-for="card in bankCards">
			<div class="cardInfo">
				<div class="bankName">{{ card.type }}</div>
				<div class="userName">{{ card.name }}</div>
			</div>
			<div class="cardId">{{ card.cardNo }}</div>

			<div class="addressBtns">
				<div class="addressChecked" v-if="card.defaultIs"><van-icon name="checked" class="setDafultAddressIcon" />默认银行卡</div>
				<div class="addressUnChecked" v-else @click="setDafultAddress(card)"><van-icon name="circle" class="setDafultAddressIcon" />设为默认银行卡</div>
				<div class="addressBtnsEdite" @click="editeAddress(card)"><van-icon name="edit" />编辑</div>
				<div class="addressBtnsRemove" @click="deleteAddress(card)"><van-icon name="delete" />删除</div>
			</div>
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

// import Vant from 'vant';
// import 'vant/lib/index.css';
import { Dialog } from 'vant';

// Vue.use(Vant);
Vue.use(Dialog);

import { bdelete,bpage,bsetDefault } from '@/api/bank'

import { mapState } from 'vuex'

export default {
	name: '',
	store,
	data(){
		return{
			bankCards:[
				// {bankName:"中国建设银行",userName:"菲菲",cardId:"6236681420020586931"},
				// {bankName:"中国建设银行",userName:"菲菲",cardId:"6236681420020586931"},
			]
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
        addCard(){
        	// 跳转添加银行卡
        	this.$router.push("/editeBankCard")
        },

        deleteAddress(o){
	    	var that=this

	    	Dialog.confirm({
			  title: '',
			  message: '确认删除地址?',
			})
			  .then(() => {
			    // on confirm
			    // console.log(1)
			    bdelete({
			    	id:o.id
			    }).then(function(response){
			    	that.getData()
			    })
			  })
			  .catch(() => {
			    // on cancel
			    console.log(2)
			  });
	    },
	    editeAddress(o){
	    	this.$router.push({
                name:"editeBankCard",
                query: {
                    o:JSON.stringify(o)
                    // o:o
                }
            })
	    },
	    setDafultAddress(o){
	    	// 设置默认地址
	    	console.log(o)

	    	var that=this;
	    	bsetDefault({
	    		id:o.id
	    	}).then(function(response){
	    		that.getData()
	    	})

	    },
	    getData(){
	    	var that=this;
	    	bpage({
	    		start:1,
	    		limit:9999,
	    		consumerId:this.userInfo.id
	    	}).then(function(response){
	    		console.log(response)
	    		that.bankCards=response.result.items

	    	})
	    }
	},
	mounted(){

	},
	created(){
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

    .bankCard .card .cardInfo{
    	display: flex;
    	align-items: center;
    	padding: 10px;
    }
    .bankCard .card .bankName{
    	margin-right: 20px;
    }
    .bankCard .card .cardId{
    	padding:10px;
    	margin-top: 10px;

    }




    .bankCard .addressBtns{
		display: flex;
		padding: 5px;
		align-items: center;
		font-size: 12px;
		/*color:rgba(153,153,153,1);*/
		padding: 10px;
		color: white;
		border-top: 1px solid rgba(255,255,255,0.2);
	}
	.bankCard .addressBtnsEdite{
		margin-left: auto;
		display: flex;
		align-items: center;
	}
	.bankCard .addressBtnsRemove{
		display: flex;
		align-items: center;
		margin-left: 10px;
	}

	.bankCard .addressChecked{
		display: flex;
		align-items: center;
	}
	.bankCard .addressUnChecked{
		display: flex;
		align-items: center;
	}
	.bankCard .setDafultAddressIcon{
		margin-right: 5px;
		font-size: 16px;
	}

	.bankCard .addressChecked .setDafultAddressIcon{
		/*color: #FF8C34*/
		color: white;
	}
</style>