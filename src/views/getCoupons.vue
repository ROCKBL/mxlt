<template>
	<div class="getCoupons">
		<van-nav-bar title="领取优惠券"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		  
        <van-image width="100%" :src="picurl" class="bgimg" />


        <div class="getCouponsListWrap">
            <div class="coupontip">
                <van-image width="40%" :src="tipurl"  />
            </div>
            

            <div class="getCouponsList">
                <div class="base-coupons" v-for="c in showCoupons">
                    <div class="couponLeft">
                        <div class="couponLeftTop"><span class="couponLeftTopUnit">￥</span>{{ c.money }}</div>
                        <div class="couponLeftBottom">满{{ c.monetQuota }}可用</div>
                    </div>
                    <div class="couponRight">
                        <div class="couponRightTop">{{ c.description }}</div>
                        <div class="couponRightBottom">
                            <div class="couponRightBottomEnd"><span>有效期至</span>{{ (new Date(c.endTime)).Format("yyyy-MM-dd hh:mm:ss") }}</div>
                            <!-- <div :class="couponStatusClass(c.status)" class="couponStatus">{{ couponStatus(c.status) }}</div> -->
                            <!-- <van-button round type="warning" size="mini">立即领取</van-button> -->
                            <div class="getCouponsBtn" @click="getCoupon(c)">立即领取</div>
                        </div>
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

// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);

import { cgetCoupon,cpage } from '@/api/coupons'

export default {
	name: '',
	store,
	data(){
		return{
			showCoupons:[
                // { status:"1",date:"2020-05-26 23:59",name:"<限时>  20元新人超大红包",minfee:"50",fee:"20" }
            ],//展示的优惠券
            picurl:require("../assets/imgs/getcouponspagebg.png"),

            tipurl:require("../assets/imgs/coupontip.png"),
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
        // couponStatus(status){
        //     var type="";
        //     switch(status){
        //         case "1":
        //             type="未使用"
        //             break;
        //         case "2":
        //             type="已使用"
        //             break;
        //         case "3":
        //             type="已失效"
        //             break;
        //     }
        //     return type;
        // },
        // couponStatusClass(status){
        //     var type="";
        //     switch(status){
        //         case "1":
        //             type="unuseClass"
        //             break;
        //         case "2":
        //             type="usedClass"
        //             break;
        //         case "3":
        //             type="invalidationClass"
        //             break;
        //     }
        //     return type;
        // },

        init(){
            // this.showCoupons=[].concat(this.unuseCoupons)
        },
        getData(){
            var that=this
            cpage({
                limit:999,
                start:1,
            }).then(function(response){
                // console.log(response)
                that.showCoupons=response.result.items
            })
        },
        getCoupon(c){
            var that=this;
            cgetCoupon({
                id:c.id
            }).then(function(response){
                // console.log(response)
                that.Toast("领取成功")
            })
        }
	},
	mounted(){

	},
	created(){
        this.getData();
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


    .getCoupons{
        text-align: left;
    }

    .getCoupons .bgimg{
        z-index: -1;
    }

    .getCoupons .getCouponsListWrap{
        border-radius: 20px 20px 0px 0px;
        margin-top: -100px;
        background-color: white;
        min-height: 50vh
    }
    .getCoupons .getCouponsList{
        width: calc(100% - 30px);
        margin:0px auto;
        box-sizing: border-box;
        
    }

    .getCoupons .base-coupons {
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
        margin-bottom: 10px;
    }
    .getCoupons .base-coupons::before {
        content: '';
        height: 70px;
        border: 1px dashed rgba(0,0,0,0.2);
        position: absolute;
        left: 90px;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .getCoupons .couponLeft{
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

    .getCoupons .couponRight{
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


    .getCoupons .couponStatus{
        margin-left: auto;
        /*margin-right: 10px;*/
    }
    .getCoupons .unuseClass{
        color: #FF8C34;
        font-size: 14px;
    }
    .getCoupons .usedClass{
        color: #FF3434;
        font-size: 14px;
    }
    .getCoupons .invalidationClass{
        color: #999999;
        font-size: 14px;
    }
    
    .getCoupons .couponLeftBottom{
        color: #999999;
        font-size: 11px;
    }
    .getCoupons .couponLeftTop{
        font-size: 28px;
        color: #FF8C34;
    }
    .getCoupons .couponLeftTopUnit{
        font-size: 14px;
    }
    .getCoupons .couponRightBottom{
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
    .getCoupons .couponRightBottomEnd{
        font-size: 11px;
    }
    .getCoupons .couponRightTop{
        font-size: 14px;
    }

    .getCoupons .getCouponsBtn{
        margin-left: auto;
        background: #FF8C34;
        font-size: 12px;
        color: #FFFFFF;
        border-radius: 20px;
        padding: 4px 10px;
    }

    .getCoupons .coupontip{
        padding:10px 0px;
        display: flex;
        justify-content: center;
    }
</style>