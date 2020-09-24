<template>
	<div class="">
		<van-nav-bar title="用户评价"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
			
		<div class="reviewsCondition">
			<div v-for="(item,index) in condition" @click="showList(index,item)" class="reviewsConditionItem" :class=" activeConditon==index? 'activedCondition':''">
				{{ item.label }}
			</div>
		</div>
		<div class="reviewsList">
			<div v-for=" (item,index) in reviewsLits" class="reviewsListItem " :class="(reviewsLits.length-1)==index?'':'reviewsListItemBorder'">
				<div class="reviewsListItemHead">
					<van-image class="reviewsListItemHeadPic" width="40" height="40" round :src="item.userPic" />
					<div class="reviewsListItemHeadContent">
						<div class="reviewsListItemHeadContentWrap">
							<div class="reviewsListItemHeadContentName">{{ item.userName }}</div>
							<van-rate class="reviewsListItemHeadContentRate" v-model="item.rate" size="14px" color="#FF8C34" />
						</div>
						<div class="grayWords">{{ item.goodsName }}</div>
					</div>
					<div class="reviewsListItemHeadDate">{{ item.date }}</div>
				</div>

				<div class="reviewsListItemWords">{{ item.review }}</div>
				<div class="reviewsListItemPics">
					<van-image v-for="pic in item.reviewPics" :class="picClass(item.reviewPics)" :src="pic" @click="previewImg(item.reviewPics)" />
				</div>
				
				<div class="reviewsListItemComments">
					<div class="grayWords reviewsListItemCommentsItem" v-for="c in item.comments" >
						<div>{{ c.userName }}:</div>
						<div>{{ c.words }}</div>
					</div>
				</div>

				<div class="reviewsListItemBtns">
					<div v-if="item.praise>0" class="reviewsListItemBtnsActive reviewsListItemBtnsItem"><van-icon name="good-job" />{{item.praise}}</div>
					<div v-else class="reviewsListItemBtnsItem"><van-icon name="good-job-o" />点赞</div>
					<div v-if="item.comments.length>0" class="reviewsListItemBtnsActive reviewsListItemBtnsItem"><van-icon name="chat" />{{ item.comments.length }}</div>
					<div v-else class="reviewsListItemBtnsItem"><van-icon name="chat-o" />评论</div>
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

import { ImagePreview } from 'vant';

import { Area } from 'vant';
import areaList from '@/area/area.js';

Vue.use(Vant);

Vue.use(Area);

export default {
	name: '',
	store,
	data(){
		return{
			activeConditon:0,
			condition:[
				{label:"全部（60）",param:"1"},
				{label:"有图/视频（2）",param:"2"},
				{label:"好评（33）",param:"3"},
				{label:"中/差评（33）",param:"4"}
			],
			reviewsLits:[
				{date:"2020-7-8",userPic:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"t**3",rate:4,goodsName:"倩碧匀净卓研淡斑双效精华露",review:"倩碧匀净卓研淡斑双效精华露倩碧匀净卓研淡斑双效精华露倩碧匀净卓研淡斑双效精华露",comments:[],praise:0,reviewPics:["https://img.yzcdn.cn/vant/cat.jpeg"]},
				{date:"2020-7-8",userPic:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"t**3",rate:4,goodsName:"倩碧匀净卓研淡斑双效精华露",review:"倩碧匀净卓研淡斑双效精华露倩碧匀净卓研淡斑双效精华露倩碧匀净卓研淡斑双效精华露",comments:[{userName:"t**5",words:"倩碧匀净卓研淡斑双效精华露倩碧匀净卓研淡斑双效精华露倩碧匀净卓研淡斑双效精华露"},{userName:"t**5",words:"倩碧匀净卓研淡斑双效精华露倩碧匀净卓研淡斑双效精华露倩碧匀净卓研淡斑双效精华露"}],praise:1,reviewPics:["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"]},
				{date:"2020-7-8",userPic:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"t**3",rate:4,goodsName:"倩碧匀净卓研淡斑双效精华露",review:"倩碧匀净卓研淡斑双效精华露倩碧匀净卓研淡斑双效精华露倩碧匀净卓研淡斑双效精华露",comments:[],praise:1,reviewPics:["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"]},
			]
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
        showList(index,item){
        	if (index==this.activeConditon) {
        		return
        	}
        	this.activeConditon=index
        	// 获取数据
        },
        picClass(picAr){
        	if(picAr.length>=3){
        		return "spliceThree"
        	}
        	if(picAr.length==2){
        		return "spliceTwo"
        	}
        	if (picAr.length==1) {
        		return "spliceOne"
        	}

		},
		previewImg(picAr){
			// Vant.ImagePreview(picAr);
			ImagePreview(picAr)
		}

	},
	mounted(){

	},
	created(){
		window.a=Vant
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
    .reviewsCondition,.reviewsList{
		width: calc(100% - 20px);
		margin:auto;
		border-radius: 15px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		
		margin-top: 20px;
		box-sizing: border-box;
	}

	.reviewsList{
		margin-bottom: 20px;
	}

	.reviewsCondition{
		display: flex;
		flex-wrap: wrap;
		padding:10px;
	}
	.reviewsConditionItem{
		font-size: 14px;
		background-color: #FFEADB;
		border-radius: 5px;
		padding:5px 8px;
		margin: 6px;
	}
	.activedCondition{
		color:rgba(255,255,255,1);
		background:rgba(255,140,52,1);
	}


	
	.reviewsListItem{
		padding: 10px 10px;
		
	}
	.reviewsListItemBorder{
		border-bottom: 1px solid rgba(0,0,0,0.2);
	}

	.reviewsListItemHead{
		display: flex;
	}
	.reviewsListItemHeadContent{
		text-align: left;
		margin-left: 10px;
		font-size: 14px;
	}
	.reviewsListItemHeadDate{
		margin-left: auto;
		color: #999999;
		font-size: 11px;
	}
	.grayWords{
		color: #999999;
		font-size: 11px;
	}
	.reviewsListItemHeadContentWrap{
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.reviewsListItemBtns{
		display: flex;
		align-items: center;
		justify-content: flex-end;
    	font-size: 11px;
    	color: #666666;
    	margin:10px 0px;
	}
	.reviewsListItemBtnsActive{
		color: #FF8C34;
	}
	.reviewsListItemBtnsItem{
		display: flex;
		align-items: center;
		margin-left: 15px;
	}

	.reviewsListItemWords{
		color: #333333;
		font-size: 14px;
		text-align: left;
		margin:10px 0px;
	}

	.spliceOne{
		width: 65%;
		
	}
	.spliceTwo{
		width: 48%;
		
	}
	.spliceThree{
		width: 32%;
		
	}
	.reviewsListItemPics{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.reviewsListItemPics img{
		border-radius: 5px;
		
	}
	.reviewsListItemPics>div{
		margin:4px 0px;
	}

	.reviewsListItemHeadContentRate{
		margin-left: 10px;
	}

	.reviewsListItemCommentsItem{
		display: flex;
		background:rgba(251,249,249,1);
		align-items: baseline;
		border-radius: 5px;
		text-align: left;
	}
	.reviewsListItemCommentsItem>div{
		margin:8px;
	}
</style>