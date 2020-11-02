<template>
    <div class="myDiary">
        <van-nav-bar :title="pageTitle" left-arrow @click-left="onClickLeft" class="pageNavNative" />

        <div class="userInfoBox">
            <div class="userInfo">
                <van-image class="userInfoPic" round width="50" height="50" :src="someone?someone.avatar:userInfo.avatar" />
                <div class="userInfoShort">
                    <div class="userInfoName">{{ someone?someone.consumerName:userInfo.name }}</div>
                    <div class="userInfoSignature">{{ signature }}</div>
                </div>
            </div>
            <div class="userActions">
                <div class="userActionsRow" @click="seeAttention">
                    <div class="userActionsRowLabel">关注</div>
                    <div class="userActionsRowNum">{{ attentionNum }}</div>
                </div>
                <div class="userActionsRow">
                    <div class="userActionsRowLabel">帖数</div>
                    <div class="userActionsRowNum">{{ postNum }}</div>
                </div>
                <div class="userActionsRow">
                    <div class="userActionsRowLabel">获赞</div>
                    <div class="userActionsRowNum">{{ zanNum }}</div>
                </div>
            </div>
        </div>
        
        <van-list class="diarysWrap" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="diarys">
                <div class="diary" v-for="diary in diarys" @click="seeDiary(diary)">
                    <van-image class="diaryPic" width="100%" fit="contain"  :src="diary.images.split(',')[0]" />
                    <div class="diaryWords">{{ diary.detail }}</div>
                    <div class="diaryFoot">
                        <van-image round class="diaryAvatar" :src="diary.consumerAvatar" />
                        <div class="diaryUserName">{{ diary.consumerName }}</div>
                        <div class="diaryZan" :class="diary.likeIs?'zanActive':''"><van-icon :name="diary.likeIs?'like':'like-o'" />{{ diary.likeNum||0 }}</div>
                    </div>

                    <div class="shadowBtn" v-if="!someone" @click.stop="dealWithDiary(diary)"><van-icon name="ellipsis" /></div>
                </div>
            </div>
        </van-list>


        <van-popup v-model="actionShowFlag" position="bottom"  round>
            <div class="van-hairline--bottom popupItem" :class="item=='删除'?'removeRed':''" v-for="item in actionList" @click="actionConfirm(item)">{{ item }}</div>
        </van-popup>
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

import { ddelete,dpage,dindex } from '@/api/diary'
import { mapState } from 'vuex'

export default {
  	name: '',
  	store,
  	data(){
		return{
            // userName:"格尔",
            // signature:"未设置个性签名",
            attentionNum:0,
            zanNum:0,
            postNum:0,


            diarys:[
                // {pic:"https://img.yzcdn.cn/vant/cat.jpeg",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"辅导课",zan:2,iszan:true,words:"自体脂肪填充泪沟要注意的7个雷区"},
                // {pic:"https://img.yzcdn.cn/vant/cat.jpeg",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"辅导课",zan:2,iszan:true,words:"自体脂肪填充泪沟要注意的7个雷区"},
                // {pic:"https://img.yzcdn.cn/vant/cat.jpeg",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"辅导课",zan:2,iszan:false,words:"自体脂肪填充泪沟要注意的7个雷区"},
            ],

            actionShowFlag:false,
            actionList:["请选择","编辑","删除","取消"],

            diaryClicked:null,// 被点击弹出选择框的日记

            loading:true,
            finished:false,
            pageNum:1,
            total:0,

            someone:null,//其他用户的日记页相关信息
		}
  	},
  	computed:{
        signature(){
            var signature=this.someone?this.someone.sign:this.userInfo.sign
            return signature?signature:"未设置个性签名"
        },
        pageTitle(){
            var name=this.someone?this.someone.consumerName:this.userInfo.name
            return name+"的主页"
        },
        ...mapState({
            userInfo(state){ return state.userInfo},
        })
  	},
  	watch:{},
  	components: {

  	},
  	methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        init(){
            // 初始化界面数据
        },
        seeDiary(diary){
            console.log(diary)
            this.$router.push({ 
                name: 'diaryInfo',
                query: { id:diary.id }
            })
        },
        seeAttention(){
            this.$router.push('/myAttention')
        },
        onLoad(){
            // 列表下拉加载
            // console.log("aax")
            // var that=this;
            // setTimeout(function(){
            //     that.products=that.products.concat(that.addproducts)
            //     that.loading=false
            // },5000)

            var that=this;
            this.pageNum+=1;

            this.getData(this.pageNum).then(function(){
                that.loading=false
                if(that.diarys.length==that.total){
                    that.finished=true
                    return
                }
            });
        },
        dealWithDiary(diary){
            this.actionShowFlag=true
            this.diaryClicked=diary
        },
        actionConfirm(item){
            var that=this;
            if(item=="请选择"){
                return
            }
            if(item=="编辑"){
                this.actionShowFlag=false
                // 跳转
                this.$router.push({
                    name:"diaryRecord",
                    query:{
                        id:this.diaryClicked.id
                    }
                })
                return
            }
            if(item=="删除"){
                this.actionShowFlag=false
                ddelete({
                    id:this.diaryClicked.id
                }).then(function(response){
                    console.log(response)
                    that.diarys.length=0
                    that.finished=false
                    that.pageNum=1
                    that.getData()
                })

                // 删除
                return
            }
            if(item=="取消"){
                this.actionShowFlag=false
            }
            
        },
        getData(pageNum){
            pageNum=pageNum||1
            var that=this;

            var consumerId=this.someone?this.someone.attentionId:this.userInfo.id

            var data={
                consumerId:consumerId,
                start:pageNum,
                limit:10
            }
            return dpage(data).then(function(response){
                // console.log(response)
                that.total=response.result.total
                that.diarys=that.diarys.concat(response.result.items)
            })
        },
        getIndexData(){
            // 获取关注数，贴数，获赞数
            var that=this;
            var consumerId=this.someone?this.someone.attentionId:this.userInfo.id

            dindex({
                consumerId:consumerId,
            }).then(function(res){
                // console.log(res)
                that.attentionNum=res.result.attentionNum
                that.zanNum=res.result.likeNum
                that.postNum=res.result.diaryNum
            })
        }

  	},
  	mounted(){

  	},
  	created(){
        // 判断是否看其他的日记首页
        var user=this.$router.currentRoute.query.user
        console.log(this.$router.currentRoute)
        if(user){
            this.someone=JSON.parse(user)
            console.log(this.someone)
        }

        // 初始化数据
        var that=this;
        store.state.userPromiseFlag.then(function(){

            console.log(that.userInfo)
            // 获取列表数据
            that.getData().then(function(){
                that.loading=false
                if(that.diarys.length==that.total){
                    that.finished=true
                    return
                }
            })

            // 获取统计数据
            that.getIndexData()
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
    
    .myDiary{
        text-align: left;

    }
    .myDiary .pageNavNative.van-hairline--bottom::after{
        border: 0px;
    }

    .myDiary .userInfoBox{
        background-color: #FF8C34;
        padding: 0px 15px;
        color: white;
    }
    .myDiary .userInfo{
        display: flex;
    }
    .myDiary .userInfoPic{
        padding: 3px;
        background-color: white;
    }
    .myDiary .userInfoShort{
        margin-left: 15px;
        width: calc(100% - 71px);
    }
    .myDiary .userInfoName{
        font-size: 15px;
    }
    .myDiary .userInfoSignature{
        font-size: 11px;
        margin-top: 10px;
    }

    .myDiary .userActions{
        display: flex;
        justify-content: space-around;
        padding:15px 0px;
    }
    .myDiary .userActionsRow{
        text-align: center;
    }
    .myDiary .userActionsRowLabel{
        font-size: 14px;
    }
    .myDiary .userActionsRowNum{
        margin-top: 2px;
        font-size: 20px;
        font-weight: bold;
    }




    .myDiary .diarysWrap{
        width: calc(100% - 20px);
        margin:0px auto;
        margin-top: 10px;
    }
    .myDiary .diarys{
        display: flex;
        flex-wrap: wrap;
    }
    .myDiary .diary{
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin:5px 5px;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:10px;
        position: relative;
    }
    .myDiary .diaryPic img{
        border-radius: 10px 10px 0px 0px;
        width: 100%;
        height: 120px;
    }
    .myDiary .diaryFoot{
        display: flex;
        align-items: center;
        padding: 0px 10px;
        margin-bottom: 10px;
    }
    .myDiary .diaryAvatar{
        width: 20px;
        height: 20px;
    }
    .myDiary .diaryWords{
        padding: 0px 10px;
        color: #333333;
        font-size: 12px;
        margin: 6px 0px;
        /*text-overflow: ellipsis;*/
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .myDiary .zanActive{
        color: #FF8C34;
    }
    .myDiary .diaryZan{
        display: flex;
        margin-left: auto;
        align-items: center;
    }
    
    .myDiary .diaryUserName{
        font-size: 11px;
        color: #999999;
        margin-left: 5px;
    }

    .myDiary .diary .shadowBtn{
        position: absolute;
        top: 0px;
        left:0px;
        width: 100%;
        border-radius: 10px 10px 0px 0px;
        background-color: rgba(0,0,0,0.2);
        display: flex;
        justify-content: flex-end;
        color: white;
        padding: 0px 10px;
        box-sizing: border-box;
    }

    .myDiary .removeRed{
        color: red;
    }
    .myDiary .popupItem{
        padding: 10px 0px;
        text-align: center;
    }
</style>