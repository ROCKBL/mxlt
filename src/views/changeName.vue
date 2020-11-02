<template>
	<div class="changeName">
		<van-nav-bar title="个人资料"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="changeNameContent">
			<div class="changeNameContentLabel">用户名：</div>
			<input type="text" name="" placeholder="请输入用户名" v-model="newName" class="newName">
			<div class="changeNameContentTip">限4-16个字符，一个汉字为两个字符</div>

			<van-button round type="info" size="small" color="#FF8C34" class="changeNameContentBtn" @click="save">确定保存</van-button>
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

import { umodifyInfo } from '@/api/user'

export default {
	name: '',
	store,
	data(){
		return{
			newName:"",
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
        save(){
        	var that=this;

        	umodifyInfo({
        		name:that.newName
        	}).then(function(res){
        		// console.log(res)
        		store.dispatch("getUserInfo").then(function(){
			        // console.log(store)
			        that.$router.go(-1)
			    })
        	})
        }
	},
	mounted(){

	},
	created(){
		this.newName=this.userInfo.name
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
	
	.changeName{
		text-align: left;
		font-size: 14px;
	}
	.changeName .newName{
		border: 0px;
		box-shadow: 0px -2px 0px rgba(0,0,0,.1) inset;
		padding: 10px 0px;
    	width: 100%;
    	margin:5px 0px;
	}
	
	.changeName .changeNameContent{
		width: calc(100% - 30px);
		margin:10px auto;
	}
	
	.changeName .changeNameContentLabel{
		font-weight: bold;
		font-size: 15px;
	}
	.changeName .changeNameContentTip{
		font-size: 11px;
		color: #999999;
	}

	.changeName .changeNameContentBtn{
		width: 100%;
		margin-top: 30px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
	}
</style>