<template>
    <div class="notice">
        <!-- <van-nav-bar title="我的" left-arrow @click-left="onClickLeft" class="pageNavNative" >
            <template #title>
                <div class="selfTabs">
                    <div class="selfTab leftTab" :class="activeTab==0?'tabActive':''" @click="selfTabClick(0)">消息</div>
                    <div class="selfTab rightTab" :class="activeTab==1?'tabActive':''" @click="selfTabClick(1)">通知</div>
                </div>
            </template>
        </van-nav-bar> -->

        <van-nav-bar title="消息"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

        <!-- <div v-show="showPart=='messages'">
            <van-swipe-cell v-for="m in messages" >
                <div class="item">
                    <van-image round class="itemAvatar" :src="m.avatar" />
                    <div class="" style="flex-grow: 1;">
                        <div class="itemShortWrap">
                            <div class="itemName">{{ m.name }}</div>
                            <div class="itemDate">{{ m.date }}</div>
                        </div>
                        <div class="itemMessage">{{ m.words }}</div>
                    </div>
                </div>
                
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </div> -->
       <!--  <div v-show="showPart=='notices'">
            <van-swipe-cell v-for="m in notices" >
                <div class="item">
                    <van-image round class="itemAvatar" :src="m.avatar" />
                    <div class="" style="flex-grow: 1;">
                        <div class="itemShortWrap">
                            <div class="itemName">{{ m.name }}</div>
                            <div class="itemDate">{{ m.date }}</div>
                        </div>
                        <div class="itemMessage">{{ m.words }}</div>
                    </div>
                </div>
                
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </div> -->

        <van-list class="" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-swipe-cell v-for="m in messages" >
                <div class="item">
                    <van-image round class="itemAvatar" :src="m.consumerImage" />
                    <div class="" style="flex-grow: 1;">
                        <div class="itemShortWrap">
                            <div class="itemName">{{ m.consumerName }}</div>
                            <div class="itemDate">{{ new Date(m.createTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>
                        </div>
                        <div class="itemMessage">{{ m.content }}</div>
                    </div>
                </div>
                
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" @click="deletemsg(m)" />
                </template>
            </van-swipe-cell>
        </van-list>
    </div>
</template>

<script type="text/javascript">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import Vue from 'vue'
import store from '@/store'

// // 手动引入vant单个组件
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';

// import Vant from 'vant'
// import 'vant/lib/index.css'


// Vue.use(Vant)

// 阿里图标文件
// import "@/assets/iconfont/iconfont.css";

import { mdelete,mpage,mreadNo } from '@/api/message'
import { mapState } from 'vuex'

export default {
  	name: '',
  	store,
  	data(){
		return{
            // activeTab:0,
            messages:[
                // {id:0,name:"大撒",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",words:"评论了你的日记",date:"2020-8-7"},
                // {id:1,name:"发射点",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",words:"赞了你的日记",date:"2020-8-7"},
            ],
            // notices:[
            //     {id:0,name:"大撒",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",words:"评论了你的日记a",date:"2020-8-7"},
            //     {id:1,name:"发射点",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",words:"赞了你的日记b",date:"2020-8-7"},
            // ],
            // showPart:"messages"

            loading:true,
            finished:false,
            pageNum:1,
            total:0,
		}
  	},
  	computed:{
        ...mapState({
            userInfo(state){ return state.userInfo},
        }),
  	},
  	watch:{},
  	components: {

  	},
  	methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        deletemsg(m){
            var that=this;
            console.log(m)
            mdelete({
                ids:m.id
            }).then(function(res){
                console.log(res)
                that.refreshPage()
            })
        },
        // selfTabClick(index){
        //     this.activeTab=index;
        //     if(index==0){
        //         this.showPart="messages"
        //     }else{
        //         this.showPart="notices"
        //     }
        // },
        getData(pageNum){
            var that=this;
            var data={
                limit:10,
                start:pageNum||1,
                consumerId:this.userInfo.id
            }
            return mpage(data).then(function(response){
                // console.log(response)
                that.total=response.result.total
                that.messages=that.messages.concat(response.result.items)
            })
        },
        onLoad(){
            // 列表下拉加载

            var that=this;
            this.pageNum+=1;
            this.getData(this.pageNum).then(function(){
                that.loading=false
                if(that.messages.length==that.total){
                    that.finished=true
                    return
                }
            });
        },
        refreshPage(){
            var that=this;
            this.pageNum=1;
            this.messages.length=0
            that.getData().then(function(){
                that.loading=false
                if(that.messages.length==that.total){
                    that.finished=true
                    return
                }
            })
        }


  	},
  	mounted(){


  	},
  	created(){
        // 初始化数据
        var that=this
        store.state.userPromiseFlag.then(function(){
            that.refreshPage()

        })
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
    
    .pageNavNative .navLeftIcon{
        margin-right: 10px;
    }
    

    .notice .pageNavNative .selfTabs{
        display: flex;
        border: 1px solid white;
        border-radius: 10px;
        font-size: 15px;
        background-color: white;
        
    }
    .notice .pageNavNative .selfTab{
        color: #FF8C34;
        background-color: white;
        padding: 5px 15px;
    }
    .notice .pageNavNative .tabActive{
        color: white;
        background-color: #FF8C34;
    }
    .notice .pageNavNative .leftTab{
        border-radius: 10px 0px 0px 10px;
    }
    .notice .pageNavNative  .rightTab{
        border-radius: 0px 10px 10px 0px;
    }



    .notice .item{
        display: flex;
        align-items: center;
        border-bottom:1px solid rgba(0,0,0,0.11);
        padding: 10px 0px;
        width: calc(100% - 30px);
        margin: 0px auto;
        text-align: left;
        font-size: 14px;
    }
    .notice .itemAvatar{
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    .notice .itemShortWrap{
        display: flex;
        align-items: center;
        color: #999999;
        margin-bottom: 5px;
    }

    .notice .itemDate{
        margin-left: auto;
        font-size: 11px;
    }

    .notice .delete-button{
        height: 100%;
    }
</style>