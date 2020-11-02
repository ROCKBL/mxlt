<template>
	<div class="orderInfo">
		<van-nav-bar title="订单详情"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div class="orderAddress" >
			<div class="blockHead">
  				<div class="blockHeadOrderLabel">订单状态</div>
  				<div class="blockHeadStatus">{{ getStatusStr(orderInfoObj.orderState) }}</div>
  			</div>
  			<div class="divider"></div>
			<div class="blockBodyItem orderAddressItem">
				<!-- <van-image class="orderAddressImg" round src="https://img.yzcdn.cn/vant/cat.jpeg" /> -->
				<van-image class="orderAddressImg" round :src="require('@/assets/imgs/location.png')" />
				<div class="orderAddressContent">
					<div class="orderAddressContentUp">
						<div>{{ orderInfoObj.addressName }}</div>
						<div class="orderAddressContentUpPhone">{{ orderInfoObj.addressPhone }}</div>
					</div>
					<div class="orderAddressContentDown">{{ orderInfoObj.addressDetail }}</div>
				</div>
			</div>
		</div>
		
		<div class="orderDetail">
			<div class="blockHead">
  				<div class="blockHeadOrderLabel">订单信息</div>
  			</div>
  			<div class="divider"></div>
  			<div class="orderItemBody">
  				<div class="orderItemBodyGoods" v-for="goods in orderInfoObj.lines">
  					<van-image :src="goods.goodsImages" class="orderItemBodyGoodsPic" />
  					<div class="orderItemBodyGoodsRight">
  						<div class="orderItemBodyGoodsName">{{ goods.goodsName }}</div>
  						<div style="font-size: 11px;color: #999;">{{ goods.goodsSkuName }}</div>
  						<div class="orderItemBodyGoodsNum">
  							<div class="label">数量</div>
  							<div class="value">X{{ goods.num }}</div>
  						</div>
  						<div class="orderItemBodyGoodsPrice">
  							<div class="label">单价</div>
  							<div class="value">￥{{ goods.goodsPrice }}</div>
  						</div>
  					</div>
  				</div>
  				<div class="orderItemTotal">
  					<div class="orderItemTotalNum">共计{{ orderInfoObj.lines?orderInfoObj.lines.length:0 }}件商品</div>
  					<div class="orderItemTotalDeliverFee">（含运费￥{{ orderInfoObj.freight }}）</div>
  					<div class="orderItemTotalLabel">合计：</div>
  					<div class="orderItemTotalUnit">￥</div>
  					<div class="orderItemTotalMoney">{{ orderInfoObj.money-orderInfoObj.couponPrice }}</div>
  				</div>
  			</div>
  			<div class="divider"></div>
  			<!-- <div class="blockBodyItem moneyRow">
  				<div class="blockBodyItemLabel">余额</div>
  				<div class="blockBodyItemValue">-￥{{ balance }}</div>
  			</div> -->
  		<!-- 	<div class="blockBodyItem moneyRow">
  				<div class="blockBodyItemLabel">实际支付</div>
  				<div class="blockBodyItemValue redValue">￥{{ actualPay }}</div>
  			</div>
  			<div class="divider"></div> -->
  			<div class="blockBodyItem otherInfoRow">
  				<div class="otherInfoRowlabel">订单编号：</div>
  				<div class="otherInfoRowValue" >{{ orderInfoObj.orderNo }}</div>
  			</div>
  			<div class="blockBodyItem otherInfoRow">
  				<div class="otherInfoRowlabel">发货单号：</div>
  				<div class="otherInfoRowValue" v-if="orderInfoObj.expressNumber" >{{ orderInfoObj.expressNumber }}</div>
  				<div class="otherInfoRowValue" v-else >暂无单号</div>
  				<van-button class="copyBtn" round type="default" size="small" color="#333333" plain @click="copyOrderNum(orderInfoObj.expressNumber)">复制单号</van-button>
  			</div>
  			<div class="blockBodyItem otherInfoRow">
  				<div class="otherInfoRowlabel">创建时间：</div>
  				<div class="otherInfoRowValue">{{ new Date(orderInfoObj.createTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>

  			</div>
  			<div class="blockBodyItem otherInfoRow">
  				<div class="otherInfoRowlabel">付款时间：</div>
  				<div class="otherInfoRowValue" v-if="orderInfoObj.payTime">{{ new Date(orderInfoObj.payTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>
  				<div class="otherInfoRowValue" v-else>暂无时间</div>

  			</div>
  			<div class="blockBodyItem otherInfoRow">
  				<div class="otherInfoRowlabel">发货时间：</div>
  				<div class="otherInfoRowValue" v-if="orderInfoObj.deliverTime">{{ new Date(orderInfoObj.deliverTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>
  				<div class="otherInfoRowValue" v-else>暂无时间</div>

  			</div>
  			<div class="blockBodyItem otherInfoRow">
  				<div class="otherInfoRowlabel">完成时间：</div>
  				<div class="otherInfoRowValue" v-if="orderInfoObj.completeTime">{{ new Date(orderInfoObj.completeTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>
  				<div class="otherInfoRowValue" v-else>暂无时间</div>
  			</div>

  			<div class="blockBodyItem otherInfoRow">
  				<div class="otherInfoRowlabel">用户备注：</div>
  				<div class="otherInfoRowValue" >{{ orderInfoObj.remake }}</div>
  			</div>
		</div>


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

import { godetail } from '@/api/goods'

export default {
	name: '',
	store,
	data(){
		return{
			// address:{
			// 	name:"陈某某",
			// 	phone:"13858718329",
			// 	address:"浙江省-温州市-龙湾区浙南云谷X幢"
			// },
			// orderNum:"KB123456789",
			// status:"未支付",
			// goodsList:[
			// 	{name:"【奥昵玻尿酸0.5ml】守护年 轻的秘密",price:"289.00", pic:"https://img.yzcdn.cn/vant/cat.jpeg",number:1},
			// 	{name:"【奥昵玻尿酸0.5ml】守护年 轻的秘密",price:"289.00", pic:"https://img.yzcdn.cn/vant/cat.jpeg",number:1}
			// ],
			// deliverFee:0,
			// totalNum:2,
			// totalprice:"433.44",

			// balance:"0.00",
			// actualPay:"289.00",
			// createdDate:"",

			order:{},
			orderInfoObj:{},

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
        copyOrderNum(num){
        	let transfer = document.createElement('input');
		    document.body.appendChild(transfer);
		    transfer.value = num;  // 这里表示想要复制的内容
		    transfer.focus();
		    transfer.select();
		    if (document.execCommand('copy')) {
		        document.execCommand('copy');
		    }
		    transfer.blur();
		    // console.log('复制成功');
		    document.body.removeChild(transfer);
        },
        getData(){
        	var that=this;
        	godetail({
        		orderNo:this.order.orderNo
        	}).then(function(res){
        		console.log(res)
        		that.orderInfoObj=res.result
        	})
        }
        

	},
	mounted(){

	},
	created(){
		var order=this.$router.currentRoute.query.order
		this.order=JSON.parse(order)
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

    .orderInfo{
    	font-size: 14px;
    	text-align: left;
    }
    .orderInfo .blockBodyItem{
    	display: flex;
    	align-items: center;
    }
    .orderInfo .blockHead{
    	display: flex;
    	align-items: center;
    	padding: 0px 0px 10px 0px;

    }
    .orderInfo .blockHeadStatus{
		margin-left: auto;
		color: #FF3434;
	}
	.orderInfo .blockHeadOrderLabel{
		border-left: 3px solid #F20049;
		padding-left: 5px;
		font-weight: bold;
	}

	.orderInfo .orderAddress{
		width: calc(100% - 20px);
		margin:15px auto;
		border-radius:10px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		padding: 10px;
		box-sizing: border-box;	
	}

	.orderInfo .orderDetail{
		width: calc(100% - 20px);
		margin:15px auto;
		border-radius:10px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		padding: 10px;
		box-sizing: border-box;
	}


	.orderInfo .orderAddressIcon{
		margin-left: auto;
	}
	.orderInfo .orderAddressImg{
		width: 50px;
		height: 50px;
	}
	.orderInfo .orderAddressContent{
		margin-left: 15px;
	}
	.orderInfo .orderAddressContentUp{
		display: flex;
		color: #666666;
		align-items: center;
	}
	.orderInfo .orderAddressContentUpPhone{
		margin-left: 10px;
	}
	.orderInfo .orderAddressContentDown{
		font-size: 11px;
		margin-top: 10px;
	}
	.orderInfo .orderAddressItem{
		padding-top: 10px;
		
	}

	.orderInfo .divider{
		border-top:2px solid rgba(0,0,0,0.1);
	}
	
	.orderInfo .orderItemBodyGoodsRight{
		flex:1;
	}
	.orderInfo .orderItemBody{
		padding: 10px 0px;
	}
	.orderInfo .orderItemBodyGoods{
		display: flex;
		align-items: flex-start;
		margin-bottom: 10px;
	}
	.orderInfo .orderItemBodyGoodsPic{
		width: 80px;
	}
	.orderInfo .orderItemBodyGoodsName{
		/*margin:0px 10px;*/
		margin-right: 10px;
		margin-bottom: 2px;
	}
	.orderInfo .orderItemBodyGoodsPrice{
		color: #FE5050;

	}
	.orderInfo .orderItemBodyGoodsNum,.orderInfo .orderItemBodyGoodsPrice{
		display: flex;
		margin:2px 10px;
		margin-right: 0px;
	}
	.orderInfo .label{
		font-size: 11px;
		color: #333333;
	}
	.orderInfo .value{
		margin-left: auto;
		font-size: 14px;
		color: #333333;
	}
	.orderInfo .orderItemTotal{
		display: flex;
		align-items: center;
		font-size: 11px;
		color: #999999;
		flex:1;
	}
	.orderInfo .orderItemTotalMoney{
		color: #333333;
		font-size: 16px;
	}
	.orderInfo .orderItemTotalUnit{
		color: #333333;
		font-size: 14px;
	}
	.orderInfo .orderItemTotalDeliverFee{
		margin-left: auto;
	}
	.orderInfo .orderItemTotalLabel{
		color: #333333;
	}

	.orderInfo .blockBodyItemLabel{

	}
	.orderInfo .blockBodyItemValue{
		margin-left: auto;
	}
	.orderInfo .moneyRow{
		font-size: 11px;
		margin:10px 0px;
	}
	.orderInfo .redValue{
		color: #FE5050;
		font-size: 16px;
	}

	.orderInfo .otherInfoRow{
		color: #333333;
		font-size: 14px;
		margin:10px 0px;
	}

	.orderInfo .otherInfoRowlabel{
		margin-right: 10px;
	}

	.orderInfo .copyBtn{
		margin-left: auto;
		height: 22px;
	}
</style>