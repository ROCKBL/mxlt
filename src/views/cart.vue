<template>
	<div class="cart">
		<van-nav-bar title="购物车"  left-arrow class="pageNavNative" @click-left="onClickLeft" :right-text="mode==='pay'?'管理':'完成'" @click-right="onClickRight" />
		
		<div class="goods" v-for="goods in goodsList">
			<van-icon v-if="ischecked(goods)" class="goodsIcon" name="checked" @click="unCheckGoods(goods)" color="#FF8C34" size="20" />
			<van-icon v-else class="goodsIcon" name="circle" @click="checkGoods(goods)" size="20" />
			<van-image class="goodsImg" width="80" height="80" src="https://img.yzcdn.cn/vant/cat.jpeg"  />
			<div class="goodsWrap">
				<div class="goodsName">{{ goods.name }}</div>
				<div class="goodsBottomRow">
					<div class="goodsPrice">￥{{ (goods.number*goods.price).toFixed(2) }}</div>
					<van-stepper class="goodsSteper" v-model="goods.number" />
				</div>
			</div>
		</div>


		<van-submit-bar class="fixedRow" v-show="mode=='pay'" :price="3050" button-text="去结算" @submit="goPay">
		  	<van-checkbox v-model="allChecked" @click="allCheck">全选</van-checkbox>
		</van-submit-bar>
		<van-submit-bar class="fixedRow" v-show="mode=='delete'" button-text="删除" @submit="deleteGoods">
		  	<van-checkbox v-model="allChecked" @click="allCheck">全选</van-checkbox>
		</van-submit-bar>
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
			mode:"pay",//页面模式   pay:结算模式 ，delete:删除模式

			// allChecked:false,
			checkedAr:[],
			goodsList:[
				{name:"【奥昵玻尿酸0.5ml】守护年轻的秘密",number:1,price:289.11,id:1,},
				{name:"【奥昵玻尿酸0.5ml】守护年轻的秘密",number:1,price:289.11,id:2,}
			],
		}
	},
	computed:{
		allChecked(){
			if(this.goodsList.length>0&&this.goodsList.length==this.checkedAr.length){
				return true
			}
			return false

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
        onClickRight(){
        	if(this.mode=="pay"){
        		this.mode="delete"
        		return
        	}
        	if(this.mode=="delete"){
        		this.mode="pay"
        		return
        	}
        },
        goPay(){
        	// 结算checkedAr里的商品
        },
        deleteGoods(){
        	// 删除checkedAr里的商品
        },
        ischecked(goods){
        	for(var o of this.checkedAr){
        		if (o.id===goods.id) {
        			return true
        		}
        	}
        	return false
        },
        checkGoods(goods){
        	this.checkedAr.push(goods)
        },
        unCheckGoods(goods){
        	var index=0;
        	for(var i=0;i<this.checkedAr.length;i++){
        		if(this.checkedAr[i].id===goods.id){
        			index=i;
        			break;
        		}
        	}
        	this.checkedAr.splice(index,1)
        },
        allCheck(){
        	if(this.checkedAr.length==this.goodsList.length){
        		this.checkedAr=[];
        		return
        	}

        	this.checkedAr=[].concat(this.goodsList)
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
    .cart .van-nav-bar__text{
    	color: white;
    	font-size: 15px;
    }

    .cart{
    	text-align: left;
    	font-size: 14px;
    	color: #333333;
    }
    .cart .fixedRow{
    	box-shadow:0px -3px 6px rgba(0,0,0,0.16);
    }
    .cart .van-submit-bar__bar{
    	justify-content: flex-start;
    }
    .cart .van-submit-bar__button{
    	background: #FF8C34;
    	height: 32px;
    	margin-left: auto;
    }
    .cart .van-checkbox__label{
    	color: #999999;
    }

    .cart .goods{
    	display: flex;
    	align-items: center;
    	width: calc(100% - 30px);
    	margin:10px auto;
    }
    .cart .goodsIcon{
    	margin-right: 10px;
    }

    .cart .goodsWrap{
    	align-self: baseline;
    	flex:1;
    	margin-left: 10px;
    	height: 80px;
    	display: flex;
    	flex-direction: column;
    }
    .cart .goodsPrice{
    	color: #FF3434;
    }

    .cart .goodsBottomRow{
    	display: flex;
    	justify-content: space-between;
    	margin-top: auto;
    }

    .cart .van-checkbox__icon--checked .van-icon{
    	background-color: #FF8C34;
    	border-color: #FF8C34;
    }
</style>