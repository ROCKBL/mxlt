<template>
	<div class="goodsInfo">
		<van-nav-bar :title="productName"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div>
			<van-swipe @change="onChange" class="productInfoSwipe">
			  	<van-swipe-item v-for="pic in pics">
			  		<van-image width="100%"  :src="pic" />
			  	</van-swipe-item>
			  	
			  	<template #indicator>
			    	<div class="custom-indicator">
			      	{{ current + 1 }}/{{ pics.length }}
			    	</div>
			  	</template>
			</van-swipe>
			
			<div class="goodsInfoItem marginRow">
				<div class="goodsPrice">
					<div class="goodsPriceNewWrap">
						<div class="goodsPriceUnit">￥</div>
						<div class="goodsPriceNew">289.00</div>
					</div>
					<div class="grayWords goodsPriceOld">289.00</div>
				</div>
				<div class="productName marginRow">【奥昵玻尿酸0.5ml】守护年轻的秘密</div>
				<div class="grayWords grayLine">
					<van-icon name="location-o" class="grayLineIcon" />
					<div class="grayLineQG">全国</div>
					<div class="grayLineFEE">快递：0</div>
					<div class="grayLineCOUNT">销售0</div>
				</div>
			</div>
			
			<van-divider class="goodsInfoItemDivider" />
			<div class="goodsInfoItem">
				<div class="goodsInfoItemCell" @click="showGoodsSize">
					<div class="goodsInfoItemCellLabel">选择</div>
					<div class="goodsInfoItemCellInput">选择商品规格</div>
					<van-icon class="goodsInfoItemCellIcon" name="arrow" />
				</div>
				<div class="goodsInfoItemCell" @click="showParams">
					<div class="goodsInfoItemCellLabel">参数</div>
					<div class="goodsInfoItemCellInput">无参数</div>
					<van-icon class="goodsInfoItemCellIcon" name="arrow" />
				</div>
			</div>
			<!-- <van-divider class="goodsInfoItemDivider" /> -->
			<!-- <div class="goodsInfoItem">
				<div class="assessmentHead">
					<div class="assessmentHeadLabel">用户评价(100)</div>
					<div class="seeAll" @click="seeAll">查看全部<van-icon style="margin-left: 5px;" name="arrow" /></div>
				</div>
				<div class="assessmentUser">
					<van-image class="assessmentUserPic" round width="40" height="40"  src="https://img.yzcdn.cn/vant/cat.jpeg"/>
					<div class="assessmentUserName">t**3</div>
				</div>
				<div class="assessmentMessage">精致，镜片透明的，两套带子，一个直接带的一个头盔的挺不错~</div>
			</div> -->
			
			<van-divider class="goodsInfoItemDivider" />
			
			<div class="goodsNotice ">
				<div class="goodsInfoItem">
					<van-divider :style="{ color: '#333333', borderColor: '#333333', padding: '0 20%' }" class="productInfo">
		  				购买须知
					</van-divider>
					<div>温馨提醒:因跨境商品特殊，48小时发货，暂不支持7天无理由退换货。非商品质量问题造成的售后，需自行承担损失</div>
				</div>
				
			</div>


			<van-divider :style="{ color: '#FF8C34', borderColor: '#FF8C34', padding: '0 15%' }" class="productInfo">
  				详情
			</van-divider>
			<div style="margin-bottom: 60px;">
				
			</div>
			
			<!-- 规格弹窗 -->
			<van-popup v-model="goodsSizeShowFlag" position="bottom" close-icon="close" closeable round>
				<div class="goodsSizeInfo">
					<van-image class="goodsSizeInfoPic" width="60" src="https://img.yzcdn.cn/vant/cat.jpeg" />
					<div class="goodsSizeInfoWords">
						<div class="goodsSizeInfoWordsName">倩碧匀净卓研淡斑双效精华露</div>
						<div class="goodsSizeInfoWordsPrice">
							<div class="goodsSizeInfoWordsPriceUnit">￥</div>
							<div class="goodsSizeInfoWordsPriceNum">289.00</div>
						</div>
						<div class="goodsSizeInfoWordsStore">库存：858件</div>
					</div>
				</div>
				<van-divider  />
				<div class="goodsSizeSelectSize">
					<div class="goodsSizeSelectSizeTitle">商品规格</div>
					<div class="goodsSizeSelectSizeDetail">
						<div class="goodsSizeSelectSizeItem">大瓶装</div>
						<div class="goodsSizeSelectSizeItem">小瓶装</div>
					</div>
				</div>
				<div class="goodsSizeSelectNumWrap">
					<div class="goodsSizeSelectNum">数量</div>
					<van-stepper class="goodsSizeSelectStepper" v-model="goodsSize.num" />
				</div>
				<van-button class="confirmBuy"  @click="confirmBuy">确定</van-button>
			</van-popup>

			<!-- 参数弹窗 -->
			<van-popup v-model="paramsShowFlag" position="bottom"  round>
				<div class="paramsTitle">产品参数</div>
				<div class="paramsCell">
					<div class="paramsCellLabel">品牌</div>
					<div class="paramsCellValue">{{ goodsParams.band }}</div>
				</div>
				<van-divider />
				<div class="paramsCell">
					<div class="paramsCellLabel">品名</div>
					<div class="paramsCellValue">{{ goodsParams.name }}</div>
				</div>
				<van-divider />
				<div class="paramsCell">
					<div class="paramsCellLabel">产地</div>
					<div class="paramsCellValue">{{ goodsParams.origin }}</div>
				</div>
				<van-divider />
				<div class="paramsCell">
					<div class="paramsCellLabel">保质期</div>
					<div class="paramsCellValue">{{ goodsParams.expiration }}</div>
				</div>
				<van-divider />
				<div class="paramsCell">
					<div class="paramsCellLabel">适合肤质</div>
					<div class="paramsCellValue">{{ goodsParams.suit }}</div>
				</div>
				<van-divider />
				<div class="paramsCell">
					<div class="paramsCellLabel">功效</div>
					<div class="paramsCellValue">{{ goodsParams.effect }}</div>
				</div>
				<van-divider />
				<div class="paramsCell">
					<div class="paramsCellLabel"><div>限期使用</div><div>日期范围</div></div>
					<div class="paramsCellValue">{{ goodsParams.dateRange }}</div>
				</div>
				<van-divider />
			</van-popup>

			<van-goods-action class="vanTab">
			  	<van-goods-action-icon icon="chat-o" text="客服"  />
			  	<van-goods-action-icon icon="like-o" text="收藏"  />
			  	<van-goods-action-icon icon="cart-o" text="购物车" />
			  	<van-goods-action-button type="warning" text="加入购物车" />
			  	<van-goods-action-button type="danger" text="立即购买" />
			</van-goods-action>
	
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
			productName:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",
			current: 0,
			pics:["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"],//轮播图片数组

			goodsSizeShowFlag:false,
			paramsShowFlag:false,
			goodsParams:{
				band:"XX精华露",
				name:"XXX套装",
				origin:"中国",
				expiration:"3年",
				suit:"所有肤质",
				effect:"美白、补水、保湿、提亮肤色、淡斑",
				dateRange:"2021-10-22 至 2022-10-1"
			},
			goodsSize:{
				num:1
			},

		}
	},
	computed:{},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
		onChange(index) {
	      this.current = index;
	    },
	    seeAll(){
	    	// 查看所有评价
	    	this.$router.push({
	    		name:"reviews",
	    		query:{
	    			product:this.product
	    		}
	    	})
	    },
	    showGoodsSize(){
	    	this.goodsSizeShowFlag=true
	    },
	    showParams(){
	    	this.paramsShowFlag=true
	    },

	    confirmBuy(){
	    	this.goodsSizeShowFlag=false
	    }

	},
	mounted(){

	},
	created(){
		console.log(this.$router.currentRoute.query.product)
		this.product=this.$router.currentRoute.query.product
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
	
	/*自定义轮播图指示器*/
	.custom-indicator {
	    position: absolute;
	    right: 10px;
	    bottom: 10px;
	    padding: 4px 12px;
	    font-size: 14px;
	    background: rgba(0, 0, 0, 0.2);
	    color: white;
	    border-radius: 20px;
	}

	.goodsInfo .productInfoSwipe{
		border-radius: 0px 0px 15px 15px;
	}
	
	.goodsInfo .vanTab{
		box-shadow: 0px -2px 10px rgba(0,0,0,0.2);
	}
	.goodsInfo .vanTab .van-goods-action-button{
		/*flex:unset;
		width: 40%;
		margin-left: auto;
		margin-right: 20px;*/

	}
	.goodsInfo .vanTab>div{
		/*margin:0px 20px;*/
	}
	
	.goodsInfo .productInfo{
		font-size: 16px;
		font-weight: bold;
	}
	.goodsInfo .productInfo.van-divider::after, .goodsInfo .productInfo.van-divider::before{
		border-width: 3px 0 0;
	}

	.goodsInfo .productInfoContent_row{
		display: flex;
		justify-content: space-between;
		padding: 0px 20px;
		
	}
	.goodsInfo .marginRow{
		margin-top: 8px;
	}

	.goodsInfo .productName{
		font-size: 15px;
		font-weight: bold;
		margin: 5px 0px;
		text-align: left;
	}

	
	.goodsInfo .grayWords{
		color: #999999;
		font-size: 11px;
	}

	.goodsInfo .goodsNotice{
		border-radius: 0px 0px 15px 15px;
		box-shadow: 0px 2px 2px rgba(0,0,0,0.15);
		padding-bottom: 20px;
		font-size: 12px;
	}


	.goodsInfo .grayLine{
		display: flex;
		align-items: center;
	}
	.goodsInfo .goodsPrice{
		display: flex;
		align-items: baseline;
		margin-top: 5px;
	}


	.goodsInfo .goodsInfoItem{
		box-sizing: border-box;
		width: calc(100% - 30px);
		margin:0px auto;
	}

	.goodsInfo .assessmentHead{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
	}
	.goodsInfo .assessmentUser{
		display: flex;
		align-items: center;
		color: #999999;
		font-size: 14px;
		margin:5px 0px;
	}
	.goodsInfo .assessmentUserName{
		margin-left: 15px;
	}
	.goodsInfo .assessmentUserPic{
		box-shadow: 3px 3px 5px rgba(0,0,0,0.2)
	}
	.goodsInfo .assessmentMessage{
		color: #333333;
		font-size: 14px;
		text-align: left;
	}

	.goodsInfo .goodsInfoItem .seeAll{
		color: #FF8C34;
		font-size: 11px;
		display: flex;
		align-items: center;
	}
	.goodsInfo .assessmentHeadLabel{
		font-weight: bold;
	}

	.goodsInfo .grayLineCOUNT{
		margin-left: auto;
	}
	.goodsInfo .grayLineFEE{
		margin-left: 25px;
	}
	.goodsInfo .grayLineQG{margin-left: 2px;}
	.goodsInfo .goodsPriceNewWrap{display: flex;align-items: center;font-weight: bold;}
	.goodsInfo .goodsPriceNew{
		color: #FE5050;
		font-size: 23px;

	}
	.goodsInfo .goodsPriceUnit{
		color: #FF3434;
		font-size: 14px;
	}
	.goodsInfo .goodsPriceOld{
		margin-left: 10px;
	    text-decoration: line-through;
	}

	.goodsInfo .goodsInfoItemDivider{
		margin: 10px 0px;
		border-color: rgba(0,0,0,0.2);
	}

	.goodsInfo .goodsInfoItemCell{
		display: flex;
		align-items: center;
		margin: 10px 0px;
	}
	.goodsInfo .goodsInfoItemCellIcon{
		margin-left: auto;
		color: #999999;
	}
	.goodsInfo .goodsInfoItemCellLabel{
		color: #999999;
		font-size: 14px;
		width: 80px;
		text-align: left;
	}
	.goodsInfo .goodsInfoItemCellInput{
		color: #333333;
		font-size: 14px;
		/*margin-left: 30px;*/
	}
	
	.goodsInfo .paramsTitle{
		text-align: center;
	}
	.goodsInfo .paramsCell{
		text-align: left;
		width: calc(100% - 30px);
		margin:0px auto;
		display: flex;
		align-items: center;
	}
	.goodsInfo .paramsCellLabel{
		color: #999999;
		font-size: 14px;
		width: 80px;
	}

	.goodsInfo .paramsCellValue{
		color: #333333;
		font-size: 14px;
	}
	.goodsInfo .paramsTitle{
		margin:20px 0px;
		color: #333333;
		font-size: 15px;
	}

	.goodsInfo .confirmBuy{
		margin:20px 0px;
		border-radius: 20px;
		width: 70%;
		background:rgba(255,140,52,1);
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		color: white;
	}
	

	.goodsInfo .goodsSizeSelectNumWrap{
		display: flex;
		align-items: center;
		width: calc(100% - 30px);
		margin: 0px auto;
	}
	.goodsInfo .goodsSizeSelectNum{

	}
	.goodsInfo .goodsSizeSelectStepper{
		margin-left: auto;
	}

	.goodsInfo .goodsSizeInfo{
		display: flex;
		width: calc(100% - 30px);
		margin:10px auto;
		margin-top: 20px;
	}
	.goodsInfo .goodsSizeInfoPic{}
	.goodsInfo .goodsSizeInfoWords{
		text-align: left;
		margin-left: 20px;
	}

	.goodsInfo .goodsSizeInfoWordsName{
		color: #333333;
		font-size: 14px;
	}

	.goodsInfo .goodsSizeInfoWordsStore{
		font-size: 11px;
		color: #999999;
	}

	.goodsInfo .goodsSizeInfoWordsPriceUnit{
		color: #FF3434;
		font-size: 14px;
		font-weight: bold;
	}
	.goodsInfo .goodsSizeInfoWordsPriceNum{
		color: #FE5050;
		font-size: 20px;
		font-weight: bold;
	}
	.goodsInfo .goodsSizeInfoWordsPrice{
		display: flex;
		align-items: baseline;
		margin:8px 0px;
	}


	.goodsInfo .goodsSizeSelectSize{
		width: calc(100% - 30px);
    	margin: 0px auto;
	}
	.goodsInfo .goodsSizeSelectSizeTitle{
		color: #333333;
		text-align: left;
		font-size: 14px;
	}
	.goodsInfo .goodsSizeSelectSizeDetail{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.goodsInfo .goodsSizeSelectSizeItem{
		color: #333333;
		font-size: 12px;
		border-radius: 8px;
		background: #ECEBEB;
		padding: 3px 15px;
		margin:10px 0px;
		margin-right: 20px;
	}
</style>