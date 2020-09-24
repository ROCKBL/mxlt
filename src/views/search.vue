<template>
	<div class="">
		<van-nav-bar title="搜索"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<van-search round v-model="searchValue" show-action placeholder="需要什么商品" @search="onSearch" @cancel="onCancel" />
		
		<div class="searchContent" v-if="historySearchList.length>0">
			<div class="searchContentHead">
				<div>历史搜索</div>
				<div></div>
			</div>
			<div class="searchList">
				<van-tag class="searchTag" v-for="s in historySearchList" plain round closeable size="large"  @close="closeTag(s)">{{ s }}</van-tag>
			</div>
		</div>
		<div class="searchContent" v-if="hotSearchList.length>0">
			<div class="searchContentHead">热门搜索</div>
			<div class="searchList">
				<van-tag class="searchTag" v-for="s in hotSearchList" plain round size="large"  @close="closeTag(s)">{{ s }}</van-tag>
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
			searchValue:null,
			hotSearchList:["洗护","玻璃尿水","洗护","玻璃尿水","洗护","玻璃尿水"],//服务器获取
			historySearchList:[],//本地缓存
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
        onSearch(){
        	var that=this;
        	var rtn=this.historySearchList.find(function(s){
        		return s==that.searchValue
        	})
        	if(rtn==undefined){
        		this.historySearchList.push(this.searchValue)
        		window.localStorage.setItem("historySearchList",JSON.stringify(this.historySearchList))
        	}
        	
        	// 跳转搜索结果页面
        },
        onCancel(){
        	console.log("ss")
        },
        closeTag(s){
        	// 关闭历史标签
        	var index=this.historySearchList.indexOf(s)
        	this.historySearchList.splice(index, 1);
        	window.localStorage.setItem("historySearchList",JSON.stringify(this.historySearchList))
        }

	},
	mounted(){

	},
	created(){
		this.historySearchList=JSON.parse(window.localStorage.getItem("historySearchList"))||[]
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

    .searchContent{
    	text-align: left;
    	width: calc(100% - 20px);
    	margin:0px auto;
    	color: #333333;
    }

    .searchContentHead{
    	display: flex;
    	align-items: center;
    	font-size: 15px;
		margin:10px 0px;
    }
    .searchTag{
    	margin-right: 10px;
    	margin-bottom: 10px;
    }
</style>