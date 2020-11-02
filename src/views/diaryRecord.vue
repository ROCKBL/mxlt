<template>
	<div class="diaryRecord">
		<van-nav-bar title="发布日记"  left-arrow class="pageNavNative" @click-left="onClickLeft" right-text="发表" @click-right="publish" />
		
		<div class="messageBox">
			<van-cell class="messageBoxHead"  title="选择分类" is-link :value="diaryType" icon="apps-o" @click="showPicker=true" />
			<van-field class="messageBoxBody" v-model="message" rows="6"  label="" type="textarea" placeholder="分享你的新鲜事儿吧，小可爱~" />
		</div>
		<van-uploader class="picUpLoader" v-model="fileList" multiple :after-read="afterRead" :max-size="10 * 1024 * 1024" @oversize="onOversize" @delete="deleteImg" />

		<van-popup v-model="showPicker" round position="bottom">
		  <van-picker
		    show-toolbar
		    :columns="columns"
		    @cancel="showPicker = false"
		    @confirm="onConfirm"

		    value-key="name"
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

// import Vant from 'vant';
// import 'vant/lib/index.css';
import { Dialog,Toast } from 'vant';

// Vue.use(Vant);
Vue.use(Dialog);
Vue.use(Toast);

import { dpublish,dclist,dupload,uploadUrl,ddetail,dmodfiy } from '@/api/diary'

export default {
	name: '',
	store,
	data(){
		return{
			fileList: [
		        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
		    ],
		    // fileAr:[],
		    message:"",
		    showPicker:false,

		    diaryType:"请选择",
		   	diaryId:"",

		    columns:[
		    	// "除皱瘦脸","脂肪填充","美体塑形","眼部","鼻部","玻尿酸"
		    ],
		    id:null,

		    type:"add",//add:新增，edite:修改编辑
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
        onOversize(file) {
	      // console.log(file);
	      Toast('文件大小不能超过 10MB');
	    },
	    deleteImg(file){
	    	// console.log(file)
	    	// console.log(this.fileList)
	    },
        publish(){
        	if(this.fileList.length==0){
        		Toast('必须至少上传一张图片');
        		return
        	}
        	if(this.diaryId==""){
        		Toast('请求选择日记分类');
        		return
        	}

        	var ar=[]
        	this.fileList.map(function(obj){
        		ar.push(obj.url)
        	})

        	var that=this;

        	if(this.type=="edite"){
        		dmodfiy({
        			id:this.id,
        			diaryCategory:this.diaryId,
	        		images:ar.join(","),
	        		detail:this.message,
	        		title:"默认",
        		}).then(function(response){
        			that.$router.go(-1)
        		})
        		return
        	}


        	dpublish({
        		diaryCategory:this.diaryId,
        		images:ar.join(","),
        		detail:this.message,
        		title:"默认",
        	}).then(function(){
        		that.$router.go(-1)
        	})

        },
        afterRead(file){
        	var that=this;
        	var index=this.fileList.length;

        	console.log(file);
        	var formData = new FormData();
        	formData.append('file', file.file);

        	file.status='uploading';
        	file.message='上传中...';
        	dupload(formData).then(function(response){
        		console.log(response)
  				file.url=that.picBaseUrl+response.result.url
        		file.status='done'

        		console.log(that.fileList)
        	})
        	
        	// setTimeout(function(){
        		
        	// },2000)
        },
        onConfirm(val){
        	// console.log(val)
        	this.showPicker=false

        	console.log(val)

        	this.diaryType=val.name
        	this.diaryId=val.id
        },
        init(){
        	var that=this;

            return dclist().then(function(response){
                console.log(response)
                that.columns=response.result
                // that.activeType=response.result[0].id

            })
        }
	},
	mounted(){

	},
	created(){
		// 写新日记或者编辑老的日记
		// this.$router.currentRoute.query
		var that=this;

		if(this.$router.currentRoute.query.id){
			this.type="edite"
			this.id=this.$router.currentRoute.query.id
			this.init().then(function(){
				ddetail({
					id:that.id
				}).then(function(response){
					// console.log(response)
					var res=response.result
					that.message=res.detail
					that.diaryId=res.diaryCategory
					that.fileList=res.images.split(",").map(function(url){
						return {url:url}
					})

					var obj=that.columns.find(function(o){
						return o.id==that.diaryId
					})
					that.diaryType=obj.name
				})
			})
		}else{
			this.init()
		}
		
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