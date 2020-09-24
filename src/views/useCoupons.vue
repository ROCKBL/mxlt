<template>
	<div class="useCoupons">
		<van-nav-bar title="优惠券"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
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
                        <div class="couponBtn" @click="useCoupon(c.id)">立即使用</div>
                    </div>
                </div>
                <div class="couponMask" v-if="orderMoney<c.minfee"></div>
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
            orderMoney:55.88,//订单金额
			showCoupons:[
                { id:"1",status:"1",date:"2020-05-26 23：59",name:"<限时>  20元新人超大红包",minfee:"50",fee:"20" },
                { id:"2",status:"1",date:"2020-05-26 23：59",name:"<限时>  20元新人超大红包",minfee:"150",fee:"20" }
            ],//展示的优惠券
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
        useCoupon(){
            // 使用优惠券
        },
        init(){

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


    .useCoupons{
        text-align: left;
    }

    .useCoupons .myCouponsList{
        width: calc(100% - 30px);
        margin:0px auto;
        box-sizing: border-box;
    }

    .useCoupons .base-coupons {
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
    .useCoupons .base-coupons::before {
        content: '';
        height: 70px;
        border: 1px dashed rgba(0,0,0,0.2);
        position: absolute;
        left: 90px;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .useCoupons .couponLeft{
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

    .useCoupons .couponRight{
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

    .useCoupons .couponBtn{
        margin-left: auto;
        font-size: 14px;
        color: #FF8C34;
    }

    .useCoupons .couponLeftBottom{
        color: #999999;
        font-size: 11px;
    }
    .useCoupons .couponLeftTop{
        font-size: 28px;
        color: #FF8C34;
    }
    .useCoupons .couponLeftTopUnit{
        font-size: 14px;
    }
    .useCoupons .couponRightBottom{
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
    .useCoupons .couponRightBottomEnd{
        font-size: 11px;
    }
    .useCoupons .couponRightTop{
        font-size: 14px;
    }

    .useCoupons .couponMask{
        position: absolute;
        left: 0px;
        top: 0px;
        background-color: rgba(255,255,255,0.8);
        width: 100%;
        height: 80px;
        border-radius: 5px;
        z-index: 99;

    }
</style>