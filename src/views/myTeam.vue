<template>
	<div class="myTeam">
		<van-nav-bar title="我的团队"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		<div class="myTeamInfo">
			<van-row class="myTeamInfoUp">
                <van-col class="myTeamInfoCol" span="8">团队人数</van-col>
                <van-col class="myTeamInfoCol" span="8">
                    <van-image round width="50" height="50" class="userPic" :src="userPic" />
                </van-col>
                <van-col class="myTeamInfoCol" span="8">团队业绩</van-col>
            </van-row>
            <van-row class="myTeamInfoDown">
                <van-col class="myTeamInfoCol" span="8">{{ teamNum }}<span style="font-size: 14px;">人</span></van-col>
                <van-col class="myTeamInfoCol" span="8"></van-col>
                <van-col class="myTeamInfoCol" span="8">{{ teamEarn }}<span style="font-size: 14px;">元</span></van-col>
            </van-row>
		</div>

        <van-tabs v-model="active" title-active-color="#FF8C34" title-inactive-color="#999999" color="#FF8C34" @change="tabChange" line-width=60>
            <van-tab :title="zhituiTitle"></van-tab>
            <van-tab :title="jiantuiTitle"></van-tab>
        </van-tabs>
	    <div class="myTeamContent">
            <div class="myTeamContentRow" v-for="(row,index) in showList">
                <div class="myTeamContentRowName">{{ row.name }}</div>
                <div class="myTeamContentRowBottom">
                    <div class="myTeamContentRowLevel">{{ row.level }}</div>
                    <div class="myTeamContentRowDate">{{ row.date }}</div>
                </div>

                <div v-if="index!=showList.length-1" class="divider"></div>
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
			zhituiList:[
                {name:"用户名",level:"普通用户",date:"2020-08-13 16:48:30"},
                {name:"用户名",level:"普通用户",date:"2020-08-13 16:48:30"},
                {name:"用户名",level:"普通用户",date:"2020-08-13 16:48:30"},
            ],
            jiantuiList:[
                {name:"用户名",level:"普通用户",date:"2020-08-13 16:48:30"},
                {name:"用户名",level:"普通用户",date:"2020-08-13 16:48:30"},
                {name:"用户名",level:"普通用户",date:"2020-08-13 16:48:30"},
                {name:"用户名",level:"普通用户",date:"2020-08-13 16:48:30"},
            ],
            showList:[],

            active:0,

            teamNum:"0",
            teamEarn:"0",
            userPic:"https://img.yzcdn.cn/vant/cat.jpeg",

		}
	},
	computed:{
		zhituiTitle(){
            return "直推（"+this.zhituiList.length+"）"
        },
        jiantuiTitle(){
            return "直推（"+this.jiantuiList.length+"）"
        },

	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        tabChange(index){
            if(index==0){
                this.showList=[].concat(this.zhituiList)
                return
            }
            if(index==1){
                this.showList=[].concat(this.jiantuiList)
                return
            }
        },
        init(){
            // 初始化直推列表，间推列表
            // 初始化团队人数和业绩，个人头像
            this.showList=[].concat(this.zhituiList)
        }
	},
	mounted(){

	},
	created(){
        this.init();
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

    .myTeam .van-hairline--bottom::after{
    	border-bottom-width:0px;
    }

    .myTeam{}

    .myTeam .myTeamInfo{
    	background:rgba(255,140,52,1);
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		border-radius:0px 0px 10px 10px;
		color: #FFFFFF;
		padding: 10px 0px;
        /*padding-bottom: 20px;*/
    }

    .myTeam .myTeamInfoUp{
        display: flex;
        align-items: flex-end;
        font-size: 15px;
    }
    .myTeam .myTeamInfoDown{
        margin-top: 10px;
        font-size: 25px;
        padding-bottom: 20px;
    }
    .myTeam .myTeamInfoCol{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .myTeam .userPic{
        padding: 3px;
        background-color: white;
    }
    
    .myTeam .divider{
        border: 1px solid rgba(0,0,0,0.1);
    }
    .myTeam .myTeamContent{
        width: calc(100% - 30px);
        margin:0px auto;
        text-align: left;
        color: #999999;
        font-size: 11px;
    }
    .myTeam .myTeamContentRow{

    }
    .myTeam .myTeamContentRowName{
        color: #333333;
        font-size: 14px;
        margin-top: 12px;
        font-weight: bold;
    }
    .myTeam .myTeamContentRowBottom{
        margin-top: 8px;
        display: flex;
        align-items: center;
        padding-bottom: 12px;
    }
    .myTeam .myTeamContentRowLevel{}
    .myTeam .myTeamContentRowDate{
        margin-left: auto;
    }
</style>