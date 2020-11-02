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
			<van-button v-if="getLevel(userInfo.role)<getLevel(vip.name)" class="vipBtn" type="primary" block @click="buyVip(vip)">开通{{ vip.name }}权益（￥{{ vip.money }}/年）</van-button>
			<van-button v-else class="vipBtn" type="primary" block disabled >用户等级超过该等级</van-button>
		</div>
		
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
import { ulist,ucreateOrder } from '@/api/vip'

export default {
	name: '',
	store,
	data(){
		return{
			// userLever:"普通会员",
			vipCards:[
				// {pic:require("../assets/imgs/v1.png"),name:"普通会员",btnName:"开通VIP会员权益（￥399/年）",rights:[
				// 	{icon:"yuyue",label:"预约特权",tip:"免费预约"},
				// 	{icon:"lipin",label:"医美大礼品",tip:"价值3W元"},
				// 	{icon:"shangcheng",label:"商城优惠",tip:"价格让利70%"},
				// 	{icon:"yaoqinghaoyou",label:"邀请好友",tip:"升级等级"},
				// ]},

				// {pic:require("../assets/imgs/v2.png"),name:"白金会员",btnName:"开通白金会员权益（￥3999/年）",rights:[
				// 	{icon:"yuyue",label:"预约特权1",tip:"免费预约1"},
				// 	{icon:"lipin",label:"医美大礼品1",tip:"价值3W元"},
				// 	{icon:"shangcheng",label:"商城优惠1",tip:"价格让利70%"},
				// 	{icon:"yaoqinghaoyou",label:"邀请好友",tip:"升级等级"},
				// ]},
				// {pic:require("../assets/imgs/v3.png"),name:"钻石会员",btnName:"开通钻石会员权益（￥39999/年）",rights:[
				// 	{icon:"yuyue",label:"预约特权1",tip:"免费预约1"},
				// 	{icon:"lipin",label:"医美大礼品1",tip:"价值3W元"},
				// 	{icon:"shangcheng",label:"商城优惠1",tip:"价格让利70%"},
				// 	{icon:"yaoqinghaoyou",label:"邀请好友",tip:"升级等级"},
				// ]},
			],
			current: 0,
		}
	},
	computed:{
		...mapState({
            userInfo(state){ return state.userInfo},
        }),
        userLever(){
        	if(this.userInfo.role=="MEMBER"){
        		return "普通会员"
        	}
        	if(this.userInfo.role=="VIP_MEMBER"){
        		return "白金会员"
        	}
        	if(this.userInfo.role=="VIP_MAJORDOMO"){
        		return "VIP 总监"
        	}
        	if(this.userInfo.role=="DIAMOND_MEMBER"){
        		return "钻石会员"
        	}
        	if(this.userInfo.role=="BOARD_MEMBER"){
        		return "董事会员"
        	}

        	return this.userInfo.role
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
        onChange(index) {
      		this.current = index;
    	},
    	getLevel(str){
    		// 获取等级对应数字的表达

    		switch(str){
    			case "MEMBER":
    				return 0
    				break;
    			case "VIP_MEMBER":
    			case "VIP_MAJORDOMO":
    			case "白金会员":
    				return 1
    				break;
    			case "DIAMOND_MEMBER":
    			case "BOARD_MEMBER":
    			case "钻石会员":
    				return 2
    				break;
    		}
    	},
    	getData(){
    		var that=this;
    		var rights=[
    			{icon:"yuyue",label:"预约特权",tip:"免费预约"},
				{icon:"lipin",label:"医美大礼品",tip:"价值3W元"},
				{icon:"shangcheng",label:"商城优惠",tip:"价格让利70%"},
				{icon:"yaoqinghaoyou",label:"邀请好友",tip:"升级等级"},
    		]
    		var v2Pic=require("../assets/imgs/v2.png")
    		var v3Pic=require("../assets/imgs/v3.png")

    		ulist().then(function(res){
    			var ar=res.result
    			console.log(res)
    			for(var i=0;i<ar.length;i++){
    				if(ar[i].name=="白金会员"){
    					ar[i].rights=rights
    					ar[i].pic=v2Pic
    				}
    				if(ar[i].name=="钻石会员"){
    					ar[i].rights=rights
    					ar[i].pic=v3Pic
    				}
    			}
    			that.vipCards=ar
    		})
    	},
    	buyVip(vip){
    		// 购买vip
    		var that=this;
    		console.log(vip)
    		ucreateOrder({
    			levelId:vip.id
    		}).then(function(res){
    			console.log(res)
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
		              	// that.$router.replace("/successPay")
		              	that.$router.go(-1)
		            },
		            cancel:function(){
		            	// that.$router.replace("/myOrder")
		            	that.$router.go(-1)
		            	// that.$router.push({
			            //     name: 'myOrder',
			            // });
		            }
		        });

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