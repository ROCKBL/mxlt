<template>
	<div class="myCoupons">
		<van-nav-bar title="优惠券"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		  
        <van-tabs v-model="active" title-active-color="#FF8C34" title-inactive-color="#999999" color="#FF8C34" @change="tabChange" line-width=60>
            <van-tab title="未使用"></van-tab>
            <van-tab title="已使用"></van-tab>
            <van-tab title="已失效"></van-tab>
        </van-tabs>
        <div class="myCouponsList">

            <div class="base-coupons" v-for="c in showCoupons">
                <div class="couponLeft">
                    <div class="couponLeftTop"><span class="couponLeftTopUnit">￥</span>{{ c.fee }}</div>
                    <div class="couponLeftBottom">满{{ c.minfee }}可用</div>
                </div>
                <div class="couponRight">
                    <div class="couponRightTop">{{ c.name }}</div>
                    <div class="couponRightBottom">
                        <div class="couponRightBottomEnd"><span>有效期至</span>{{ c.date }}</div>
                        <div :class="couponStatusClass(c.status)" class="couponStatus">{{ couponStatus(c.status) }}</div>
                    </div>
                </div>
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

Vue.use(Vant);

export default {
	name: '',
	store,
	data(){
		return{
			showCoupons:[],//展示的优惠券
            unuseCoupons:[
                { status:"1",date:"2020-05-26 23：59",name:"<限时>  20元新人超大红包",minfee:"50",fee:"20" }
            ],//未使用优惠券
            usedCoupons:[
                { status:"2",date:"2020-05-26 23：59",name:"<限时>  20元新人超大红包",minfee:"50",fee:"20" }
            ],//已使用优惠券
            invalidationCoupons:[
                { status:"3",date:"2020-05-26 23：59",name:"<限时>  20元新人超大红包",minfee:"50",fee:"20" }
            ],//失效优惠券

            active:0,

            activeStatusClass:"",

            listAr:["unuseCoupons","usedCoupons","invalidationCoupons"],

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
        couponStatus(status){
            var type="";
            switch(status){
                case "1":
                    type="未使用"
                    break;
                case "2":
                    type="已使用"
                    break;
                case "3":
                    type="已失效"
                    break;
            }
            return type;
        },
        couponStatusClass(status){
            var type="";
            switch(status){
                case "1":
                    type="unuseClass"
                    break;
                case "2":
                    type="usedClass"
                    break;
                case "3":
                    type="invalidationClass"
                    break;
            }
            return type;
        },
        tabChange(index){
            var attr=this.listAr[index]
            this.showCoupons=[].concat(this[attr])
            // this.activeStatusClass=this.couponStatusClass(this.showCoupons[0].status)
        },
        init(){
            this.showCoupons=[].concat(this.unuseCoupons)
        },
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


    .myCoupons{
        text-align: left;
    }

    .myCoupons .myCouponsList{
        width: calc(100% - 30px);
        margin:0px auto;
        box-sizing: border-box;
    }

    .myCoupons .base-coupons {
        /*width: 250px;*/
        width: 100%;
        height: 80px;
        position: relative;
        background: radial-gradient(circle at right top, transparent 5px,  #fff 0) top left / 90px 51% no-repeat,
          radial-gradient(circle at right bottom, transparent 5px,  #fff 0) bottom left /90px 51% no-repeat,
          radial-gradient(circle at left top, transparent 5px, #fff 0) top right /calc(100% - 90px) 51% no-repeat,
          radial-gradient(circle at left bottom, transparent 5px, #fff 0) bottom right /calc(100% - 90px) 51% no-repeat;
        filter: drop-shadow(0px 0px 3px rgba(0,0,0,.3));
        border-radius: 5px;
        margin-top: 10px;
    }
    .myCoupons .base-coupons::before {
        content: '';
        height: 70px;
        border: 1px dashed rgba(0,0,0,0.2);
        position: absolute;
        left: 90px;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .myCoupons .couponLeft{
        position: absolute;
        left: 0px; 
        top:0px;
        width: 90px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .myCoupons .couponRight{
        position: absolute;
        left: 90px; 
        top:0px;
        width: calc(100% - 90px);
        height: 80px;
        color: #333333;
        padding: 0px 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }


    .myCoupons .couponStatus{
        margin-left: auto;
        /*margin-right: 10px;*/
    }
    .myCoupons .unuseClass{
        color: #FF8C34;
        font-size: 14px;
    }
    .myCoupons .usedClass{
        color: #FF3434;
        font-size: 14px;
    }
    .myCoupons .invalidationClass{
        color: #999999;
        font-size: 14px;
    }
    
    .myCoupons .couponLeftBottom{
        color: #999999;
        font-size: 11px;
    }
    .myCoupons .couponLeftTop{
        font-size: 28px;
        color: #FF8C34;
    }
    .myCoupons .couponLeftTopUnit{
        font-size: 14px;
    }
    .myCoupons .couponRightBottom{
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
    .myCoupons .couponRightBottomEnd{
        font-size: 11px;
    }
    .myCoupons .couponRightTop{
        font-size: 14px;
    }
</style>