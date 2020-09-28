<template>
	<div class="">
		<van-nav-bar :title="productInfo.name"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

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
			
			<div class="productInfoContent_row marginRow">
				<div class="productInfoContent_row_one_left">
					<div class="orderPrice">
						<div class="marginRow">预约价：￥</div>
						<!-- <div>{{ productInfo.subsPrice.toFixed(2) }}</div> -->
						<div>{{ Number(productInfo.subsPrice).toFixed(2) }}</div>
					</div>
					<!-- <div class="grayWords marginRow">优惠价￥{{ productInfo.couponPrice }}</div> -->
					<div class="grayWords marginRow">优惠价￥{{ Number(productInfo.couponPrice).toFixed(2) }}</div>
					<div class="productName marginRow">{{ productInfo.name }}</div>
				</div>
				<div class="productInfoContent_row_one_right">
					<div><svg t="1597644778339" class="icon" viewBox="0 0 1051 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2892" width="32" height="32"><path d="M848.392 73.998 848.393 74c-75.553 0-136.8 61.915-136.8 138.254 0 8.07 0.728 15.974 2.068 23.661L308.055 405.784c-24.957-33.531-64.561-55.276-109.254-55.276-75.531 0-136.8 61.915-136.8 138.346 0 76.615 61.269 138.508 136.8 138.508 36.985 0 70.479-14.936 95.087-39.077l259.346 188.804c-7.955 17.545-12.433 37.059-12.433 57.642 0 76.385 61.015 138.277 136.546 138.277s136.8-61.915 136.8-138.277c0-76.338-61.269-138.231-136.8-138.231-33.584 0-64.276 12.326-88.017 32.651L326.754 537.996c5.707-15.259 8.846-31.814 8.846-49.119 0-9.735-1.067-19.194-2.988-28.328l403.774-169.102c24.721 35.677 65.587 59.082 111.983 59.082 75.553 0 136.8-61.915 136.8-138.277C985.191 135.913 923.947 73.998 848.392 73.998zM198.822 565.97c-42.466 0-77-34.471-77-77.068 0-42.443 34.534-76.932 77-76.932s77 34.471 77 76.932C275.822 531.465 241.288 565.97 198.822 565.97zM677.379 757.788c42.485 0 77.035 34.529 77.035 76.992 0 42.463-34.549 77.008-77.035 77.008s-76.965-34.546-76.965-77.008C600.414 792.317 634.912 757.788 677.379 757.788zM848.393 289.289c-42.466 0-77-34.546-77-77.008 0-42.462 34.534-76.992 77-76.992 42.466 0 77 34.529 77 76.992C925.393 254.744 890.859 289.289 848.393 289.289z" p-id="2893" fill="#FF8C34"></path></svg></div>
					<div>分享</div>
				</div>
			</div>
			<div class="productInfoContent_row grayWords marginRow">
				<div style="display: flex;align-items: center;">
					<!-- <svg style="margin-right: 5px;" t="1597647576172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4647" width="10" height="10"><path d="M0 505.6c0-60.8 22.4-115.2 67.2-163.2 9.6-9.6 19.2-22.4 25.6-32C153.6 233.6 224 166.4 297.6 102.4c22.4-19.2 41.6-38.4 64-54.4 32-25.6 70.4-41.6 115.2-48 76.8-9.6 144 12.8 201.6 67.2 22.4 19.2 44.8 38.4 70.4 57.6 73.6 64 140.8 131.2 198.4 208 9.6 12.8 22.4 25.6 32 41.6 35.2 51.2 48 112 38.4 172.8-6.4 51.2-28.8 92.8-64 131.2L896 745.6c-41.6 48-83.2 92.8-131.2 134.4-25.6 22.4-51.2 41.6-76.8 64-16 12.8-28.8 25.6-44.8 35.2-54.4 35.2-112 48-176 38.4-51.2-6.4-92.8-28.8-131.2-64-9.6-9.6-19.2-16-32-25.6-64-51.2-124.8-108.8-179.2-172.8-19.2-25.6-41.6-48-60.8-73.6-3.2-9.6-16-25.6-25.6-41.6C12.8 601.6 0 556.8 0 505.6z m425.6 92.8V800c0 22.4 12.8 35.2 35.2 35.2h102.4c6.4 0 12.8-3.2 16-6.4 12.8-12.8 19.2-28.8 19.2-48v-176c0-6.4 0-6.4 6.4-6.4h201.6c16 0 28.8-12.8 32-28.8v-105.6c0-6.4-3.2-12.8-6.4-19.2-6.4-9.6-19.2-12.8-32-12.8h-201.6v-6.4-195.2c0-25.6-12.8-38.4-38.4-38.4h-96c-6.4 0-12.8 0-19.2 3.2-12.8 6.4-19.2 19.2-19.2 32v201.6H224c-22.4 0-35.2 12.8-35.2 35.2v99.2c0 9.6 3.2 16 6.4 22.4 6.4 9.6 19.2 12.8 32 12.8h198.4z" fill="#999999" p-id="4648"></path></svg> -->
					<van-icon class="iconfont " class-prefix='icon' name='yiyuan' style="margin-right: 5px;" size="10" />
					{{ productInfo.hospitalName }}
				</div>
				<div>已预约{{ productInfo.salesVolume+productInfo.virtualSales }}</div>
			</div>
			<van-divider :style="{ borderColor:'rgba(0,0,0,0.2)'}" />

			<div class="productInfoContent_row marginRow productInfoContent_row_three">
				<div class="productInfoContent_row_three_left">
					<van-image round width="48px" height="48px" :src="productInfo.hospitalImages"/>
					<div class="hospitalInfo">
						<div class="hospitalInfoName">{{ productInfo.hospitalName }}</div>
						<div class="hospitalInfoRate marginRow">
							<!-- <div class="hospitalInfoRateLabel">评分</div> -->
							<!-- <div class="hospitalInfoRateNum">5分高</div> -->
							<div class="hospitalInfoRateIcon">
								<van-icon class="iconfont " class-prefix='icon' name='yiyuan' style="margin-right: 5px;" size="10" />
								<!-- <svg style="margin-right: 5px;" t="1597647576172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4647" width="10" height="10"><path d="M0 505.6c0-60.8 22.4-115.2 67.2-163.2 9.6-9.6 19.2-22.4 25.6-32C153.6 233.6 224 166.4 297.6 102.4c22.4-19.2 41.6-38.4 64-54.4 32-25.6 70.4-41.6 115.2-48 76.8-9.6 144 12.8 201.6 67.2 22.4 19.2 44.8 38.4 70.4 57.6 73.6 64 140.8 131.2 198.4 208 9.6 12.8 22.4 25.6 32 41.6 35.2 51.2 48 112 38.4 172.8-6.4 51.2-28.8 92.8-64 131.2L896 745.6c-41.6 48-83.2 92.8-131.2 134.4-25.6 22.4-51.2 41.6-76.8 64-16 12.8-28.8 25.6-44.8 35.2-54.4 35.2-112 48-176 38.4-51.2-6.4-92.8-28.8-131.2-64-9.6-9.6-19.2-16-32-25.6-64-51.2-124.8-108.8-179.2-172.8-19.2-25.6-41.6-48-60.8-73.6-3.2-9.6-16-25.6-25.6-41.6C12.8 601.6 0 556.8 0 505.6z m425.6 92.8V800c0 22.4 12.8 35.2 35.2 35.2h102.4c6.4 0 12.8-3.2 16-6.4 12.8-12.8 19.2-28.8 19.2-48v-176c0-6.4 0-6.4 6.4-6.4h201.6c16 0 28.8-12.8 32-28.8v-105.6c0-6.4-3.2-12.8-6.4-19.2-6.4-9.6-19.2-12.8-32-12.8h-201.6v-6.4-195.2c0-25.6-12.8-38.4-38.4-38.4h-96c-6.4 0-12.8 0-19.2 3.2-12.8 6.4-19.2 19.2-19.2 32v201.6H224c-22.4 0-35.2 12.8-35.2 35.2v99.2c0 9.6 3.2 16 6.4 22.4 6.4 9.6 19.2 12.8 32 12.8h198.4z" fill="#FFFFFF" p-id="4648"></path></svg> -->
								
								<!-- <div>医院</div> -->
								<div>{{ productInfo.hospitalType }}</div>
							</div>
						</div>
						<div class="grayWords hospitalInfoAddress marginRow">
							<van-icon name="location-o" />
							<!-- <div>浙南云谷I幢</div> -->
							<div>{{ productInfo.hospitalAddress }}</div>
						</div>
					</div>
				</div>
				<div class="productInfoContent_row_three_right">
					<svg t="1597651200579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5888" width="32" height="32"><path d="M559.446001 974.871069c-1.332399 0-2.662752-0.084934-4.021758-0.282433-12.770361-1.784646-22.823733-11.835559-24.608452-24.635073l-56.265727-401.479861L73.720976 492.111021c-12.800038-1.783623-22.823733-11.836583-24.607429-24.635073-1.81235-12.798491 5.096274-25.200962 16.877057-30.453592l866.448392-385.352555c10.931405-4.799306 23.702789-2.478448 32.168948 5.988388 8.468206 8.452509 10.817813 21.252023 5.976353 32.209586L585.837126 957.681572C581.135864 968.230835 570.744788 974.871069 559.446001 974.871069zM181.693413 448.857914 504.142221 494.205729c12.799015 1.784646 22.823733 11.836583 24.607429 24.635073l45.279061 322.945203L887.357441 135.045719 181.693413 448.857914z" p-id="5889" fill="#FF8C34"></path></svg>
					<div>导航</div>
				</div>
			</div>

			<van-divider :style="{ color: '#FF8C34', borderColor: '#FF8C34', padding: '0 15%' }" class="productInfo">
  				详情
			</van-divider>
			<div style="margin-bottom: 60px;">
				<div v-html="productInfo.content" style="text-align: left;padding: 0px 20px;"></div>
			</div>

			<van-goods-action class="vanTab">
			  	<van-goods-action-icon icon="phone-o" text="电话" @click="phone" />
			  	<van-goods-action-icon icon="like-o" text="收藏" @click="collect" />
			  	<van-goods-action-button type="danger" text="立即预约" @click="subscribe" color="#FF8C34" />
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

import { pdetail } from '@/api/project'

export default {
	name: '',
	store,
	data(){
		return{
			// productName:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",
			current: 0,
			pics:[
				// "https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"
			],//轮播图片数组

			productInfo:{

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
	    phone(){
	    	// console.log(this.productInfo)
	    	// console.log(this.productInfo.hospitalPhone)
	    	// window.href="tel:xxxxxxxxxxx"
	    	window.location.href="tel:"+this.productInfo.hospitalPhone
	    },
	    collect(){},
	    subscribe(){
	    	// 跳转预约支付页面
	    	this.$router.push({
	    		name: 'order',
                query: { product:this.product, }
	    	})
	    }
	},
	mounted(){

	},
	created(){
		var product=JSON.parse(this.$router.currentRoute.query.product)

		var that=this;
		pdetail({id:product.id}).then(function(response){
			// console.log(response)
			that.productInfo=response.result
			that.pics=response.result.images.split(",")
		})

		// console.log(this.product)
		// console.log(this.$router)
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

	.productInfoSwipe{
		border-radius: 0px 0px 15px 15px;
	}
	
	.vanTab{
		box-shadow: 0px -2px 10px rgba(0,0,0,0.2);
	}
	.vanTab .van-goods-action-button{
		/*flex:unset;
		width: 40%;
		margin-left: auto;
		margin-right: 20px;*/

	}
	.vanTab>div{
		/*margin:0px 20px;*/
	}
	
	.productInfo{
		font-size: 16px;
		font-weight: bold;
	}
	.productInfo.van-divider::after, .productInfo.van-divider::before{
		border-width: 3px 0 0;
	}

	.productInfoContent_row{
		display: flex;
		justify-content: space-between;
		padding: 0px 20px;
		
	}
	.marginRow{
		margin-top: 8px;
	}
	.productInfoContent_row_one_left{
		text-align: left;
	}
	.productName{
		font-size: 15px;
		font-weight: bold;
		margin: 10px 0px;
	}
	.productInfoContent_row_one_right,.productInfoContent_row_three_right{
		color: #FF8C34;
		display: flex;
    	flex-direction: column;
    	justify-content: flex-end;
	}
	.productInfoContent_row_three_right{
		justify-content: center;
		padding: 0px 10px;
		padding-left: 30px;
		border-left: 1px solid rgba(0,0,0,0.08);
	}

	.productInfoContent_row_three_left{
		display: flex;
		align-items: center;
	}

	.orderPrice{
		/*color: #FF3434*/
		display: flex;
		align-items: baseline;

	}
	.orderPrice :nth-child(1){
		font-size: 14px;
		color: #FF3434;
	}
	.orderPrice :nth-child(2){
		font-size: 23px;
		color: #FE5050;
	}
	.grayWords{
		color: #999999;
		font-size: 11px;
	}

	.hospitalInfo{
		display: flex;
		flex-direction: column;
		margin-left: 10px;
	}

	.hospitalInfoRate{
		display: flex;
	}
	
	.hospitalInfoAddress{
		display: flex;
		align-items: center;
	}

	.hospitalInfoRateIcon{
		display: flex;
		align-items: center;
	}

	.productInfoContent_row_three{
		border-radius: 0px 0px 15px 15px;
		box-shadow: 0px 2px 2px rgba(0,0,0,0.15);
		padding-bottom: 20px;
		font-size: 12px;
	}

	.hospitalInfoName{
		font-weight: bold;
		font-size: 15px;
	}
	.hospitalInfoRateLabel{
		color: #999999;
		margin-right: 5px;
	}
	.hospitalInfoRateNum{
		color: #FF8C34;
		margin-right: 5px;
	}
	.hospitalInfoRateIcon{
		background-color: #FF8C34;
		border-radius: 15px;
		color: white;
		padding: 2px 15px;
	}
</style>