<template>
	<div class="createGoodsOrder">
		<van-nav-bar title="确认订单"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="addressItem" @click="showAddressList">
			<van-image class="addressItemImg" round :src="require('@/assets/imgs/location.png')" />
			<div class="addressItemContent" v-if="address.id">
				<div class="addressItemContentUp">
					<div>{{ address.name }}</div>
					<div class="addressItemContentUpPhone">{{ address.phone }}</div>
				</div>
				<div class="addressItemContentDown">{{ address.province }}-{{ address.city }}-{{ address.area }}{{ address.address }}</div>
			</div>
			<div class="addressItemContent" v-else>
				请选择配送地址
			</div>

			<van-icon class="addressItemBtn" name="arrow" />
		</div>

		<div class="goodsItem">
			<div  v-for="(goods,index) in goodsList">
				<div class="goodsRow">
					<van-image class="goodsImg" width="50" height="50" :src="goods.goodsImage"  />
					<div class="goodsWrap">
						<div class="goodsName">{{ goods.goodsName }}</div>
		                <div style="color: #999;font-size: 11px;">{{ getSkuName(goods.specName) }}</div>
						<div class="goodsBottomRow">
							<div class="goodsPrice" style="text-decoration: line-through;">优惠单价￥{{ (goods.goodsPrice).toFixed(2) }}</div>
							<div class="goodsNum">折后单价￥{{ (goods.goodsPrice*userInfo.discount).toFixed(2) }}</div>
						</div>
                        <div class="goodsBottomRow">
                            <div class="goodsPrice">数量</div>
                            <div class="goodsNum">x{{ goods.num }}</div>
                        </div>
					</div>
				</div>
				

				<div class="bottomLine" v-if="index!=goodsList.length-1"></div>
			</div>
		</div>

		<div class="feeItem">
			<van-cell-group>
			  	<van-cell title="邮费" :value="shippingFee" />
			  	<van-cell title="优惠券" is-link @click="showCouponList" :value="couponFee" />
			  	<van-cell title="使用积分" >
				  	<template #right-icon>
				  		<span style="font-size: 12px;color: #999;margin-right: 5px;">有{{ jifen }}积分可用</span>
				    	<van-icon class="checkIntegralIs" name="checked" @click="notuseIntegralIs" v-if="form.integralIs" />
						<van-icon class="uncheckIntegralIs" name="circle" @click="useIntegralIs"  v-else />
				  	</template>
				</van-cell>
			  	<van-cell title="总订单金额" :value="goodsFee" />
			</van-cell-group>
		</div>

		<van-field v-model="form.remake" rows="4" autosize label="备注" type="textarea" placeholder="请输入备注" />

		<van-submit-bar class="submitRow" :price="totalMoney" button-text="提交订单" @submit="onSubmit" />




		<!-- 地址弹窗 -->
		<van-popup v-model="addressShow" position="bottom" :style="{ maxHeight: '40%' }" >
			<div class="popAddressItem" v-for="item in addressList" @click="chooseAddress(item)">
				<van-image class="popAddressItemImg" round :src="require('@/assets/imgs/location.png')" />
				<div class="popAddressItemright">
					<div class="popAddressItemUp">
						<div>{{ item.name }}</div>
						<div class="popAddressItemPhone">{{ item.phone }}</div>
					</div>
					<div class="popAddressItemDown">{{ item.province }}-{{ item.city }}-{{ item.area }}{{ item.address }}</div>
				</div>

				
			</div>
			<div style="text-align: center;padding: 10px;" @click="addAddress">+新增地址</div>
		</van-popup>

		<!-- 优惠券弹窗 -->
		<van-popup v-model="couponShow" position="bottom" :style="{ maxHeight: '70%' }" >
			<!-- <div class="popCouponItem" v-if="couponList.length>0" @click="notUseCoupon">不使用优惠券</div> -->
			<div class="popCouponItem" v-for="item in couponList" @click="chooseCoupon(item)">
				<div class="popCouponItemLeft">
					<div class="popCouponItemmoney">￥{{ item.money }}</div>
					<div class="popCouponItemmoneyQuota">满{{ item.moneyQuota }}可用</div>
				</div>
				<div class="popCouponItemMid">
					<div class="popCouponItemdescription">{{ item.description }}</div>
					<div class="popCouponItemexpirationTime">有效期至{{ new Date(item.expirationTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>
				</div>
				<van-icon class="popCouponItemRight checkedStatus" name="checked" v-if="coupon.id==item.id" />
				<van-icon class="popCouponItemRight" name="circle" v-if="coupon.id!=item.id"/>
			</div>

			<van-button class="popCouponItemBtn" type="danger" v-if="couponList.length>0" @click="notUseCoupon">不使用优惠券</van-button>
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
// import { Dialog } from 'vant';

// Vue.use(Vant);
// Vue.use(Dialog);
import { amyPage } from '@/api/address'
import { cmyPage } from '@/api/coupons'

import { goconfirmOrder,gocreateOrder } from '@/api/goods'

import { mapState } from 'vuex'

import { gcartdelete } from '@/api/cart'

// import { SubmitBar } from 'vant';
// Vue.use(SubmitBar);

export default {
	name: '',
	store,
	data(){
		return{
			form:{
				skus:{},
				couponIs:false,
				couponId:null,
				integralIs:false,
				addressId:null,
				remake:"",//备注
			},//提交的表单
			goodsList:[],//商品列表
			address:{},//选择的地址信息
			addressList:[],
			addressShow:false,
			shipping:0,//运费
			coupon:{},//使用的优惠券
			couponList:[],//未使用的优惠券列表
			couponShow:false,

			jifenfee:0,//积分抵扣的钱
			jifen:0,//使用的积分
			goodsMoney:0,
		}
	},
	computed:{
		...mapState({
            userInfo(state){ return state.userInfo},
        }),
        shippingFee(){
        	return "￥"+this.shipping
        },
        couponFee(){
        	if(this.coupon.id){
        		return "-￥"+this.coupon.money
        	}
        	return "有"+this.couponList.length+"张可用"
        },
        goodsFee(){
        	// var total=0
        	// for(var i=0;i<this.goodsList.length;i++){
        	// 	total+=this.goodsList[i].num*this.goodsList[i].goodsPrice
        	// }
        	// return "￥"+total

        	return "￥"+this.goodsMoney*this.userInfo.discount
        },
        totalMoney(){
        	var total=0
        	for(var i=0;i<this.goodsList.length;i++){
        		total+=this.goodsList[i].num*this.goodsList[i].goodsPrice*this.userInfo.discount
        	}
        	if(this.coupon.id){
        		total-=this.coupon.money
        	}
        	total+=this.shipping
        	if(this.form.integralIs){
        		total-=this.jifenfee
        	}
        	if(total<0){
                total=0
            }
        	total*=100
        	return total
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
        getSkuName(o){
            var name=""
            var ar=[];
            for(var s in o){
                ar.push(s+"："+o[s])
            }
            name=ar.join("，")
            return name
        },
        addAddress(){
        	this.$router.push("/addAddress")
        },
        showAddressList(){
        	this.addressShow=true
        },
        chooseAddress(address){
        	this.address=address
        	this.form.addressId=address.id
        	this.addressShow=false
        	this.getInfo()
        },
        showCouponList(){
            if(this.couponList.length==0){
                return
            }
        	this.couponShow=true
        },
        chooseCoupon(coupon){
        	this.coupon=coupon
        	this.form.couponId=coupon.id
        	this.form.couponIs=true
        	this.couponShow=false
        },
        notUseCoupon(){
        	this.coupon={}
        	this.form.couponId=null
        	this.form.couponIs=false
        	this.couponShow=false
        },
        useIntegralIs(){
        	this.form.integralIs=true
        	this.getInfo()
        },
        notuseIntegralIs(){
        	this.form.integralIs=false
        	this.getInfo()
        },
        getInfo(){
        	var that=this
        	var data={
        		addressId:this.form.addressId,
        		// integralIs:this.form.integralIs,
        		skus:this.form.skus
        	}
        	goconfirmOrder(data).then(function(res){
        		// console.log(res)
        		
        		that.jifenfee=res.result.integralMoney
        		that.jifen=res.result.integral
        		that.shipping=res.result.freight
        		that.goodsMoney=res.result.money

        	}).catch(function(e){
        		// console.log(String(e))
        		if(String(e)=="Error: 订单地址地区没有暂时配送"){
        			that.address={};
        			that.form.addressId=null
        		}

        		
        	})
        },
        getData(){
        	// 获取优惠券列表，获取地址列表
        	var that=this;
        	amyPage({
	    		start:1,
	    		limit:9999,
	    		consumerId:this.userInfo.id
	    	}).then(function(response){
	    		// console.log(response)
	    		that.addressList=response.result.items
	    		for(var i=0;i<that.addressList.length;i++){
	    			if(that.addressList[i].defaultIs){
	    				that.address=that.addressList[i]
	    				that.form.addressId=that.addressList[i].id
	    			}
	    		}
	    		if(that.address.id){
	    			// 获取运费
	    			that.getInfo()
	    		}
	    	})

            var money=0;
            for(var i=0;i<this.goodsList.length;i++){
                money+=this.goodsList[i].num*this.goodsList[i].goodsPrice
            }
	    	cmyPage({
                start:1,
                limit:999,
                consumerId:this.userInfo.id,
                state:"NOT_USE"
            }).then(function(response){
                // console.log(response)
                that.couponList=response.result.items.filter(function(o){
                    return o.moneyQuota<=money
                })
            })

        },
        onSubmit(){
        	var that=this;
        	if(this.form.addressId==null){
        		this.Toast("请选择配送地址")
        		return
        	}

        	// console.log(this.form)
        	gocreateOrder(this.form).then(function(res){
        		// console.log(res)
        		var rtn=res.result

                that.deleteCart()
                
        		wx.chooseWXPay({
		            timestamp: rtn.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		            nonceStr: rtn.nonceStr, // 支付签名随机串，不长于 32 位
		            package: rtn.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
		            signType: rtn.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		            paySign: rtn.paySign, // 支付签名
		            success: function (res) {
		              	console.log(res)
		              	// 支付成功后的回调函数

		              	// 跳转支付成功页面
		              	// that.$router.replace("/successPay")
		              	// that.$router.go(-1)
                        that.$router.replace({
                            name:"orderList",
                            query:{name:"待发货"}
                        })
		            },
		            cancel:function(){
		            	// that.$router.replace("/myOrder")

		            	// that.$router.push({
			            //     name: 'myOrder',
			            // });
                        that.$router.replace({
                            name:"orderList",
                            query:{name:"待付款"}
                        })
		            }
		        });

        	})
        },
        deleteCart(){
            // console.log(this.goodsList)
            if(!this.goodsList[0].id){
                return
            }
            var that=this;
            var ar=this.goodsList.map(function(o){
                return o.id
            })
            gcartdelete({
                // ids:JSON.stringify(ar)
                ids:ar.join(",")
            }).then(function(res){

            })
        }
	},
	mounted(){

	},
	created(){
		var that=this;

		var goods=this.$router.currentRoute.query.goods
		this.goodsList=JSON.parse(goods)
		
        // console.log(this.goodsList)

		for(var i=0;i<this.goodsList.length;i++){
			this.form.skus[this.goodsList[i].goodSpecId]=this.goodsList[i].num
		}

		store.state.userPromiseFlag.then(function(){
			that.getData()

            // console.log(that.userInfo)
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

    .createGoodsOrder{
    	text-align: left;
    }

    .createGoodsOrder .addressItem{
    	display: flex;
    	align-items: center;
    	width: calc(100% - 30px);
    	margin: 10px auto;
    	border-radius: 10px;
    	padding: 10px;
    	box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    	box-sizing: border-box;
    }
    .createGoodsOrder .addressItemContent{
    	margin-left: 10px;
    }
    .createGoodsOrder .addressItemContentUp{
    	display: flex;
    	align-items: center;
    	line-height: 24px;
    }
    .createGoodsOrder .addressItemContentDown{
    	font-size: 12px;
    	color: #999;
    	margin-top: 10px;
    }
    .createGoodsOrder .addressItemContentUpPhone{
    	margin-left: 10px;
    }
    .createGoodsOrder .addressItemBtn{
    	margin-left: auto;
    }

    .createGoodsOrder .popAddressItem{
    	border-bottom: 1px solid rgba(0,0,0,0.1);
    	padding: 5px 10px;
    	text-align: left;
    	display: flex;
    	align-items: center;
    }
    .createGoodsOrder .popAddressItemUp{
    	display: flex;
    	align-items: center;
    	line-height: 20px;
    }
    .createGoodsOrder .popAddressItemDown{
    	font-size: 12px;
    	color: #999;
    	margin-top: 5px;
    }
    .createGoodsOrder .popAddressItemPhone{
    	margin-left: 10px;
    }
    .createGoodsOrder .popAddressItemright{
    	margin-left: 10px;
    }

    .createGoodsOrder .popCouponItem{
    	display: flex;
    	align-items: center;
    	border-bottom: 1px solid rgba(0,0,0,0.1);
    	padding: 10px 10px;
    }
    .createGoodsOrder .popCouponItemLeft{

    }
    .createGoodsOrder .popCouponItemMid{
    	margin-left: 10px;
    }
    .createGoodsOrder .popCouponItemRight{
    	margin-left: auto;
    	font-size: 20px;

    }
    .createGoodsOrder .checkedStatus{
    	color: #FF8C34;
    }

    .createGoodsOrder .popCouponItemmoney{
    	margin-bottom: 10px;
    	font-size: 16px;
    	color: #FF8C34;
    	line-height: 16px;
    }
    .createGoodsOrder .popCouponItemmoneyQuota{
    	color:#999;
    	font-size: 12px;
    }
    .createGoodsOrder .popCouponItemdescription{
    	font-size: 14px;
    	margin-bottom: 10px;
    	line-height: 16px;
    }
    .createGoodsOrder .popCouponItemexpirationTime{
    	font-size: 12px;
    }
    .createGoodsOrder .popCouponItemBtn{
    	width: 100%;
    }

    .createGoodsOrder .checkIntegralIs{
    	font-size: 20px;
    	color: #FF8C34;
    }
    .createGoodsOrder .uncheckIntegralIs{
    	font-size: 20px;
    }

    .createGoodsOrder .submitRow{
    	border-top: 1px solid rgba(0,0,0,0.1)
    }


    .createGoodsOrder .goodsItem{
    	width: calc(100% - 30px);
    	margin: 0px auto;
    	margin-bottom: 10px;
    	border-radius: 10px;
    	padding: 10px;
    	box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    	box-sizing: border-box;
    }
    .createGoodsOrder .goodsRow{
    	display: flex;
    	align-items: center;
    	padding: 5px 0px;
    }
    .createGoodsOrder .goodsWrap{
    	margin-left: 10px;
    	flex-grow: 1;
    }
    .createGoodsOrder .goodsName{
    	font-size: 13px;
    	margin-bottom: 2px;
    }
    .createGoodsOrder .goodsBottomRow{
    	display: flex;
    	align-items: center;
    	margin-top: 10px;
    }
    .createGoodsOrder .goodsNum{
    	margin-left: auto;
    	font-size: 12px;
    }
    .createGoodsOrder .goodsPrice{
    	font-size: 12px;
    }
    .createGoodsOrder .bottomLine{
    	border-bottom: 1px solid rgba(0,0,0,0.1);
    	width: 100%;
    }
</style>