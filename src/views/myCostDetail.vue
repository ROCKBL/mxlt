<template>
	<div class="myCostDetail">
		<van-nav-bar title="钱包明细"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="myCostDetailContent">
			<div class="myCostDetailTitle">钱包明细</div>

			<div class="myCostDetailDate" @click="showPop">{{ date }}<van-icon class="myCostDetailDateIcon" name="arrow-down" /></div>

			<div class="divider"></div>
			
			<div v-for="cost in costList" class="costRow">
				<div class="costIcon">
					<van-icon v-if="cost.type==='1'" class="iconfont bgIcon" class-prefix='icon' :name="typeIcon(cost.type)" size="24" color="white"  />
					<van-icon v-if="cost.type==='2'" class="iconfont bgIcon" class-prefix='icon' :name="typeIcon(cost.type)" size="24" color="white"  />
					<van-icon v-if="cost.type==='3'" class="iconfont" class-prefix='icon' :name="typeIcon(cost.type)" size="38" color="rgba(255,140,52,1)"  />
				</div>
				

				<div class="costMid">
					<div class="costName">{{ cost.name }}</div>
					<div class="costDate">{{ cost.date }}</div>
				</div>
				<div class="costMoney">{{ cost.money }}</div>
			</div>
		</div>

		<!-- 年月选择器 -->
		<van-popup v-model="pop" position="bottom" :style="{ height: '50%' }" >
			<van-datetime-picker v-model="currentDate" type="year-month" title="" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="popConfirm" @cancel="popCancel" />
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


Vue.use(Vant);

export default {
	name: '',
	store,
	data(){
		return{
			date:"",
			costList:[
				{type:"1",date:"2020-8-22 08:44",name:"项目名称项目名称项目名称",money:"-20.00"},
				{type:"2",date:"2020-8-22 08:44",name:"化妆品名字",money:"-20.00"},
				{type:"3",date:"2020-8-22 08:44",name:"我的钱包提现",money:"-20.00"},
			],


			minDate: new Date(2020, 0, 1),
	      	maxDate: new Date(2050, 0, 1),
	      	currentDate: new Date(),
	      	pop:false
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
        typeIcon(type){
        	var iconName=""
        	switch(type){
        		case "1":
        			iconName="icon1";
        			break;
        		case "2":
        			iconName="meizhuang";
        			break;
        		case "3":
        			iconName="jindutiaoqiandai";
        			break;
        	}
        	return iconName
        },

        showPop(){
			this.pop=true;
		},
		popConfirm(value){
			this.pop=false;
			// console.log(value);
			this.date=value.Format('yyyy-MM');

		},
		popCancel(){
			this.pop=false;
		},

		formatter(type, val) {
	      if (type === 'year') {
	        return `${val}年`;
	      } else if (type === 'month') {
	        return `${val}月`;
	      }else if (type === 'day') {
	        return `${val}日`;
	      }

	      return val;
	    },
	    init(){
	    	this.date=(new Date()).Format("yyyy-MM")
	    },

	},
	mounted(){

	},
	created(){
		this.init()
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
	
    .myCostDetail{
    	/*text-align: left;*/
    	color: #333333;
    }

    .myCostDetail .myCostDetailContent{
    	width: calc(100% - 30px);
    	margin:0px auto;
    }
    .myCostDetail .myCostDetailTitle{
    	font-size: 14px;
    	margin:12px 0px;
    }
    .myCostDetail .myCostDetailDate{
    	font-size: 14px;
    	display: flex;
    	align-items: center;
    	margin-bottom: 14px;
    }
    .myCostDetail .myCostDetailDateIcon{
    	margin-left: 5px;
    }

    .myCostDetail .divider{
    	border: 1px solid rgba(0,0,0,0.1);
    }
    .myCostDetail .costRow{
    	display: flex;
    	align-items: center;
    	margin-top: 14px;

    }
    .myCostDetail .costIcon{
    	margin-right: 10px;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	
    	width: 38px;
    	height: 38px;
    }
    .myCostDetail .bgIcon{
    	background-color: rgba(255,140,52,1);
    	border-radius: 50%;
    	width: 100%;
    	height: 100%;
    	line-height: 38px;
    }

    .myCostDetail .costMid{
    	text-align: left;
    }
    .myCostDetail .costName{
    	font-size: 14px;
    }
    .myCostDetail .costDate{
    	font-size: 11px;
    	margin-top: 5px;
    }
    .myCostDetail .costMoney{
    	font-size: 18px;
    	margin-left: auto;
    }
</style>