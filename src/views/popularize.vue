<template>
	<div class="popularize">
		<van-nav-bar title="我的二维码"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="container">
			<div class="qrcodeWrap">
				<!-- <van-image width="40%" :src="qrcodeurl" /> -->
				<vue-qr  :text="confirmUrl" :size="qrwidth"></vue-qr>
				<div class="tip">“扫码开启我的升级模式”</div>
			</div>	
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
import VueQr from 'vue-qr'//二维码

export default {
	name: '',
	store,
	data(){
		return{
			// qrcodeurl:"https://img.yzcdn.cn/vant/cat.jpeg",
		}
	},
	computed:{
		...mapState({
			userInfo(state){ return state.userInfo }
		}),
		confirmUrl(){
			// console.log(this.userInfo)
			// console.log("http://www.meixiangletao.com/user/loginwechat?id="+this.userInfo.id)
			// return "http://www.meixiangletao.com/user/loginwechat?id="+this.userInfo.id
			return window.location.origin+"/user/loginwechat?id="+this.userInfo.id
		},
		qrwidth(){
			return window.screen.width*0.6
		}
	},
	watch:{},
	components: {
		// HelloWorld
		VueQr
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
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
	
	.popularize{
		text-align: left;
		font-size: 14px;
	}

	.popularize .container{
		height: calc(100vh - 66px);
		background: url("../assets/imgs/qrcodebg.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.popularize .qrcodeWrap{
		padding-top: 40vh;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.popularize .tip{
		margin-top: 10px;
		/*color: #FF8C34;*/
		color: black;
		font-size: 15px;
		font-weight: bold;
	}
</style>