<template>
    <div class="myAttention">
        <van-nav-bar title="关注" left-arrow @click-left="onClickLeft" class="pageNavNative" />

        <div class="attentionList">
            <div class="item" v-for="user in attentionList">
                <van-image round class="itemAvatar" :src="user.avatar" @click="seeDiary(user)" />
                <div class="" style="flex-grow: 1;">
                    <div class="itemShortWrap">
                        <div class="itemName">{{ user.consumerName }}</div>
                        <!-- <div class="itemDate">{{ user.date }}</div> -->
                        <van-button plain round type="primary" class="cancelAttention" click="cancelAttention" >取消关注</van-button>
                    </div>
                    <div class="itemMessage">{{ user.sign }}</div>
                </div>
            </div>
        </div>
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

import { myPage,aAttentionAndCancel } from '@/api/attention'
import { mapState } from 'vuex'

export default {
  	name: '',
  	store,
  	data(){
		return{
            attentionList:[]
		}
  	},
  	computed:{
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
        cancelAttention(){},
        seeDiary(user){
            // console.log(user)
            this.$router.push({ 
                name: 'myDiary',
                query: {
                    user:JSON.stringify(user)
                }
            })
        },
        getData(){
            var that=this;
            myPage({
                consumerId:this.userInfo.id,
                limit:999,
                start:1
            }).then(function(res){
                that.attentionList=res.result.items||[]
                console.log(res)
            })
        }
  	},
  	mounted(){

  	},
  	created(){
        // 初始化数据
        var that=this;
        store.state.userPromiseFlag.then(function(){
            // 获取关注列表数据
            that.getData()
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
    
    .myAttention{
        text-align: left;

    }

    .myAttention .attentionList{

    }
    .myAttention .cancelAttention{
        margin-left: auto;
        color: #FF8C34;
        font-size: 12px;
        border: 1px solid #FF8C34;
        height: 24px;
    }
    .myAttention .item{
        display: flex;
        align-items: center;
        border-bottom:1px solid rgba(0,0,0,0.11);
        padding: 10px 0px;
        width: calc(100% - 30px);
        margin: 0px auto;
        text-align: left;
        font-size: 14px;
    }
    .myAttention .itemAvatar{
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }
    .myAttention .itemShortWrap{
        display: flex;
        align-items: center;
        /*color: #999999;*/
        margin-bottom: 5px;
    }

    .myAttention .itemDate{
        margin-left: auto;
        font-size: 11px;
    }
</style>