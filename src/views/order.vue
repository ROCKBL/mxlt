<template>
	<div class="">
		<van-nav-bar title="确认订单"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		<van-notice-bar :scrollable="false" background="#FFE3CE" color="#FF8C34" left-icon="volume-o" text="未满18周岁需在监护人陪同下到院面诊" />
		
		<div class="productShortInfo">
			<van-image class="productShortInfoPic"  :src="product.firstImage" />
			<div class="productShortInfoWords">
				<!-- <div class="productShortInfoWordsName">【奥昵玻尿酸0.5ml】守护年轻的秘密</div> -->
				<div class="productShortInfoWordsName">{{ product.name }}</div>
				<!-- <div class="productShortInfoWordsHospital">亚太美立方医疗美容</div> -->
				<div class="productShortInfoWordsHospital">{{ product.hospitalName }}</div>
				<!-- <div class="productShortInfoPrice">整形价:￥3900.00</div> -->
				<div class="productShortInfoPrice">整形价:￥{{ Number(product.couponPrice).toFixed(2) }}</div>
				<!-- <div class="productShortInfoFee">预约价:￥10.00</div> -->
				<div class="productShortInfoFee">预约价:￥{{ Number(product.subsPrice).toFixed(2) }}</div>
			</div>

		</div>
		
		<div class="orderForm">
			<van-field label="昵称：" :value="userInfo.name" readonly />

			<van-field v-model="bookingDate" label="预约时间：" placeholder="请输入预约时间" readonly @click="pickDate">
				<template #right-icon>
				    <van-icon name="arrow" />
				</template>
			</van-field>

			<van-field label="手机号码：" v-model="phone" type="number" placeholder="请输入手机号码" />
			
			<van-field label="性别：" >
				<template #input>
					<van-radio-group v-model="gender" direction="horizontal" >
						<van-radio name="1" checked-color="#FF8C34">男</van-radio>
					  	<van-radio name="0" checked-color="#FF8C34">女</van-radio>
					  	
					</van-radio-group>
				</template>
			</van-field>

			<van-field v-model="userName" label="姓名：" placeholder="请输入姓名" />
			<van-field v-model="careerStr" label="从事行业：" placeholder="请选择行业" readonly @click="pickCareer">
				<template #right-icon>
				    <van-icon name="arrow" />
				</template>
			</van-field>
			<!-- <van-field v-model="budgetStr" label="消费预算：" placeholder="请选择预算" readonly @click="pickBudget">
				<template #right-icon>
				    <van-icon name="arrow" />
				</template>
			</van-field> -->

			<van-field label="整形历史：" >
				<template #input>
					<van-radio-group v-model="hasHistory" direction="horizontal" >
						<van-radio name="1" checked-color="#FF8C34">是</van-radio>
					  	<van-radio name="0" checked-color="#FF8C34">否</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			
			<van-field v-model="areaStr" label="所在区域：" placeholder="请选择区域" readonly @click="pickArea">
				<template #right-icon>
				    <van-icon name="arrow" />
				</template>
			</van-field>

			<van-field v-model="budgetStr" label="消费预算：" placeholder="" />

			<van-field v-model="intention" label="其他：" placeholder="最想改善部位" />

			<van-field label="是否体验：" >
				<template #input>
					<van-radio-group v-model="experience" direction="horizontal" >
						<van-radio name="1" checked-color="#FF8C34">是</van-radio>
					  	<van-radio name="0" checked-color="#FF8C34">否</van-radio>
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
		  	<van-goods-action-icon icon="phone-o" text="电话" @click="phonecall" />

		  	<van-goods-action-icon icon="like" class="collecedtIcon" v-if="product.isCollect" text="收藏" @click="collect" />
		  	<van-goods-action-icon icon="like-o" v-else text="收藏" @click="collect" />

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

// import Vant from 'vant';
// import 'vant/lib/index.css';

import { Area } from 'vant';


import areaList from '@/area/area.js'

// Vue.use(Vant);
Vue.use(Area);

import { mapState } from 'vuex'


import { pcreateOrder,pdetail } from '@/api/project'
import { pclcollectionAndCancel } from '@/api/collect'

export default {
	name: '',
	store,
	data(){
		return{
			// productName:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",

			product:{},
			productId:null,

			// pics:["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"],//轮播图片数组

			// 日期选择
			bookingDate:null,
			bookingDateShowFlag:false,
			minDate: new Date(2020, 0, 1),
		    maxDate: new Date(2025, 10, 1),
		    currentDate: new Date(),

		    gender:"0",// 0:女性
		    userName:null,

		    phone:"",

		    hasHistory:"0",// 0:没有整形历史

		    intention:null,//其他
		    experience:"0",//是否体验  0:没有体验

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
	computed:{
		...mapState({
			userInfo(state){ return state.userInfo }
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
	    phonecall(){
	    	window.location.href="tel:"+this.product.hospitalPhone
	    },
	    collect(){
	    	var that=this;
	    	pclcollectionAndCancel({
	    		projectId:this.product.id
	    	}).then(function(res){
	    		// console.log(res)
	    		that.getData()
	    	})
	    },

	    testPhone(phone){
        	if(!(/^1[3456789]\d{9}$/.test(phone))){
        		this.Toast("请输入正确的手机号码")
		        return false; 
		    } 
		    return true
        },
	    subscribe(){
	    	var that=this;
	    	// console.log(this)
	    	// alert("提交订单")
	    	if(!this.testPhone(this.phone)){
	    		return
	    	}

	    	var data={
	    		"appointmentTime": this.bookingDate,
				"area": this.areaStr,
			  	"experience": this.experience=="1"?true:false,
			  	"history": this.hasHistory=="1"?true:false,
			  	"industry": this.careerStr,
			  	"name": this.userName,
			  	"nickname": this.userInfo.name,
			  	"other": this.intention,
			  	"phone": this.phone,
			  	"projectId": this.product.id,
			  	"sex": this.gender=="1"?true:false,
			  	"budgetMoney":this.budgetStr
	    	}
	    	// pcreateOrder({
	    	// 	rvo:JSON.stringify(data)
	    	// 	// rvo:data
	    	// }).then(function(response){
	    	// 	console.log(response)
	    	// })
	    	pcreateOrder(data).then(function(res){
	    		console.log(res)
	    		var rtn=res.result
	    		if(rtn.msg=="success"){
	    			that.$router.replace("/myOrder")
	    			return
	    		}

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
		              	// that.$router.go(-1)
		              	that.$router.replace("/myOrder")
		            },
		            cancel:function(){
		            	that.$router.replace("/myOrder")
		            	// that.$router.push({
			            //     name: 'myOrder',
			            // });
		            }
		        });
		     	// WeixinJSBridge.invoke(
		      //     'getBrandWCPayRequest', {
		      //        "appId":rtn.appId,     //公众号名称，由商户传入     
		      //        "timeStamp":rtn.timeStamp,         //时间戳，自1970年以来的秒数     
		      //        "nonceStr":rtn.nonceStr, //随机串     
		      //        "package":rtn.package,     
		      //        "signType":rtn.signType,         //微信签名方式：     
		      //        "paySign":rtn.paySign //微信签名 
		      //     },
		      //     function(res){
		      //       console.log(res)
		      //       if(res.err_msg == "get_brand_wcpay_request:ok" ){
		      //       // 使用以上方式判断前端返回,微信团队郑重提示：
		      //             //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
		      //       } 
		      //  	}); 

	    	})

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
	    	this.bookingDate=val.Format("yyyy-MM-dd hh:mm:ss")
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
	    	// console.log(val)
	    	this.careerShowFlag=false
	    	this.careerStr=val
	    },
	    // 选择预算
	    pickBudget(){
	    	this.budgetShowFlag=true
	    	
	    },
	    budgetConfirm(val){
	    	this.budgetShowFlag=false
	    	this.budgetStr=val
	    	
	    },
	    getData(){
	    	var that=this;
			pdetail({id:this.productId}).then(function(response){
				console.log(response)
				that.product=response.result
				that.pics=response.result.images.split(",")
			})
	    }

	},
	mounted(){

	},
	created(){
		var product=this.$router.currentRoute.query.product;

		product=JSON.parse(product)

		this.productId=product.id
		this.getData()

		console.log(this.product)
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


	.collecedtIcon .van-goods-action-icon__icon{
		color: #FF8C34
	}
</style>