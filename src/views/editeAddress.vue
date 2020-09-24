<template>
	<div class="">
		<van-nav-bar title="修改收货地址"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="addressForm">

			<van-field v-model="name" label="收货人" placeholder="请输入收货人姓名" />
			<van-field v-model="phone" label="联系电话" placeholder="请输入手机号码" />
			
			<van-field v-model="areaStr" label="所在区域" placeholder="请选择区域" readonly @click="pickArea">
				<template #right-icon>
				    <van-icon name="arrow" />
				</template>
			</van-field>
			
			<van-field v-model="detail" label="详细地址" placeholder="请输入详细地址" />

			<van-field label="设为默认地址" placeholder="" readonly >
				<template #button>
					<van-switch class="hookSwitch" v-model="setDafultAddress" size="18px" active-color="rgba(255,140,52,1)" />
				</template>
			</van-field>

		</div>
		<van-popup v-model="areaShowFlag" position="bottom"  round>
			<van-area title="" :area-list="areaList" @confirm="areaConfirm" @cancel="areaCancle" />
		</van-popup>

		<van-button class="editeAddressSubmit"  @click="editeAddressSubmit">确认修改</van-button>
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
import areaList from '@/area/area.js';

Vue.use(Vant);

Vue.use(Area);

export default {
	name: '',
	store,
	data(){
		return{
			name:null,
			phone:null,
			detail:null,
			setDafultAddress:true,

			// 地区选择
		    areaStr:null,
		    areaShowFlag:false,
		    areaList:areaList,

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
		editeAddressSubmit(){

		},

		pickArea(){
        	this.areaShowFlag=true
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
        areaCancle(){
        	this.areaShowFlag=false
        }
	},
	mounted(){

		// window.a=this.$router
	},
	created(){

		var o=JSON.parse(this.$router.currentRoute.query.o);
		this.name=o.name
		this.phone=o.phone
		this.detail=o.detail
		this.setDafultAddress=o.defaultFlag=='1'?true:false
		this.areaStr=o.address
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

    .editeAddressSubmit{
		margin:20px 0px;
		border-radius: 10px;
		width: 70%;
		background:rgba(255,140,52,1);
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		color: white;
	}
</style>