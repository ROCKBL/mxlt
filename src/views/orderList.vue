<template>
	<div class="orderList">
		<van-nav-bar title="订单"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		<van-tabs v-model="active" color="#FF8C34" title-active-color="#FF8C34" title-inactive-color="#999999" @click="onTabsClick">
		  	<van-tab title="全部">
		  		<!-- <div v-for="order in orderList" class="orderItem" @click="seeOrderDetail(order)">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNum }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<div class="orderItemBodyGoods" v-for="goods in order.goodsList">
		  					<van-image :src="goods.pic" class="orderItemBodyGoodsPic" />
		  					<div class="">
		  						<div class="orderItemBodyGoodsName">{{ goods.name }}</div>
		  						<div class="orderItemBodyGoodsNum">
		  							<div class="label">数量</div>
		  							<div class="value">X{{ goods.number }}</div>
		  						</div>
		  						<div class="orderItemBodyGoodsPrice">
		  							<div class="label">单价</div>
		  							<div class="value">￥{{ goods.price }}</div>
		  						</div>
		  					</div>
		  				</div>
		  				<div class="orderItemTotal">
		  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
		  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
		  					<div class="orderItemTotalLabel">合计：</div>
		  					<div class="orderItemTotalUnit">￥</div>
		  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
		  				</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<van-button class="orderItemFootButton orderItemFootButtonleft" round type="default" size="small" color="#FF8C34" plain @click="payOrder(order)">立即支付</van-button>
		  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="removeOrder(order)">删除订单</van-button>
		  			</div>
		  		</div> -->
		  	</van-tab>
		  	<van-tab title="待付款">
				<!-- <div v-for="order in orderList" class="orderItem" @click="seeOrderDetail(order)">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNum }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<div class="orderItemBodyGoods" v-for="goods in order.goodsList">
		  					<van-image :src="goods.pic" class="orderItemBodyGoodsPic" />
		  					<div class="">
		  						<div class="orderItemBodyGoodsName">{{ goods.name }}</div>
		  						<div class="orderItemBodyGoodsNum">
		  							<div class="label">数量</div>
		  							<div class="value">X{{ goods.number }}</div>
		  						</div>
		  						<div class="orderItemBodyGoodsPrice">
		  							<div class="label">单价</div>
		  							<div class="value">￥{{ goods.price }}</div>
		  						</div>
		  					</div>
		  				</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<div class="orderItemTotal">
		  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
		  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
		  					<div class="orderItemTotalLabel">合计：</div>
		  					<div class="orderItemTotalUnit">￥</div>
		  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
		  				</div>
		  			</div>
		  		</div> -->
		  	</van-tab>
		  	<van-tab title="待发货">
				<!-- <div v-for="order in orderList" class="orderItem" @click="seeOrderDetail(order)">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNum }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<div class="orderItemBodyGoods" v-for="goods in order.goodsList">
		  					<van-image :src="goods.pic" class="orderItemBodyGoodsPic" />
		  					<div class="">
		  						<div class="orderItemBodyGoodsName">{{ goods.name }}</div>
		  						<div class="orderItemBodyGoodsNum">
		  							<div class="label">数量</div>
		  							<div class="value">X{{ goods.number }}</div>
		  						</div>
		  						<div class="orderItemBodyGoodsPrice">
		  							<div class="label">单价</div>
		  							<div class="value">￥{{ goods.price }}</div>
		  						</div>
		  					</div>
		  				</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<div class="orderItemTotal">
		  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
		  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
		  					<div class="orderItemTotalLabel">合计：</div>
		  					<div class="orderItemTotalUnit">￥</div>
		  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
		  				</div>
		  			</div>
		  		</div> -->
		  	</van-tab>
		  	<van-tab title="待收货">
				<!-- <div v-for="order in orderList" class="orderItem" @click="seeOrderDetail(order)">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNum }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<div class="orderItemBodyGoods" v-for="goods in order.goodsList">
		  					<van-image :src="goods.pic" class="orderItemBodyGoodsPic" />
		  					<div class="">
		  						<div class="orderItemBodyGoodsName">{{ goods.name }}</div>
		  						<div class="orderItemBodyGoodsNum">
		  							<div class="label">数量</div>
		  							<div class="value">X{{ goods.number }}</div>
		  						</div>
		  						<div class="orderItemBodyGoodsPrice">
		  							<div class="label">单价</div>
		  							<div class="value">￥{{ goods.price }}</div>
		  						</div>
		  					</div>
		  				</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<div class="orderItemTotal">
		  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
		  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
		  					<div class="orderItemTotalLabel">合计：</div>
		  					<div class="orderItemTotalUnit">￥</div>
		  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
		  				</div>
		  			</div>
		  		</div> -->
		  	</van-tab>
		  	<van-tab title="已完成">
				<!-- <div v-for="order in orderList" class="orderItem" @click="seeOrderDetail(order)">
		  			<div class="orderItemHead">
		  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNum }}</div>
		  				<div class="orderItemHeadStatus">{{ order.status }}</div>
		  			</div>
		  			<div class="orderItemBody">
		  				<div class="orderItemBodyGoods" v-for="goods in order.goodsList">
		  					<van-image :src="goods.pic" class="orderItemBodyGoodsPic" />
		  					<div class="">
		  						<div class="orderItemBodyGoodsName">{{ goods.name }}</div>
		  						<div class="orderItemBodyGoodsNum">
		  							<div class="label">数量</div>
		  							<div class="value">X{{ goods.number }}</div>
		  						</div>
		  						<div class="orderItemBodyGoodsPrice">
		  							<div class="label">单价</div>
		  							<div class="value">￥{{ goods.price }}</div>
		  						</div>
		  					</div>
		  				</div>

		  				<div class="orderItemTotal">
		  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
		  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
		  					<div class="orderItemTotalLabel">合计：</div>
		  					<div class="orderItemTotalUnit">￥</div>
		  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
		  				</div>
		  			</div>
		  			<div class="orderItemFoot">
		  				<van-button class="orderItemFootButton orderItemFootButtonleft" round type="default" size="small" color="#FF8C34" plain @click="appraiseOrder(order)">去评价</van-button>
		  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="removeOrder(order)">删除订单</van-button>
		  			</div>
		  		</div> -->
		  	</van-tab>
		</van-tabs>

		<van-list class="orderListWrap" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div v-for="order in orderList" class="orderItem" >
	  			<div class="orderItemHead" @click="seeOrderDetail(order)">
	  				<div class="orderItemHeadOrderNum">订单编号：{{ order.orderNo }}</div>
	  				<div class="orderItemHeadStatus">{{ getStatusStr(order.orderState) }}</div>
	  			</div>
	  			<div class="orderItemBody">
	  				<div class="orderItemBodyGoods" v-for="goods in order.lines">
	  					<van-image :src="goods.goodsImages" class="orderItemBodyGoodsPic" />
	  					<div class="" style="flex-grow: 1">
	  						<div class="orderItemBodyGoodsName">{{ goods.goodsName }}</div>
	  						<div style="font-size: 11px;color: #999;">{{ goods.goodsSkuName }}</div>
	  						<div class="orderItemBodyGoodsNum">
	  							<div class="label">数量</div>
	  							<div class="value">X{{ goods.num }}</div>
	  						</div>
	  						<div class="orderItemBodyGoodsPrice">
	  							<div class="label">折后单价</div>
	  							<div class="value">￥{{ (goods.goodsPrice*order.discount).toFixed(2) }}</div>
	  						</div>
	  					</div>
	  				</div>
	  				<div class="orderItemTotal">
	  					<div class="orderItemTotalNum">共计{{ order.lines.length }}件商品</div>
	  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.freight }}）</div>
	  					<div class="orderItemTotalLabel">合计：</div>
	  					<div class="orderItemTotalUnit">￥</div>
	  					<div class="orderItemTotalMoney">{{ order.money-order.couponPrice-order.integralMoney+order.freight }}</div>
	  				</div>
	  			</div>
	  			<div class="orderItemFoot" v-if="order.orderState==0">
	  				<van-button class="orderItemFootButton orderItemFootButtonleft" round type="default" size="small" color="#FF8C34" plain @click="payOrder(order)">立即支付</van-button>
	  				<van-button class="orderItemFootButton" round type="default" size="small" color="#333333" plain @click="removeOrder(order)">删除订单</van-button>
	  			</div>
	  			<!-- <div class="orderItemFoot" v-if="active==1||active==2||active==3">
	  				<div class="orderItemTotal">
	  					<div class="orderItemTotalNum">共计{{ order.totalNum }}件商品</div>
	  					<div class="orderItemTotalDeliverFee">（含运费￥{{ order.deliverFee }}）</div>
	  					<div class="orderItemTotalLabel">合计：</div>
	  					<div class="orderItemTotalUnit">￥</div>
	  					<div class="orderItemTotalMoney">{{ order.totalprice }}</div>
	  				</div>
	  			</div> -->

	  			<div class="orderItemFoot" v-if="order.orderState==2">
	  				<van-button class="orderItemFootButton orderItemFootButtonleft" round type="primary" size="small"  plain @click="confirmOrder(order)">确认收货</van-button>
	  			</div>

	  			<div class="orderItemFoot" v-if="order.orderState==3">
	  				<!-- <van-button class="orderItemFootButton orderItemFootButtonleft" round type="default" size="small" color="#FF8C34" plain @click="appraiseOrder(order)">去评价</van-button> -->
	  				<van-button class="orderItemFootButton orderItemFootButtonleft" round type="default" size="small" color="#333333" plain @click="removeOrder(order)">删除订单</van-button>
	  			</div>
	  		</div>
  		</van-list>

		<van-empty v-if="orderList.length==0" class="emptyImg" :image="emptyImg" description="您还没有相关订单"/>
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
	import { gomyPage,godelete,gosendPay,goorderStateConfirm } from '@/api/goods'

export default {
	name: '',
	store,
	data(){
		return{
			active:0,
			orderList:[
				// {orderNum:"KB123456789",status:"未支付",id:1,deliverFee:0,totalNum:2,totalprice:"433.44",goodsList:[
				// 	{name:"【奥昵玻尿酸0.5ml】守护年 轻的秘密",price:"289.00", pic:"https://img.yzcdn.cn/vant/cat.jpeg",number:1},
				// 	{name:"【奥昵玻尿酸0.5ml】守护年 轻的秘密",price:"289.00", pic:"https://img.yzcdn.cn/vant/cat.jpeg",number:1}
				// ]}
			],//多个Tab共用一个数组

			emptyImg:require("../assets/imgs/empty.png"),

			loading:true,
            finished:false,
            pageNum:1,
            total:0,
		}
	},
	computed:{
		
	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		getStatusStr(status){
			var name=""
			switch(status){
				case 0:
					name="未支付"
					break
				case 1:
					name="待发货"
					break
				case 2:
					name="待收货"
					break
				case 3:
					name="已完成"
					break
			}
			return name
		},
		onClickLeft(){
            this.$router.go(-1)
        },
        onTabsClick(name, title){
        	// console.log(name,"xx" ,title)
        	// 服务器获取订单数据
        	var that=this;
            this.orderList.length=0;
            this.pageNum=1;
            this.getData().then(function(){
                that.loading=false
                if(that.orderList.length==that.total){
                    that.finished=true
                    return
                }
            })
        },
        removeOrder(order){
        	var that=this;
        	// 删除订单
        	godelete({
        		orderNo:order.orderNo
        	}).then(function(res){
        		// console.log(res)

        		that.onTabsClick()
        		// that.orderList.length=0;
        		// that.pageNum=1;
        		// that.getData().then(function(){
		        //     that.loading=false
		        //     if(that.orderList.length==that.total){
		        //         that.finished=true
		        //         return
		        //     }
		        // })

        	})
        },
        confirmOrder(order){
        	// 确认订单
        	var that=this;
        	goorderStateConfirm({
        		orderNo:order.orderNo
        	}).then(function(res){
        		// console.log(res)
        		// that.Toast("确认收货成功")
        		that.onTabsClick()
        	})
        },
        appraiseOrder(order){
        	// 评价订单
        },
        payOrder(order){
        	// 立即支付
        	gosendPay({
        		orderNo:order.orderNo
        	}).then(function(res){
        		console.log(res)
        		var rtn=res.result
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
		              	that.$router.go(-1)
		            },
		            cancel:function(){
		            	// that.$router.replace("/myOrder")

		            	// that.$router.push({
			            //     name: 'myOrder',
			            // });
		            }
		        });
        	})
        },
        getData(pageNum){
        	var that=this;
        	var data={
        		limit:10,
        		start:pageNum||1,
        		// orderState
        	}
        	switch(this.active){
        		case 0:
					break;
				case 1:
					data.orderState=0;
					break;
				case 2:
					data.orderState=1;
					break;
				case 3:
					data.orderState=2;
					break;
				case 4:
					data.orderState=3;
					break;
        	}
        	return gomyPage(data).then(function(response){
        		// console.log(response)
        		that.total=response.result.total
                that.orderList=that.orderList.concat(response.result.items)
        	})
        },
        onLoad(){
            // 列表下拉加载

            var that=this;
            this.pageNum+=1;
            this.getData(this.pageNum).then(function(){
                that.loading=false
                if(that.orderList.length==that.total){
                    that.finished=true
                    return
                }
            });

        },

        seeOrderDetail(order){
        	this.$router.push({
	    		name:"orderInfo",
	    		query:{
	    			order:JSON.stringify(order)
	    		}
	    	})
        }
	},
	mounted(){

	},
	created(){
		var name=this.$router.currentRoute.query.name
		switch(name){
			case "全部订单":
				this.active=0;
				break;
			case "待付款":
				this.active=1;
				break;
			case "待发货":
				this.active=2;
				break;
			case "待收货":
				this.active=3;
				break;
			case "待评价":
				this.active=4;
				break;
		}

		var that=this
		this.getData().then(function(){
            that.loading=false
            if(that.orderList.length==that.total){
                that.finished=true
                return
            }
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
	
	.orderList{
		font-size: 14px;
	}
	.orderList .orderItem{
		border-radius:10px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		width: calc(100% - 30px);
		margin:10px auto;
	}
	
	.orderList .orderItemHead{
		display: flex;
		align-items: center;
		padding: 10px;
	}
	.orderList .orderItemHeadOrderNum{
		border-left: 3px solid #F20049;
		padding-left: 5px;
	}
	.orderList .orderItemHeadStatus{
		margin-left: auto;
		color: #FF3434;
	}
	.orderList .orderItemFoot{
		display: flex;
		border-top:1px solid rgba(0,0,0,.1);
		padding: 10px;
	}
	.orderList .orderItemFootButton{
		/*margin:0px 10px;*/
		margin-right: 10px;
	}
	.orderList .orderItemFootButtonleft{
		margin-left: auto;
	}
	
	
	.orderList .orderItemBody{
		/*display: flex;*/
		padding: 10px;
		text-align: left;
	}
	.orderList .orderItemBodyGoods{
		display: flex;
		align-items: flex-start;
		margin-bottom: 10px;
	}
	.orderList .orderItemBodyGoodsPic{
		width: 80px;
	}
	.orderList .orderItemBodyGoodsName{
		/*margin:0px 10px;*/
		margin-right: 10px;
		margin-bottom: 2px;
	}
	.orderList .orderItemBodyGoodsPrice{
		color: #FE5050;

	}
	.orderList .orderItemBodyGoodsNum,.orderList .orderItemBodyGoodsPrice{
		display: flex;
		margin:2px 10px;
		margin-right: 0px;
		line-height: 20px;
	}
	.orderList .label{
		font-size: 11px;
		color: #333333;
	}
	.orderList .value{
		margin-left: auto;
		font-size: 14px;
		color: #333333;
	}

	.orderList .emptyImg .van-empty__image{
		width: 100px;
		height: 100px;
		background-color: #FFE8D6;
		border-radius: 50%;

	}

	.orderList .orderItemTotal{
		display: flex;
		align-items: center;
		font-size: 11px;
		color: #999999;
		flex:1;
	}
	.orderList .orderItemTotalMoney{
		font-weight: bold;
		color: #FE5050;
		font-size: 16px;
	}
	.orderList .orderItemTotalUnit{
		color: #FF3434;
		font-size: 14px;
		font-weight: bold;
	}
	.orderList .orderItemTotalDeliverFee{
		margin-left: auto;
	}
	.orderList .orderItemTotalLabel{
		color: #333333;
	}
</style>