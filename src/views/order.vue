<template>
	<div class="">
		<van-nav-bar title="确认订单"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		<van-notice-bar :scrollable="false" background="#FFE3CE" color="#FF8C34" left-icon="volume-o" text="未满18周岁需在监护人陪同下到院面诊" />
		
		<div class="productShortInfo">
			<van-image class="productShortInfoPic"  src="https://img.yzcdn.cn/vant/cat.jpeg" />
			<div class="productShortInfoWords">
				<div class="productShortInfoWordsName">【奥昵玻尿酸0.5ml】守护年轻的秘密</div>
				<div class="productShortInfoWordsHospital">亚太美立方医疗美容</div>
				<div class="productShortInfoPrice">整形价:￥3900.00</div>
				<div class="productShortInfoFee">预约价:￥10.00</div>
			</div>

		</div>
		
		<div class="orderForm">
			<van-field label="昵称：" value="端口" readonly />

			<van-field v-model="bookingDate" label="预约时间：" placeholder="请输入预约时间" readonly @click="pickDate">
				<template #right-icon>
				    <van-icon name="arrow" />
				</template>
			</van-field>

			<van-field label="手机号码：" value="13858718329" readonly />
			
			<van-field label="性别：" >
				<template #input>
					<van-radio-group v-model="gender" direction="horizontal" >
						<van-radio name="0" checked-color="#FF8C34">男</van-radio>
					  	<van-radio name="1" checked-color="#FF8C34">女</van-radio>
					  	
					</van-radio-group>
				</template>
			</van-field>

			<van-field v-model="userName" label="姓名：" placeholder="请输入姓名" />
			<van-field v-model="careerStr" label="从事行业：" placeholder="请选择行业" readonly @click="pickCareer">
				<template #right-icon>
				    <van-icon name="arrow" />
				</template>
			</van-field>
			<van-field v-model="budgetStr" label="消费预算：" placeholder="请选择预算" readonly @click="pickBudget">
				<template #right-icon>
				    <van-icon name="arrow" />
				</template>
			</van-field>

			<van-field label="整形历史：" >
				<template #input>
					<van-radio-group v-model="hasHistory" direction="horizontal" >
						<van-radio name="0" checked-color="#FF8C34">是</van-radio>
					  	<van-radio name="1" checked-color="#FF8C34">否</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			
			<van-field v-model="areaStr" label="所在区域：" placeholder="请选择区域" readonly @click="pickArea">
				<template #right-icon>
				    <van-icon name="arrow" />
				</template>
			</van-field>

			<van-field v-model="intention" label="其他：" placeholder="最想改善部位" />

			<van-field label="是否体验：" >
				<template #input>
					<van-radio-group v-model="experience" direction="horizontal" >
						<van-radio name="0" checked-color="#FF8C34">是</van-radio>
					  	<van-radio name="1" checked-color="#FF8C34">否</van-radio>
					</van-radio-group>
				</template>
			</van-field>

			
		</div>
		
		<!-- 时间选择器弹出层 -->
		<van-popup v-model="bookingDateShowFlag" position="bottom"  round>
			<van-datetime-picker @cancel="bookingDateCancel" @confirm="bookingDateConfirm" v-model="currentDate" type="date" title="" :min-date="minDate" :max-date="maxDate" :formatter="formatter"/>
		</van-popup>
		
		<!-- 职业选择器弹出层 -->

		<van-popup v-model="careerShowFlag" position="bottom"  round>
			<div class="van-hairline--bottom popupItem" v-for="item in careerList" @click="careerConfirm(item)">{{ item }}</div>
		</van-popup>
		
		<!-- 消费预算弹出层 -->
		<van-popup v-model="budgetShowFlag" position="bottom"  round>
			<div class="van-hairline--bottom popupItem" v-for="item in budgetList" @click="budgetConfirm(item)">{{ item }}</div>
		</van-popup>
		<!-- 所在区域弹出层 -->
		<van-popup v-model="areaShowFlag" position="bottom"  round>
			<van-area title="" :area-list="areaList" @confirm="areaConfirm" @cancel="areaCancle" />
		</van-popup>

		<van-goods-action class="vanTab">
		  	<van-goods-action-icon icon="phone-o" text="电话" @click="phone" />
		  	<van-goods-action-icon icon="like-o" text="收藏" @click="collect" />
		  	<van-goods-action-button type="danger" text="立即预约" @click="subscribe" color="#FF8C34" />
		</van-goods-action>
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

import { Area } from 'vant';


import areaList from '@/area/area.js'

Vue.use(Vant);

Vue.use(Area);

export default {
	name: '',
	store,
	data(){
		return{
			productName:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",

			pics:["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"],//轮播图片数组

			// 日期选择
			bookingDate:null,
			bookingDateShowFlag:false,
			minDate: new Date(2020, 0, 1),
		    maxDate: new Date(2025, 10, 1),
		    currentDate: new Date(),

		    gender:"1",// 1:女性
		    userName:null,

		    hasHistory:"1",// 1:没有整形历史

		    intention:null,//其他
		    experience:"1",

		    // 地区选择
		    areaStr:null,
		    areaShowFlag:false,
		    areaList:areaList,

		    // 职业选择
		    careerStr:null,
		    careerShowFlag:false,
		    careerList:["上班族","创业","美业","微商","自由职业","其他","取消"],

		    // 预算选择
		    budgetStr:null,
		    budgetShowFlag:false,
		    budgetList:["不限金额","30000-50000元","50000-80000元","100000元以上","取消"],
		}
	},
	computed:{},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        
        formatter(type, val) {
        	// 格式化选择器上的时间显示
	      if (type === 'month') {
	        return `${val}月`;
	      } else if (type === 'day') {
	        return `${val}日`;
	      }else if (type === 'year') {
	        return `${val}年`;
	      }
	
	      return val;
	    },
	    phone(){},
	    collect(){},
	    subscribe(){
	    	console.log(this.gender)
	    },
	    // 选择日期
	    pickDate(){
        	this.bookingDateShowFlag=true
        },
	    bookingDateCancel(){
	    	this.bookingDateShowFlag=false
	    },
	    bookingDateConfirm(val){
	    	this.bookingDateShowFlag=false
	    	console.log(val)
	    	this.bookingDate=val
	    },

	    // 选择地区
	    pickArea(){
	    	this.areaShowFlag=true
	    },
	    areaCancle(){
	    	this.areaShowFlag=false
	    },
	    areaConfirm(val){
	    	this.areaShowFlag=false
	    	console.log(val)
	    	this.areaStr=""
	    	for(var o of val){
	    		this.areaStr+=o.name
	    		console.log(o)
	    	}
	    },

	    // 选择职业
	    pickCareer(){
	    	this.careerShowFlag=true

	    },
	    careerConfirm(val){
	    	this.careerShowFlag=false
	    },
	    // 选择预算
	    pickBudget(){
	    	this.budgetShowFlag=true
	    	
	    },
	    budgetConfirm(val){
	    	this.budgetShowFlag=false
	    	
	    },

	},
	mounted(){

	},
	created(){
		console.log(this.$router.currentRoute.query.product)
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
	
	.productShortInfo{
		display: flex;
	}

	.productShortInfo,.orderForm{
		width: calc(100% - 20px);
		margin:auto;
		
		border-radius: 15px;
		box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
		padding:10px;
		margin-top: 20px;
		box-sizing: border-box;
	}
	.orderForm{
		margin-bottom: 60px;
	}
	.popupItem{
		padding: 10px 0px;
	}
	.productShortInfoPic{
		width: 25%;
	}
	.productShortInfoWords{
		width: 75%;
		font-size: 14px;
		text-align: left;
		
	}
	.productShortInfoWords>div{
		line-height:20px;
		/*padding: 4px 0px;*/
		padding-left: 10px;
		padding-bottom: 5px;
	}
	.productShortInfoWordsName{
		font-weight:bold;

	}
	.productShortInfoWordsHospital{
		color:rgba(153,153,153,1);
		font-size:11px;
	}
	.productShortInfoPrice{
		color:rgba(254,80,80,1);
		font-weight:bold;
	}
	.productShortInfoFee{
		color:rgba(254,80,80,1);
		font-weight:bold;
	}
</style>