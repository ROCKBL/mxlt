<template>
    <div class="myDiary">
        <van-nav-bar :title="pageTitle" left-arrow @click-left="onClickLeft" class="pageNavNative" />

        <div class="userInfoBox">
            <div class="userInfo">
                <van-image class="userInfoPic" round width="50" height="50" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <div class="userInfoShort">
                    <div class="userInfoName">{{ userName }}</div>
                    <div class="userInfoSignature">{{ signature }}</div>
                </div>
            </div>
            <div class="userActions">
                <div class="userActionsRow">
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
                <div class="diary" v-for="diary in diarys">
                    <van-image class="diaryPic" :src="diary.pic" />
                    <div class="diaryWords">{{ diary.words }}</div>
                    <div class="diaryFoot">
                        <van-image round class="diaryAvatar" :src="diary.avatar" />
                        <div class="diaryUserName">{{ diary.userName }}</div>
                        <div class="diaryZan" :class="diary.iszan?'zanActive':''"><van-icon :name="diary.iszan?'like':'like-o'" />{{ diary.zan }}</div>
                    </div>

                    <div class="shadowBtn" @click="dealWithDiary(diary)"><van-icon name="ellipsis" /></div>
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

import Vue from 'vue'
import store from '@/store'

// // 手动引入vant单个组件
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';

import Vant from 'vant'
import 'vant/lib/index.css'


Vue.use(Vant)

// 阿里图标文件
// import "@/assets/iconfont/iconfont.css";


export default {
  	name: '',
  	store,
  	data(){
		return{
            userName:"格尔",
            signature:"个性签名的内容个性签名的内容个性签名的内",
            attentionNum:2,
            zanNum:3,
            postNum:9,

            loading:false,
            finished:false,
            diarys:[
                {pic:"https://img.yzcdn.cn/vant/cat.jpeg",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"辅导课",zan:2,iszan:true,words:"自体脂肪填充泪沟要注意的7个雷区"},
                {pic:"https://img.yzcdn.cn/vant/cat.jpeg",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"辅导课",zan:2,iszan:true,words:"自体脂肪填充泪沟要注意的7个雷区"},
                {pic:"https://img.yzcdn.cn/vant/cat.jpeg",avatar:"https://img.yzcdn.cn/vant/cat.jpeg",userName:"辅导课",zan:2,iszan:false,words:"自体脂肪填充泪沟要注意的7个雷区"},
            ],

            actionShowFlag:false,
            actionList:["请选择","编辑","删除","取消"],

            diaryClicked:null,// 被点击弹出选择框的日记
		}
  	},
  	computed:{
        pageTitle(){

            return this.userName+"的主页"
        }
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

        onLoad(){
            // 列表下拉加载
            // console.log("aax")
            // var that=this;
            // setTimeout(function(){
            //     that.products=that.products.concat(that.addproducts)
            //     that.loading=false
            // },5000)
        },
        dealWithDiary(diary){
            this.actionShowFlag=true
            this.diaryClicked=diary
        },
        actionConfirm(item){
            if(item=="请选择"){
                return
            }
            if(item=="编辑"){
                this.actionShowFlag=false
                // 跳转
                this.$router.replace({
                    name:"diaryRecord",
                    query:{
                        diaryId:"1"
                    }
                })
                return
            }
            if(item=="删除"){
                this.actionShowFlag=false
                // 删除
                return
            }
            if(item=="取消"){
                this.actionShowFlag=false
            }
            
        }

  	},
  	mounted(){


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