<template>
    <div class="diaryInfo">
        <van-nav-bar title="发布日记"  left-arrow class="pageNavNative" @click-left="onClickLeft" right-text="发表" @click-right="goPublish" />
        <div class="diaryInfoContent">
            <div class="diaryInfoContentHead">
                <van-image round class="diaryInfoContentHeadAvatar" :src="avatar" />
                <div class="diaryInfoContentHeadshortWrap">
                    <div class="diaryInfoContentHeadName">{{ name }}</div>
                    <div class="diaryInfoContentHeadDate">{{ date }}</div>
                </div>
                <div v-if="concern!=null" @click="concernsm" class="concernWrap">
                    <div class="concern" v-if="concern">已关注</div>
                    <div class="unconcern" v-else><van-icon name="plus" />关注</div>
                </div>
                
            </div>
            <div class="diaryInfoContentWords">{{ words }}</div>
            <van-image class="diaryInfoContentPic" v-for="pic in pics"  :src="pic" />
            <div class="diaryInfoContentFoot">
                <!-- <div class="diaryInfoContentFootMessage"><van-icon name="chat-o" />{{ messages.length }}</div> -->
                <div class="diaryInfoContentFootZan" @click="zansm" :class="iszan?'zanActive':''"><van-icon :name="iszan?'like':'like-o'" />{{ zan }}</div>
            </div>
        </div>
        <!-- <div class="diaryInfoMessageBox">
            <div class="diaryInfoMessageBoxTitle">最新评论（{{ messages.length }}）</div>
            <div class="diaryInfoMessageItem" v-for="m in messages">
                <van-image round class="diaryInfoMessageItemAvatar" :src="m.avatar" />
                <div class="" style="flex-grow: 1;">
                    <div class="diaryInfoMessageItemShortWrap">
                        <div class="diaryInfoMessageItemName">{{ m.name }}</div>
                        <div class="diaryInfoMessageItemDate">{{ m.date }}</div>
                    </div>
                    <div class="diaryInfoMessageItemMessage">{{ m.words }}</div>
                </div>
            </div>
        </div> -->
        <!-- <van-search class="diaryInfoMessage" v-model="leaveMessage" shape="round"  placeholder="发表评价" left-icon="" /> -->
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

import { ddetail,disLike } from '@/api/diary'
import { aAttentionAndCancel } from '@/api/attention'

export default {
    name: '',
    store,
    data(){
        return{
            // leaveMessage:'',
            // messages:[
            //     {avatar:"https://img.yzcdn.cn/vant/cat.jpeg",name:"乖咪",date:"2020-8-7",words:"自体脂肪填充泪沟要注意"},
            //     {avatar:"https://img.yzcdn.cn/vant/cat.jpeg",name:"乖咪",date:"2020-8-7",words:"自体脂肪填充泪沟要注意"},
            //     {avatar:"https://img.yzcdn.cn/vant/cat.jpeg",name:"乖咪",date:"2020-8-7",words:"自体脂肪填充泪沟要注意"},
            // ],
            // avatar:"https://img.yzcdn.cn/vant/cat.jpeg",
            // name:"乖咪",
            // date:"2020-8-7",
            // words:"自体脂肪填充泪沟要注意的7个雷区自体脂肪填充泪沟要注意的7个雷区自体脂肪填充泪沟要注意的7个雷区自体脂肪填充泪沟要注意的7个雷区自体脂肪填充泪沟要注意的7个雷区",
            // pics:["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"],
            // zan:0,
            // concern:false,
            // iszan:false


            avatar:"",
            name:"",
            date:"",
            words:"",
            pics:[],
            zan:0,
            concern:null,
            iszan:false,
            diaryInfo:{},

            diaryId:null,
        }
    },
    computed:{
       
    },
    watch:{},
    components: {

    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        goPublish(){
            this.$router.push("/diaryRecord")
        },
        getData(){
            var that=this;
            ddetail({
                id:this.diaryId
            }).then(function(response){
                // console.log(response)
                var res=response.result
                that.diaryInfo=res

                that.avatar=res.consumerAvatar
                that.name=res.consumerName
                that.date=new Date(res.createTime).Format("yyyy-MM-dd")
                that.words=res.detail

                that.pics=res.images.split(",")
                that.zan=res.likeNum||0
                that.iszan=res.likeIs

                that.concern=res.attentionIs

            })
        },
        concernsm(){
            var that=this;
            aAttentionAndCancel({
                consumerId:this.diaryInfo.consumerId
            }).then(function(response){
                // console.log(response)
                that.getData()
            })
        },
        zansm(){
            var that=this;
            disLike({
                diaryId:this.diaryId
            }).then(function(response){
                // console.log(response)
                that.getData()
            })
        }
        
    },
    mounted(){

    },
    created(){
        // 初始化数据
        this.diaryId=this.$router.currentRoute.query.id
        this.getData()

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
    
    .diaryInfo{
        text-align: left;
        font-size: 14px;
    }
    .diaryInfo .van-nav-bar__text{
        color: white;
        font-size: 15px;
    }

    .diaryInfo .diaryInfoMessage{
        background:rgba(246,246,246,1);
        margin-top: 40px;

    }

    .diaryInfo .diaryInfoMessage>div{
        background:rgba(255,255,255,1);
    }

    .diaryInfo .diaryInfoContent{
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:10px;
        width: calc(100% - 30px);
        margin:10px auto;
        padding: 10px;
        box-sizing: border-box;
    }

    .diaryInfo .diaryInfoContentHead{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 11px;
    }

    .diaryInfo .diaryInfoContentHeadAvatar{
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    .diaryInfo .concernWrap{
        margin-left: auto;
    }
    .diaryInfo .concern{
        
        border-radius:10px;
        color: #999999;
        border:1px solid rgba(153,153,153,1);
        padding: 2px 10px;
    }
    .diaryInfo .unconcern{
        color: white;
        background-color: #FF8C34;
        border-radius:10px;
        padding: 2px 10px;
        display: flex;
        align-items: center;
    }
    .diaryInfo .diaryInfoContentHeadName{
        font-size: 14px;
        color: #333333;
    }
    .diaryInfo .diaryInfoContentHeadDate{
        color: #999999;
        margin-top: 5px;
    }

    .diaryInfo .diaryInfoContentWords{
        margin-bottom: 10px;
        color: #666666;
    }
    .diaryInfo .diaryInfoContentPic{
        width: 100%;
    }

    .diaryInfo .diaryInfoContentFoot{
        display: flex;
        align-items: center;
    }

    .diaryInfo .diaryInfoContentFootMessage{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333333;
        letter-spacing: 5px;
    }
    .diaryInfo .diaryInfoContentFootZan{
        margin-left: auto;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333333;
        letter-spacing: 5px;
    }
    .diaryInfo .zanActive{
        color: #FF8C34;
    }

    .diaryInfo .diaryInfoMessageItem{
        display: flex;
        align-items: center;
        border-bottom:1px solid rgba(0,0,0,0.11);
        padding: 10px 0px;
    }
    .diaryInfo .diaryInfoMessageItemAvatar{
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    .diaryInfo .diaryInfoMessageBox{
        width: calc(100% - 30px);
        margin:10px auto;
    }

    .diaryInfo .diaryInfoMessageBoxTitle{
        font-size: 15px;
        font-weight: bold;
    }
    .diaryInfo .diaryInfoMessageItemShortWrap{
        display: flex;
        align-items: center;
        color: #999999;
        margin-bottom: 5px;
    }

    .diaryInfo .diaryInfoMessageItemDate{
        margin-left: auto;
    }
</style>