<template>
	<div class="appointmentInfo">
		<van-nav-bar title="预约单详情"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="order">
			<div class="orderProduct">
				<van-image class="orderProductPic" width="60" height="60" :src="productPic" />
				<div class="orderProductInfo">
					<div class="orderProductInfoName">{{ productName }}</div>
					<div class="orderProductInfoPrice">预约价￥<span class="orderProductInfoPriceNum">{{ productPrice }}</span></div>
				</div>
			</div>
			<div class="orderHospital">
				<van-image class="orderHospitalPic" round width="60" height="60" :src="hospitalPic" />
				<div class="orderHospitalInfo">
					<div class="orderHospitalInfoName">{{ hospitalName }}</div>
					<div class="orderHospitalInfoIcon"><van-icon class="iconfont " class-prefix='icon' name='yiyuan' size="10" />医院</div>
					<div class="orderHospitalInfoAddress"><van-icon name="location-o" />{{ hospitalAddress }}</div>
				</div>
			</div>
		</div>
		<div class="appointment">
			<div class="appointmentRow">
				<div class="appointmentRowLabel">预约姓名</div>
				<div class="appointmentRowValue">{{ name }}</div>
			</div>
			<div class="appointmentRow">
				<div class="appointmentRowLabel">预约日期</div>
				<div class="appointmentRowValue">{{ date }}</div>
			</div>
			<div class="appointmentRow">
				<div class="appointmentRowLabel">支付方法</div>
				<div class="appointmentRowValue">{{ payWay }}</div>
			</div>
			<div class="appointmentRow">
				<div class="appointmentRowLabel">联系方式</div>
				<div class="appointmentRowValue">{{ phone }}</div>
			</div>
			<div class="appointmentRow">
				<div class="appointmentRowLabel">项目价格</div>
				<div class="appointmentRowValue">￥{{ money }}</div>
			</div>

			<div class="appointmentRow erweimaRow">
				<div class="appointmentRowLabel">预约码</div>
				<div class="erweima">
					<van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
				</div>
				
			</div>
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
			money:"289.00",
			phone:"15058718329",
			payWay:"余额",
			date:"2020-08-20",
			name:"姓名",

			productPic:"https://img.yzcdn.cn/vant/cat.jpeg",
			productName:"【奥昵玻尿酸0.5ml】守护年轻的秘密",
			productPrice:"10.00",

			hospitalName:"亚太美立方医疗美容",
			hospitalPic:"https://img.yzcdn.cn/vant/cat.jpeg",
			hospitalAddress:"浙江省 杭州市 滨江区江陵路1916号星耀城二期3栋1501"
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
        onTabsClick(name, title){
        	console.log(name,"xx" ,title)
        	// 服务器获取订单数据
        },
        removeOrder(order){
        	// 删除订单
        },
        confirmOrder(order){
        	// 确认订单
        }

	},
	mounted(){

	},
	created(){

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
	

    .appointmentInfo{
    	text-align: left;
    	font-size: 14px;
    }

 	.appointmentInfo .orderHospital{
 		display: flex;
 		border-top: 2px solid rgba(0,0,0,0.1);
 		padding: 10px 0px;
 	}
 	.appointmentInfo .orderProduct{
 		display: flex;
 		padding: 10px 0px;
 	}
 	.appointmentInfo .orderProductPic img{
 		border-radius: 10px;
 	}
 	.appointmentInfo .orderProductInfo{
 		margin-left: 10px;
 		width: calc(100% - 70px);
 	}
 	.appointmentInfo .orderProductInfoPrice{
 		color: #FF3434;
 		font-size: 11px;
 		margin-top: 20px;
 	}
 	.appointmentInfo .orderProductInfoName{
 		color: #333333;
 		font-size: 12px;
 	}
 	.appointmentInfo .orderProductInfoPriceNum{
 		color: #FE5050;
 		font-size: 16px;
 	}

 	.appointmentInfo .orderHospitalPic{

 	}
 	.appointmentInfo .orderHospitalInfo{
 		width: calc(100% - 70px);
 		margin-left: 10px;
 	}
 	.appointmentInfo .orderHospitalInfoName{
 		color: #333333;
 		font-size: 12px;
 	}
 	.appointmentInfo .orderHospitalInfoIcon{
 		background:rgba(255,140,52,1);
 		border-radius:9px;
 		color: white;
 		font-size: 10px;
 		width: fit-content;
    	padding: 1px 10px;
    	margin: 5px 0px;
 	}
 	.appointmentInfo .orderHospitalInfoAddress{
 		color: #999999;
 		font-size: 11px;
 	}

    .appointmentInfo .order,.appointmentInfo .appointment{
    	box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    	border-radius:10px;
    	width: calc(100% - 20px);
    	margin:10px auto;
    	padding: 10px;
    	box-sizing: border-box;
    }
    .appointmentInfo .appointmentRow{
    	display: flex;
    	align-items: center;
    	margin:10px 0px;
    	font-size: 12px;
    	color: #333333;
    }
    .appointmentInfo .appointmentRowValue{
    	margin-left: auto;

    }
    .appointmentInfo .erweimaRow{
    	border-top:2px solid rgba(0,0,0,0.1);
    	align-items: flex-start;
    	padding-top: 20px;
    }
    .appointmentInfo .erweima{
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	flex: 1;
    }
</style>