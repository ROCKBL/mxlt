<template>
    <div class="withdraw">
        <van-nav-bar title="立即提现"  left-arrow class="pageNavNative" @click-left="onClickLeft"  />

        <van-notice-bar mode="closeable" v-if="limitAccount">
          每日提现上限：{{ limitAccount }}元
        </van-notice-bar>

        <div class="messageBox">
            <van-cell class="messageBoxHead"  title="到账银行卡" is-link :value="bankType"  icon="credit-pay" @click="showPicker=true" />

            <div class="submitMoney">
                <div class="submitMoneyTip">提现金额</div>
                <van-field :label-width="20" label-class="inputfield" type="number" :placeholder="minWithdrawDepositRecomand" v-model="form.money" label="￥" style="padding: 0px;margin-top: 10px;"  />
            </div>
            <div class="leftMoney">当前零钱余额:{{ userInfo.money }}元</div>
            <!-- <div class="leftMoney" v-if="minWithdrawDeposit">{{ minWithdrawDeposit }}元</div> -->
            <!-- <div class="leftMoney" v-if="limitAccount">{{ limitAccount }}元</div> -->
            <!-- <van-field class="messageBoxBody" v-model="form.money" rows="6"  label="" type="textarea" placeholder="分享你的新鲜事儿吧，小可爱~" /> -->
        </div>


        <van-button class="submitBtn" @click="submit" type="primary" block>确认</van-button>

        <van-popup v-model="showPicker" round position="bottom">
          <!-- <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" value-key="name"/> -->
            <div class="popContent">
                <div class="popContentHead">
                    <van-icon class="popContentHeadIcon" name="cross" @click="showPicker = false" />
                    <div class="popContentHeadTitle">选择到账银行卡</div>
                </div>
                <div v-for="card in columns" class="cardRow" @click="chooseCard(card)">
                    <div class="cardRowType">{{ card.type }}</div>
                    <div class="cardRowNumber">{{ card.cardNo }}</div>
                </div>
                <div class="popBottom" @click="addBankCard">
                    <van-icon name="plus" />
                    <div>添加银行卡</div>
                </div>
            </div>
            
        </van-popup>

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
// import { Dialog,Toast } from 'vant';

// Vue.use(Vant);
// Vue.use(Dialog);
// Vue.use(Toast);

import { bpage,bwithdraw,swithdraw } from '@/api/bank'

import { mapState } from 'vuex'

export default {
    name: '',
    store,
    data(){
        return{
            showPicker:false,
            bankType:"请选择到账银行卡",
            columns:[],
            form:{
                money:null,
                // bankId:null,
            },
            

            limitAccount:null,
            minWithdrawDeposit:null,
        }
    },
    computed:{
        ...mapState({
            userInfo(state){ return state.userInfo},
        }),
        minWithdrawDepositRecomand(){
            return "最小提现金额:"+this.minWithdrawDeposit+"元"
        }
    },
    watch:{},
    components: {
        // HelloWorld
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        // onConfirm(val){
        //     // console.log(val)
        //     this.showPicker=false

        //     console.log(val)

        //     this.bankType=val.tyoe
        //     this.form.bankId=val.id
        // },
        chooseCard(card){
            this.bankType=card.type
            this.form.bankId=card.id
            console.log(card)
            this.showPicker=false
        },
        getData(){
            // 获取银行卡列表
            var that=this;
            bpage({
                start:1,
                limit:9999,
                consumerId:this.userInfo.id
            }).then(function(response){
                console.log(response)
                that.columns=response.result.items
            })

            swithdraw().then(function(res){
                // console.log(res)
                that.limitAccount=res.result.limitAccount
                that.minWithdrawDeposit=res.result.minWithdrawDeposit
            })
        },
        submit(){
            console.log(this.userInfo)
            if(!this.form.hasOwnProperty("bankId")){
                this.Toast("请先选择银行卡")
                return
            }
            if(Number(this.form.money)>this.userInfo.money){
                this.Toast("提现金额超过余额")
                return
            }
            if(Number(this.form.money)==0){
                this.Toast("提现金额要大于0元")
                return
            }
            var that=this
            // 提交提现
            bwithdraw(this.form).then(function(res){
                console.log(res)
                that.$router.go(-1)
            })
        },
        addBankCard(){
            this.$router.push("/editeBankCard")
        }
    },
    mounted(){

    },
    created(){
        store.dispatch("getUserInfo").then(function(){
            // console.log(store)
        })

        this.getData()
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

    .withdraw{
        text-align: left;
    }
    .withdraw .van-nav-bar__text{
        color: white;
        font-size: 15px;
        /*font-weight: bold;*/
    }


    .withdraw .messageBox{
        border-radius:10px;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        width: calc(100% - 30px);
        margin:10px auto;
    }

    .withdraw .messageBoxHead{
        /*background-color: transparent;*/
    }
    .withdraw .messageBoxBody{
        background-color: transparent;
    }

    .withdraw .van-picker__confirm{
        color: #FF8C34;
    }

    .withdraw .popContent{
        width: calc(100% - 30px);
        padding-top: 10px;
        margin:auto;
    }
    .withdraw .popContentHead{
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;
        margin-bottom: 10px;
    }
    .withdraw .popContentHeadTitle{

    }
    .withdraw .popContentHeadIcon{
        position: absolute;
        left: 0px;
    }
    .withdraw .popBottom{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0px;
    }

    .withdraw .cardRow{
        padding: 10px 0px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .withdraw .cardRowType{
        margin-bottom: 10px;
    }
    .withdraw .cardRowNumber{

    }

    .withdraw .submitBtn{
        width: calc(100% - 30px);
        margin:auto;
        background-color: #FF8C34;
        border:none;
        margin-top: 20px;
        border-radius: 5px;
        font-size: 16px;
    }

    .withdraw .leftMoney{
        color: #999999;
        font-size: 12px;
        padding: 10px 0px;
        width: calc(100% - 30px);
        margin:auto;
    }


    .withdraw .submitMoney{
        width: calc(100% - 30px);
        margin:auto;
        border-bottom: 1px solid #ebedf0;
        padding: 10px 0px;
    }

    .withdraw .submitMoneyTip{
        font-size: 14px;
        color: black;
    }

    .withdraw .inputfield{
        font-size: 20px;
        font-weight: bold;
    }
</style>