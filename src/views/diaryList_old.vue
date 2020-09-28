<template>
    <div class="diaryList">
        <van-nav-bar title="美哒日记"  class="pageNavNative" />
        
        <van-tabs v-model="topActive" @click="onTopTabsClick" color="#FF8C34" title-active-color="#FF8C34" title-inactive-color="#999999">
          <van-tab :title="tab" :name="tab" v-for="tab in topTabs" ></van-tab>
        </van-tabs>

	  	<!-- 搜索框 -->
        <van-search class="diaryListSearch" show-action v-model="searchValue" placeholder="请输入关键词" >
            <template #action>
                <van-icon name="add" color="#FF8C34" size="26" @click="recordDiary" />
            </template>
        </van-search>

        <!-- 日记列表 -->
<!--         <van-tabs class="diaryListTable" v-model="activeList" @click="tabClickDiaryTypeList" color="#FF8C34" title-active-color="#FF8C34" title-inactive-color="#999999">
            <van-tab :title="item" v-for=" item in diaryTypeList" :name="item">

                <van-list class="diarysWrap" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <div class="diarys">
                        <div class="diary" v-for="diary in diarys">
                            
                        </div>
                    </div>
                    
                </van-list>
                    
            </van-tab>
        </van-tabs> -->

        <div class="diaryListTable">
            <div class="diaryTabs">
                <div class="diaryTab" v-for=" item in diaryTypeList" @click="tabClickDiaryTypeList(item)" :class="isActived(item)">{{ item }}</div>
            </div>
            <van-list class="diarysWrap" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="diarys">
                    <div class="diary" v-for="diary in diarys">
                        <van-image class="diaryPic" :src="diary.pic" />
                        <div class="diaryWords">{{ diary.words }}</div>
                        <div class="diaryFoot">
                            <van-image round class="diaryAvatar" :src="diary.avatar" />
                            <div class="diaryUserName">{{ diary.userName }}</div>
                            <div class="diaryZan" :class="diary.iszan?'zanActive':''"><van-icon :name="diary.iszan?'like':'like-o'" />{{ diary.zan }}</div>
                        </div>
                    </div>
                </div>
            </van-list>
        </div>



        
        <!-- 底部导航 -->
        <van-tabbar v-model="bottomActive" active-color="#FF8C34" @change="tabClickBottom">
            <van-tabbar-item v-for="btn in bottomButtonList" :icon="btn.icon">{{ btn.name}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script type="text/javascript">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import Vue from 'vue'
import store from '@/store'

// // 手动引入vant单个组件
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

export default {
  	name: '',
  	store,
  	data(){
		return{
            topTabs:["整形对比","医院展示","美丽心得"],
            topActive:"医院展示",
            twoActive:"医院展示推荐1",

            searchValue:"",

            bottomActive:1,

            
            // activeList:"推荐",

            bottomButtonList:[
                {name:"首页",url:"/",icon:"wap-home-o"},
                {name:"美哒日记",url:"/diaryList",icon:"notes-o"},
                {name:"商城",url:"/shopping-mall",icon:"shop-o"},
                {name:"我的",url:"/mine",icon:"contact"},
            ],


            loading:false,
            finished:false,

            diarys:[
                {pic:"https://img.yzcdn.cn/vant/cat.jpeg",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"辅导课",zan:2,iszan:true,words:"自体脂肪填充泪沟要注意的7个雷区"},
                {pic:"https://img.yzcdn.cn/vant/cat.jpeg",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"辅导课",zan:2,iszan:true,words:"自体脂肪填充泪沟要注意的7个雷区"},
                {pic:"https://img.yzcdn.cn/vant/cat.jpeg",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"辅导课",zan:2,iszan:false,words:"自体脂肪填充泪沟要注意的7个雷区"},
            ],
            

		}
  	},
  	computed:{
        diaryTypeList(){
            var ar=[];
            switch(this.topActive){
                case "整形对比":
                    ar=["推荐","鼻综合","热玛吉","推荐1","鼻综合1","热玛吉1"]
                    break;
                case "医院展示":
                    ar=["推荐1"]
                    break;
                case "美丽心得":
                    ar=["推荐2"]
                    break;
            }
            return ar;
        }
  	},
  	watch:{},
  	components: {

  	},
  	methods:{
        isActived(item){
            if(this.topActive+item==this.twoActive){
                return "active"
            }
            return ""
        },
        onTopTabsClick(name, title){

        },

        tabClickDiaryTypeList(item){
            if(this.topActive+item==this.twoActive){
                // 点击当前项
                return
            }
            this.twoActive=this.topActive+item

            this.updateProducts()
        },
        updateProducts(){
            // this.products.length=0;
            // 根据url去获取分类商品列表,更新products
        },
        tabClickBottom(index){
            // 底部跳转
 
            this.$router.replace(this.bottomButtonList[index].url)

        },
        onLoad(){
            // 列表下拉加载
            // console.log("aax")
            // var that=this;
            // setTimeout(function(){
            //     that.products=that.products.concat(that.addproducts)
            //     that.loading=false
            // },5000)
        },

        init(){
            // 初始化界面数据
        },
        recordDiary(){
            this.$router.push("/diaryRecord")
        }
  	},
  	mounted(){
        this.init()

  	},
  	created(){
        // 初始化数据

    }

}
</script>

<style type="text/css">
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

    /*搜索栏*/
    .diaryList .diaryListSearch{


    }
    .diaryList .van-search__content{
        border-radius: 10px;
    }
    .diaryList .van-icon-add{
        vertical-align: middle;
    }

    .diaryList .diaryListTable{
        width: calc(100% - 20px);
        margin: 10px auto;
        margin-bottom: 50px;
    }
    .diaryList .diarysWrap{

    }
    .diaryList .diarys{
        display: flex;
        flex-wrap: wrap;
    }
    .diaryList .diary{
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin:5px 5px;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:10px;
    }
    .diaryList .diaryPic img{
        border-radius: 10px 10px 0px 0px;
        width: 100%;
    }

    .diaryList{
        text-align: left;
        font-size: 14px;
    }
    .diaryList .diaryTab{
        color:rgba(153,153,153,1);
        padding: 2px 5px;
        margin-right: 10px;
        border:1px solid rgba(255,255,255,0);
        display: inline-block;
    }
    .diaryTabs::-webkit-scrollbar{
        display: none;
    }

    .diaryList .active{
        color:rgba(255,140,52,1);
        border-radius:5px;
        border:1px solid rgba(255,140,52,1);
    }
    
    .diaryTabs{
        overflow-x: auto;
        white-space: nowrap;

    }

    .diaryList .diaryFoot{
        display: flex;
        align-items: center;
        padding: 0px 10px;
        margin-bottom: 10px;
    }
    .diaryList .diaryAvatar{
        width: 20px;
        height: 20px;
    }
    .diaryList .diaryWords{
        padding: 0px 10px;
        color: #333333;
        font-size: 12px;
        margin: 6px 0px;
    }

    .diaryList .zanActive{
        color: #FF8C34;
    }
    .diaryList .diaryZan{
        display: flex;
        margin-left: auto;
        align-items: center;
    }
    
    .diaryList .diaryUserName{
        font-size: 11px;
        color: #999999;
        margin-left: 5px;
    }
</style>