<template>
	<div class="myInfo">
		<van-nav-bar title="个人资料"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="myInfoContent">
			<van-cell title="头像" value="" >
				<template #right-icon>
				    <van-image width="50" height="50" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
				</template>
			</van-cell>
			<van-cell title="用户名" is-link :value="name" @click="editeName"/>
			<van-cell title="性别" is-link :value="gender" @click="editeGender" />
			<van-cell class="myInfoSignature" title="个人签名" is-link :value="signature" @click="editeSignature" />
			<van-cell title="所在地区" is-link :value="area" @click="editeArea" />
		</div>
		
		<van-popup v-model="areaShowFlag" position="bottom"  round>
			<van-area title="" :area-list="areaList" @confirm="areaConfirm" @cancel="areaCancle" />
		</van-popup>

		<van-popup v-model="genderShowFlag" position="bottom"  round>
			<div class="van-hairline--bottom popupItem" v-for="item in genderList" @click="genderConfirm(item)">{{ item }}</div>
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
import { Dialog } from 'vant';

import { Area } from 'vant';
import areaList from '@/area/area.js';

Vue.use(Vant);
Vue.use(Dialog);

export default {
	name: '',
	store,
	data(){
		return{
			name:"用户名",
			signature:"填写个人签名填写个人签名填写个人签名填写个人名填写个人名填写个人",
			gender:"女",
			area:"浙江省-杭州市-上城区",
			areaShowFlag:false,
		    areaList:areaList,
			avatar:"https://img.yzcdn.cn/vant/cat.jpeg",

			genderList:["男","女"],
			genderShowFlag:false
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
        editeName(){
        	this.$router.push("/changeName")
        },
        editeGender(){
        	this.genderShowFlag=true
        },
        editeSignature(){
        	this.$router.push("/changeSignature")
        },
        editeArea(){
        	this.areaShowFlag=true;
        },
        areaConfirm(val){
        	this.areaShowFlag=false;
	    	console.log(val)
	    	this.areaStr=""
	    	for(var o of val){
	    		this.areaStr+=o.name
	    		console.log(o)
	    	}
        },
        areaCancle(){
        	this.areaShowFlag=false
        },
        genderConfirm(item){
        	this.genderShowFlag=false
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
	
	.myInfo{
		font-size: 14px;
		text-align: left;
	}

	.myInfo .myInfoSignature .van-cell__value{
		text-align: left;
		font-size: 11px;
		flex-basis: calc(100% - 170px);
		white-space: nowrap;
        text-overflow: ellipsis;
	}

	.myInfo .van-cell__title{
		font-size: 15px;
	}
	.myInfo .myInfoContent .van-cell{
		align-items: center;
	}

	.myInfo .popupItem{
		padding: 10px 0px;
		text-align: center;
	}
</style>