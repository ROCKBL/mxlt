<template>
	<div class="vipCenter">
		<van-nav-bar title="会员中心"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="vipCenterCard">
			<div class="vipCenterUser">当前等级：<van-icon name="manager" size="14" />{{ userLever }}</div>
			<van-swipe @change="onChange">
			  	<van-swipe-item v-for="card in vipCards">
			  		<van-image width="100%"  :src="card.pic" />
			  	</van-swipe-item>			  	
			  	<template #indicator>
			    	<div class="custom-indicator">
			      		{{ current + 1 }}/{{ vipCards.length }}
			    	</div>
			  	</template>
			</van-swipe>
		</div>


		<div class="vipRightsWrap" v-show="current==index" v-for="(vip,index) in vipCards">
			<div class="vipRights">
				<div class="vipRightsTitle">会员特权：</div>
				<div class="vipRightsList">
					<div class="vipRight" v-for="right in vip.rights">
						<van-icon class="vipRightIcon iconfont" class-prefix='icon' :name="right.icon" size="38" color="#F7A57D" />
						<div class="vipRightLabel">{{ right.label }}</div>
						<div class="vipRightTip">{{ right.tip }}</div>
					</div>
				</div>
				
			</div>
			<van-button class="vipBtn" type="primary" block>{{ vip.btnName }}</van-button>
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
			userLever:"普通会员",
			vipCards:[
				{pic:require("../assets/imgs/v1.png"),name:"普通会员",btnName:"开通VIP会员权益（￥399/年）",rights:[
					{icon:"yuyue",label:"预约特权",tip:"免费预约"},
					{icon:"lipin",label:"医美大礼品",tip:"价值3W元"},
					{icon:"shangcheng",label:"商城优惠",tip:"价格让利70%"},
					{icon:"yaoqinghaoyou",label:"邀请好友",tip:"升级等级"},
				]},
				{pic:require("../assets/imgs/v2.png"),name:"白金会员",btnName:"开通白金会员权益（￥3999/年）",rights:[
					{icon:"yuyue",label:"预约特权1",tip:"免费预约1"},
					{icon:"lipin",label:"医美大礼品1",tip:"价值3W元"},
					{icon:"shangcheng",label:"商城优惠1",tip:"价格让利70%"},
					{icon:"yaoqinghaoyou",label:"邀请好友",tip:"升级等级"},
				]},
				{pic:require("../assets/imgs/v3.png"),name:"钻石会员",btnName:"开通钻石会员权益（￥39999/年）",rights:[
					{icon:"yuyue",label:"预约特权1",tip:"免费预约1"},
					{icon:"lipin",label:"医美大礼品1",tip:"价值3W元"},
					{icon:"shangcheng",label:"商城优惠1",tip:"价格让利70%"},
					{icon:"yaoqinghaoyou",label:"邀请好友",tip:"升级等级"},
				]},
			],
			current: 0,
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
        onChange(index) {
      		this.current = index;
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

    .vipCenter .vipCenterCard{
    	background:url("../assets/imgs/vipbg.png") no-repeat;
    	background-size: calc(100% + 20px);
    	background-position: -10px -10px;
    }

    .vipCenter{
    	text-align: left;
    	font-size: 14px;
    }

    .vipCenter .vipCenterCard{
    	padding: 10px;
    }
    .vipCenter .vipCenterUser{
    	color: #FF8C34;
    	display: flex;
    	align-items: center;

    }

    .vipCenter .custom-indicator {
	    position: absolute;
	    right: 25px;
	    bottom: 25px;
	    padding: 2px 10px;
	    font-size: 12px;
	    background: rgba(0, 0, 0, 0.5);
	    color: white;
	    border-radius: 10px;
	}

	.vipCenter .vipRightsWrap{
		width: calc(100% - 30px);
		margin:0px auto;
	}
	.vipCenter .vipBtn{
		background-color: #F7A57D;
		border-color: #F7A57D;
		margin-top: 30px;
		margin-bottom: 30px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		border-radius:10px;
	}

	.vipCenter .vipRightsList{
		display: flex;
		text-align: center;
		justify-content: space-between;
		margin-top: 10px;
	}
	.vipCenter .vipRight{

	}
	.vipCenter .vipRightTip{
		color: #999999;
		font-size: 11px;
	}
	.vipCenter .vipRightLabel{
		color: #333333;
		font-size: 12px;
		margin:10px 0px;
	}
	.vipCenter .vipRightIcon{

	}
	.vipCenter .vipRightsTitle{
		font-size: 15px;
		font-weight: bold;
		color: #333333;
		margin-top: 10px;
	}
</style>