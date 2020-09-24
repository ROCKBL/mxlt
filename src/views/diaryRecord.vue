<template>
	<div class="diaryRecord">
		<van-nav-bar title="发布日记"  left-arrow class="pageNavNative" @click-left="onClickLeft" right-text="发表" @click-right="publish" />
		
		<div class="messageBox">
			<van-cell class="messageBoxHead"  title="选择分类" is-link :value="diaryType" icon="apps-o" @click="showPicker=true" />
			<van-field class="messageBoxBody" v-model="message" rows="6"  label="" type="textarea" placeholder="分享你的新鲜事儿吧，小可爱~" />
		</div>
		<van-uploader class="picUpLoader" v-model="fileList" multiple :after-read="afterRead" />

		<van-popup v-model="showPicker" round position="bottom">
		  <van-picker
		    show-toolbar
		    :columns="columns"
		    @cancel="showPicker = false"
		    @confirm="onConfirm"
		  />
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

Vue.use(Vant);
Vue.use(Dialog);

export default {
	name: '',
	store,
	data(){
		return{
			fileList: [
		        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },

		    ],
		    message:"",
		    showPicker:false,

		    diaryType:"请选择",
		    columns:["除皱瘦脸","脂肪填充","美体塑形","眼部","鼻部","玻尿酸"]
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
        publish(){},
        afterRead(file){
        	file.status='uploading';
        	file.message='上传中...';
        	console.log(file);
        	setTimeout(function(){
        		file.status='done'
        	},2000)
        },
        onConfirm(val){
        	// console.log(val)
        	this.showPicker=false
        	this.diaryType=val
        }
	},
	mounted(){

	},
	created(){
		// 写新日记或者编辑老的日记
		// this.$router.currentRoute.query
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

	.diaryRecord{
		text-align: left;
	}
	.diaryRecord .van-nav-bar__text{
		color: white;
		font-size: 15px;
		/*font-weight: bold;*/
	}

	.diaryRecord .picUpLoader{
		width: calc(100% - 30px);
		margin:10px auto;
		display: block;
	}

	.diaryRecord .messageBox{
		border-radius:10px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		width: calc(100% - 30px);
		margin:10px auto;
	}

	.diaryRecord .messageBoxHead{
		background-color: transparent;
	}
	.diaryRecord .messageBoxBody{
		background-color: transparent;
	}

	.diaryRecord .van-picker__confirm{
		color: #FF8C34;
	}
</style>