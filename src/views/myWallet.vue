<template>
	<div class="myWallet">
		<van-nav-bar title="钱包"  left-arrow class="pageNavNative" @click-left="onClickLeft" right-text="钱包明细" @click-right="onClickRight" />
		<div class="myWalletInfo">
			<div class="myWalletInfoLeft" @click="seeBankCard">立即绑定</div>
			<div class="myWalletInfoMid">
				<div class="myWalletInfoLabel">我的钱包</div>
				<div class="myWalletInfoMoney">{{ userInfo.money }}</div>
				<div class="myWalletInfoUnit">可提现余额(元)</div>
			</div>
			<div class="myWalletInfoRight" @click="seeWithdraw">立即提现</div>
		</div>

        <van-list class="logsListWrap" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    		<div class="logsList">
    			<div class="logsListTitle">提现记录</div>
    			<div v-for="log in logs" class="logItem">
    				<van-icon class="logItemIcon iconfont" class-prefix='icon' name="jindutiaoqiandai" size="38" color="rgba(255,140,52,1)" />
    				
    				<div class="logItemMid">
    					<div class="logItemMidLabel">{{ log.title }}</div>
    					<div class="logItemMidDate">{{ log.date }}</div>
    				</div>
    				<div class="logItemMoney">{{ log.signSymbol }}{{ log.money }}元</div>
    			</div>
    		</div>
        </van-list>
	
	</div>
</template>

<script type="text/javascript">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import Vue from 'vue';
import store from '@/store';

// // 手动引入vant单个组件
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';

// import Vant from 'vant';
// import 'vant/lib/index.css';
// import { Dialog } from 'vant';

// Vue.use(Vant);
// Vue.use(Dialog);

import { mapState } from 'vuex'
import { bpage } from '@/api/bill'

export default {
	name: '',
	store,
	data(){
		return{
			logs:[
				// {date:"2020-8-22 08:44",money:"-20.00",},
				// {date:"2020-8-22 08:44",money:"-20.00",}
			],
			// money:"100.00"
            loading:true,
            finished:false,
            pageNum:1,
            total:0,
		}
	},
	computed:{
		...mapState({
            userInfo(state){ return state.userInfo},
        })
	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        onClickRight(){
            this.$router.push("/myCostDetail");
        },
        seeBankCard(){
            this.$router.push("/bankCard");
        },
        seeWithdraw(){
            this.$router.push("/withdraw");
        },
        onLoad(){
            // 列表下拉加载
            var that=this;
            this.pageNum+=1;

            this.getData(this.pageNum).then(function(){
                that.loading=false
                if(that.logs.length==that.total){
                    that.finished=true
                    return
                }
            });
        },
        getData(pageNum){
            pageNum=pageNum||1
            var that=this;
            var data={
                consumerId:this.userInfo.id,
                start:pageNum,
                limit:10,
                type:3
            }

            return bpage(data).then(function(response){
                that.total=response.result.total
                that.logs=that.logs.concat(response.result.items)
            })
        }
	},
	mounted(){

	},
	created(){
        var that=this;
        store.dispatch("getUserInfo").then(function(){
            // console.log(store)
        })

        store.state.userPromiseFlag.then(function(){

            console.log(that.userInfo)
            // 获取列表数据
            that.getData().then(function(){
                that.loading=false
                if(that.logs.length==that.total){
                    that.finished=true
                    return
                }
            })
        })
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

    .myWallet .van-nav-bar__text{
        color: white;
        font-size: 15px;
    }

    .myWallet .van-hairline--bottom::after{
    	border-bottom-width:0px;
    }

    .myWallet .myWalletInfo{
    	display: flex;
    	align-items: center;

    	background:rgba(255,140,52,1);
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		border-radius:0px 0px 10px 10px;
		justify-content: space-between;

		font-weight: bold;
		color: #FFFFFF;

		padding: 20px 0px;
    }
    .myWallet .myWalletInfoRight{
    	/*margin-left: auto;*/
    	border-radius:4px 0px 0px 4px;
    	background:rgba(255,255,255,1);
    	color: #FF8C34;
    	font-size: 14px;
    	padding: 5px 10px;
    }

    .myWallet .myWalletInfoLeft{
    	border-radius:0px 4px 4px 0px;
    	background:rgba(255,255,255,1);
    	color: #FF8C34;
    	font-size: 14px;
    	padding: 5px 10px;
    }
    .myWallet .myWalletInfoLabel{
    	font-size: 17px;

    }

    .myWallet .myWalletInfoMoney{
    	font-size: 25px;
    	margin:15px 0px;
    }
    .myWallet .myWalletInfoUnit{
    	font-size:11px;
    	padding-bottom: 10px;
    }

    .myWallet .logsList{
    	width: calc(100% - 30px);
    	margin:0px auto;
    }

    .myWallet .logsListTitle{
    	font-size: 15px;
    	color: #333333;
    	margin:14px 0px;
    }

    .myWallet .logItem{
    	display: flex;
    	align-items: center;
    	margin-bottom: 10px;
    }
    .myWallet .logItemIcon{
    	margin-right: 10px;
    }
    .myWallet .logItemMid{

    }
    .myWallet .logItemMidLabel{
    	font-size: 14px;
    	color: #333333;
    }
    .myWallet .logItemMidDate{
    	font-size: 11px;
    	color: #333333;
    	margin-top: 5px;

    }
    .myWallet .logItemMoney{
    	color: #333333;
    	font-size: 18px;
    	margin-left: auto;
    }
    

</style>