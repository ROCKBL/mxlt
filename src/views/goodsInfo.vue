<template>
	<div class="goodsInfo">
		<van-nav-bar :title="goodsInfo.name"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div>
			<van-swipe @change="onChange" class="productInfoSwipe">
			  	<van-swipe-item v-for="pic in pics">
			  		<van-image width="100%" fit="contain" height="200px"  :src="pic" />
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
						<div class="goodsPriceNew" v-if="goodsInfo.couponPrice">{{ goodsInfo.couponPrice.toFixed(2) }}</div>
					</div>
					<div class="grayWords goodsPriceOld" v-if="goodsInfo.price" >{{ goodsInfo.price.toFixed(2) }}</div>
				</div>
				<div class="productName marginRow">{{ goodsInfo.name }}</div>
				<div class="grayWords grayLine">
					<van-icon name="location-o" class="grayLineIcon" />
					<div class="grayLineQG">全国</div>
					<!-- <div class="grayLineFEE">快递：0</div> -->
					<div class="grayLineCOUNT">销售{{ goodsInfo.virtualSales+goodsInfo.salesVolume }}</div>
				</div>
			</div>
			
			<van-divider class="goodsInfoItemDivider" />
			<div class="goodsInfoItem">
				<div class="goodsInfoItemCell" @click="showGoodsSize">
					<div class="goodsInfoItemCellLabel">选择</div>
					
					<div class="goodsInfoItemCellInput" v-if="JSON.stringify(selectedSku)=='{}'">选择商品规格</div>
					<div class="goodsInfoItemCellInput" v-else >{{ selectedSkuStr }}</div>

					<van-icon class="goodsInfoItemCellIcon" name="arrow" />
				</div>
				<div class="goodsInfoItemCell" @click="showParams">
					<div class="goodsInfoItemCellLabel">参数</div>
					<div class="goodsInfoItemCellInput" v-if="goodsInfo.params&&goodsInfo.params.length==0">无参数</div>
					<div class="goodsInfoItemCellInput" v-else>查看参数</div>
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
			<div v-html="goodsInfo.detail"></div>
			<div style="margin-bottom: 60px;">
				
			</div>
			
			<!-- 规格弹窗 -->
			<!-- <van-popup v-model="goodsSizeShowFlag" position="bottom" close-icon="close" closeable round>
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
			</van-popup> -->

			<van-popup v-model="goodsSizeShowFlag" position="bottom" close-icon="close" closeable round ref="goodsSize">
				<div class="goodsSizeInfo">
					<van-image class="goodsSizeInfoPic" width="60" :src="selectedSku.image?selectedSku.image:goodsInfo.firstImage" />
					<div class="goodsSizeInfoWords">
						<div class="goodsSizeInfoWordsName">{{ goodsInfo.name }}</div>
						<div class="goodsSizeInfoWordsPrice">
							<div class="goodsSizeInfoWordsPriceUnit">￥</div>
							<div class="goodsSizeInfoWordsPriceNum">{{ selectedSku.price?selectedSku.price:goodsInfo.couponPrice }}</div>
						</div>
						<div class="goodsSizeInfoWordsStore">库存：{{ stock_num }}{{ goodsInfo.unit }}</div>
					</div>
				</div>
				<van-divider  />

				<!-- <div class="goodsSizeSelectSize">
					<div class="goodsSizeSelectSizeTitle">商品规格</div>
					<div class="goodsSizeSelectSizeDetail">
						<div class="goodsSizeSelectSizeItem">大瓶装</div>
						<div class="goodsSizeSelectSizeItem">小瓶装</div>
					</div>
				</div> -->

				<div class="goodsSizeSelectSize" v-for="(item,index) in skuAttrList" :key="index">
					<div class="goodsSizeSelectSizeTitle">{{ item.name }}</div>
					<div class="goodsSizeSelectSizeDetail">
						<div class="goodsSizeSelectSizeItem" :class="attrObjClass(attrObj)" @click="selectAttr(attrObj,item,index)" v-for="attrObj in item.lineList" >{{ attrObj.value }}</div>
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
				<div class="paramsCell" v-for="item in goodsInfo.params">
					<div class="paramsCellLabel">{{ item.goodsParamName }}</div>
					<div class="paramsCellValue">{{ item.value }}</div>
				</div>

				<!-- <div class="paramsCell">
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
				</div> -->
				<van-divider />
			</van-popup>

			<!-- 立即购买弹窗 -->
			<van-popup v-model="buyFlag" position="bottom"  round>
				<div class="" style="display: flex;align-items: center;padding: 10px;text-align: left;">
					<van-image width="60px" height="60px" fit="contain" :src="buyObj.goodsImage"/>
					<div style="margin-left: 10px;flex-grow: 1;">
						<div style="font-size: 14px;margin-bottom: 2px;">{{ buyObj.goodsName }}</div>
						<div style="color: #999;font-size: 11px;">{{ getSkuName(buyObj.specName) }}</div>
						<div style="display: flex;align-items: center;">
							<div style="font-size: 12px;">数量</div>
							<van-stepper style="margin-left: auto;" v-model="buyObj.num" min="1" :max="selectedSku.num" disable-input/>
						</div>
					</div>
				</div>
				<van-button type="danger" @click="goCreateGoodsOrder" style="width: 100%;">确认</van-button>
			</van-popup>

			<van-goods-action class="vanTab">
			  	<van-goods-action-icon icon="chat-o" text="客服" @click="callservice" />
			  	
			  	<van-goods-action-icon icon="like" class="collecedtIcon" v-if="goodsInfo.isCollect" text="收藏" @click="collect" />
			  	<van-goods-action-icon icon="like-o" v-else  text="收藏" @click="collect" />

			  	<van-goods-action-icon icon="cart-o" text="购物车" @click="gocart" />
			  	<van-goods-action-button type="warning" text="加入购物车" @click="addcart" />
			  	<van-goods-action-button type="danger" text="立即购买" @click="buyRightNow" />
			</van-goods-action>
	
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


// Vue.use(Vant);

import { gdetail } from '@/api/goods'
import { gclcollectionAndCancel } from '@/api/collect'
import { gcartpublish } from '@/api/cart'

import { mapState } from 'vuex'

export default {
	name: '',
	store,
	data(){
		return{

			goodsId:null,//商品ID
			goodsInfo:{},//商品信息
			checkedAttr:{},//被选择的属性值
			selectedSku:{},//被选中的sku
			skuAttrList:[],//sku属性值列表

			selectedSkuStr:"",

			productName:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",
			current: 0,
			// pics:["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"],//轮播图片数组
			pics:[],

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

			buyFlag:false,
			buyObj:{
				// goodSpecId: 35
				// goodsImage: "http://ty-oss-001.oss-cn-hangzhou.aliyuncs.com/public/upload/good/manageGoodController/856ee238deed366b98d41080ae09e9b5FLDKV.png"
				// goodsName: "脑白金",
				// goodsNum: 81,
				// goodsPrice: 80,
				// num: 8,
				// specName: {"数量": "6瓶", "容量": "500ml"},
				num:1
			}
		}
	},
	computed:{
		
		stock_num(){
			// 总库存，各类库存相加之和
			if(this.selectedSku.id){
				return this.selectedSku.num
			}
			if(this.goodsInfo.specs&&this.goodsInfo.specs.length>0){
				var num=0;
				this.goodsInfo.specs.map(function(o){
					num+=o.num
				})
				return num
			}
			return 0
		},
		...mapState({
            userInfo(state){ return state.userInfo},
        })
		// skuAttrList(){
		// 	if(!this.goodsInfo.attrs){
		// 		return []
		// 	}

		// 	var attrs=this.goodsInfo.attrs

		// 	for(var i=0;i<attrs.length;i++){
		// 		for(var j=0;j<attrs[i].lineList.length;j++){
		// 			// active disable nomal
		// 			attrs[i].lineList[j].status="nomal"
		// 		}
		// 	}

		// 	return attrs
		// },


	},
	watch:{
		// checkedAttr(newo,oldo){
		// 	console.log("aa")
		// 	console.log(newo)
		// 	console.log(oldo)
		// 	// change skuAttrList disable状态
		// }
		// checkedAttr:{
		// 	handler(newo,oldo){
		// 		console.log("aa")
		// 		console.log(newo)
		// 		console.log(oldo)
		// 		// change skuAttrList disable状态
		// 	},
		// 	deep: true,//深层

		// }
	},
	components: {
		// HelloWorld
	},
	methods:{
		creatSelectedSkuStr(){
			// 生成字符串
			if(JSON.stringify(this.selectedSku)=='{}'){
				return
			}
			var that=this;
			var rtn='已选：'
			for(var n in this.checkedAttr){
				var find=this.skuAttrList.find(function(o){
					return o.id==n
				})
				// var name=find.name
				var findattr=find.lineList.find(function(o){
					return o.id==that.checkedAttr[n]
				})
				var value=findattr.value
				rtn+='"'+value+'"'
			}
			this.selectedSkuStr=rtn
		},


		selectAttr(attrObj,item,index){
			if(attrObj.status=="disable"){
				return
			}
			if(attrObj.status=="nomal"){
				for(var i=0;i<item.lineList.length;i++){
					if(item.lineList[i].status=="active"){
						item.lineList[i].status="nomal"
					}
				}
				attrObj.status="active"
				this.checkedAttr[item.id]=attrObj.id

				// 解决刷新问题
				// this.goodsSizeShowFlag=false
				// this.goodsSizeShowFlag=true

				this.afterCheckedAttrChange()
				this.creatSelectedSkuStr()
				return
			}
			if(attrObj.status=="active"){
				attrObj.status="nomal"
				this.checkedAttr[item.id]=null
				// this.goodsSizeShowFlag=false
				// this.goodsSizeShowFlag=true

				this.afterCheckedAttrChange()
				this.creatSelectedSkuStr()
				return
			}

		},
		attrObjClass(attrObj){
			return attrObj.status
		},
		initCheckedAttr(){

			var attrs=this.goodsInfo.attrs;
			for(var i=0;i<attrs.length;i++){
				this.checkedAttr[attrs[i].id]=null
			}
		},
		afterCheckedAttrChange(){
			// 判断所选条件是否已经符合一个SKU
			var selectSkuFlag=true
			for(var s in this.checkedAttr){
				if(this.checkedAttr[s]==null){
					selectSkuFlag=false
				}
			}
			if(selectSkuFlag){
				for(var i=0;i<this.goodsInfo.specs.length;i++){
					var o=this.goodsInfo.specs[i].newSku
					var isThisOne=true
					for(var p in o){
						if(Number(o[p])!=Number(this.checkedAttr[p])){
							isThisOne=false
						}
						
					}
					if(isThisOne){
						this.selectedSku=this.goodsInfo.specs[i]
					}
				}
			}else{
				this.selectedSku={}
			}
			// 整理skuAttrList，形成disable
			// 将disable初始化为nomal
			for(var i=0;i<this.skuAttrList.length;i++){
				for(var j=0;j<this.skuAttrList[i].lineList.length;j++){
					if(this.skuAttrList[i].lineList[j].status=="disable"){
						this.skuAttrList[i].lineList[j].status="nomal"
					}
				}
			}

			for(var main in this.checkedAttr){
				var ar=[];//符合条件的SKU
				var condition={}
				// 去除null 和相同属性
				for(var other in this.checkedAttr){
					if(other!=main&&this.checkedAttr[other]!=null){
						condition[other]=this.checkedAttr[other]
					}
				}
				// 挑选符合条件的SKU进入AR
				for(var i=0;i<this.goodsInfo.specs.length;i++){
					var findFlag=true
					for(var p in condition){
						var a=Number(this.goodsInfo.specs[i].newSku[p])
						var b=Number(condition[p])
						if(this.goodsInfo.specs[i].newSku[p]!=condition[p]){
							findFlag=false
						}
					}
					if(findFlag){
						ar.push(this.goodsInfo.specs[i])
					}
				}
				// 将不符合条件的skuAttrList里的attr变为disable
				var attrList=this.skuAttrList.find(function(o){
					return o.id==main
				})
				for(var i=0;i<attrList.lineList.length;i++){
					var find=ar.find(function(oo){
						return oo.newSku[main]==attrList.lineList[i].id
					})
					if(!find){
						attrList.lineList[i].status="disable"
					}
				}


			}


		},


		initSkuAttrList(){
			// this.skuAttrList.length=0;

			var attrs=this.goodsInfo.attrs
			for(var i=0;i<attrs.length;i++){
				for(var j=0;j<attrs[i].lineList.length;j++){
					// active disable nomal
					attrs[i].lineList[j].status="nomal"
				}
			}
			// this.skuAttrList=this.skuAttrList.concat(attrs)
			this.skuAttrList=[].concat(attrs)
		},


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
	    	if(this.goodsInfo.params&&this.goodsInfo.params.length==0){
	    		return
	    	}
	    	this.paramsShowFlag=true
	    },

	    confirmBuy(){
	    	this.goodsSizeShowFlag=false
	    },
	    getGoodsInfo(){
	    	var that=this;
	    	gdetail({
	    		id:this.goodsId
	    	}).then(function(res){
	    		console.log(res)
	    		that.goodsInfo=res.result
	    		that.pics=res.result.images.split(",")
	    		console.log(that.pics)
	    		// 格式化skus数据，方便后续处理
	    		for(var i=0;i<that.goodsInfo.specs.length;i++){
	    			that.goodsInfo.specs[i].newSku={}
	    			for(var j=0;j<that.goodsInfo.specs[i].skus.length;j++){
	    				var ar=that.goodsInfo.specs[i].skus[j].split(",")
	    				that.goodsInfo.specs[i].newSku[Number(ar[0])]=Number(ar[1])
	    			}
	    		}


	    		that.initSkuAttrList()
	    		that.initCheckedAttr()

	    	}).catch(function(e){
	    		if(String(e)=="Error: 商品不存在"){
	    			that.$router.replace("/")
	    		}
	    	})
	    },

	    collect(){
	    	console.log(this.goodsInfo)
	    	var that=this;
	    	gclcollectionAndCancel({
	    		goodsId:this.goodsInfo.id
	    	}).then(function(res){
	    		// console.log(res)
	    		that.getGoodsInfo()
	    	})
	    },
	    gocart(){
	    	this.$router.push('/cart')
	    },
	    addcart(){
	    	var that=this;
	    	if(JSON.stringify(this.selectedSku)=="{}"){
	    		this.Toast("请先选择商品规格")
	    		return
	    	}
	    	console.log(this.selectedSku)
	    	gcartpublish({
	    		goodSpecId:this.selectedSku.id,
	    		num:1
	    	}).then(function(res){
	    		if(res.msg=="success"){
	    			that.Toast("成功加入购物车")
	    		}
	    	})

	    },

	    callservice(){
	    	window.location.href="tel:"+this.userInfo.sysPhone
	    },

	    buyRightNow(){
	    	var that=this;
	    	if(JSON.stringify(this.selectedSku)=="{}"){
				this.Toast("请先选择商品规格")
				return
			}
			if(this.selectedSku.num==0){
				this.Toast("该商品已售完")
				return
			}
			console.log(this.selectedSku)
			console.log(this.goodsInfo)
			this.buyFlag=true
			this.buyObj.goodSpecId=this.selectedSku.id
			this.buyObj.goodsImage=this.selectedSku.image
			this.buyObj.goodsName=this.goodsInfo.name
			this.buyObj.goodsNum=this.selectedSku.num
			this.buyObj.goodsPrice=this.selectedSku.couponPrice
			this.buyObj.specName={}
			for(var n in this.selectedSku.newSku){
				var find=this.goodsInfo.attrs.find(function(o){
					return o.id==Number(n)
				})
				var findattr=find.lineList.find(function(o){
					return o.id==Number(that.selectedSku.newSku[n])
				})

				this.buyObj.specName[find.name]=findattr.value
			}

			if(this.buyObj.num>this.buyObj.goodsNum){
				this.buyObj.num=this.buyObj.goodsNum
			}
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
        goCreateGoodsOrder(){
        	this.$router.push({
                name:"createGoodsOrder",
                query:{
                    goods:JSON.stringify([this.buyObj])
                }
            })
        },
	},
	mounted(){

	},
	created(){
		// console.log(this.$router.currentRoute.query.product)
		var goods=this.$router.currentRoute.query.product
		this.goodsId=JSON.parse(goods).id
		this.getGoodsInfo()
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


	.goodsInfo .goodsSizeSelectSizeDetail .nomal{
		cursor: pointer;
		border:1px solid rgba(255, 255, 255,0);
	}	
	.goodsInfo .goodsSizeSelectSizeDetail .active{
		cursor: pointer;
		color: rgb(255, 140, 52);
		background: rgba(255, 140, 52,0.1);
		border:1px solid rgb(255, 140, 52);
		/*padding: 2px;*/
	}
	.goodsInfo .goodsSizeSelectSizeDetail .disable{
		cursor: not-allowed;
		position: relative;
		border:1px solid rgba(255, 255, 255,0);
		/*color: blue;*/
	}
	.goodsInfo .goodsSizeSelectSizeDetail .disable::before{
		position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background: rgba(255,255,255,0.6);
	    content: '';
	}


	.goodsInfo .collecedtIcon .van-goods-action-icon__icon{
		color: #FF8C34
	}
</style>