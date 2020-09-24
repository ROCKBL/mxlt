<template>
	<div class="goodsSearchList">
		<van-nav-bar title="商品名称"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
        <van-search v-model="searchValue" class="searchBlock" placeholder="需要什么商品" />

        <van-dropdown-menu class="dropdownMenu">
            <van-dropdown-item  title="全部商品" disabled  />
            <van-dropdown-item v-model="orderBy" :options="option" />
        </van-dropdown-menu>

        <div class="goodsList">
            <div v-for="goods in goodsList">
                <div  class="goodsItem">
                    <div class="goodsLeft">
                        <van-image width="80" height="80" :src="goods.pic" />
                    </div>
                    <div class="goodsRight">
                        <div class="goodsRightTop">{{ goods.name }}</div>
                        <div class="goodsRightBottom">
                            <div class="goodsRightNew">￥{{ goods.newPrice }}</div>
                            <div class="goodsRightOld">￥{{ goods.oldPrice }}</div>
                            <div class="goodsRightNum">已售{{ goods.sellNum }}</div>
                        </div>
                    </div>
                </div>
                <div class="divider" ></div>
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
            orderBy:0,
            option:[
                { text: '默认排序', value: 0 },
                { text: '销量排序', value: 1 },
                { text: '人气排序', value: 2 },
                { text: '价格排序', value: 3 },
            ],
            searchValue:"",
            goodsList:[
                {pic:"https://img.yzcdn.cn/vant/cat.jpeg",name:"【奥昵玻尿酸0.5ml】守护年轻的秘密守护年轻的秘守护年轻的秘",newPrice:"1400.00",oldPrice:"1400.00",sellNum:"32"},
                {pic:"https://img.yzcdn.cn/vant/cat.jpeg",name:"【奥昵玻尿酸0.5ml】守护年轻的秘密守护年轻的秘守护年轻的秘",newPrice:"1400.00",oldPrice:"1400.00",sellNum:"32"},
                {pic:"https://img.yzcdn.cn/vant/cat.jpeg",name:"【奥昵玻尿酸0.5ml】守护年轻的秘密守护年轻的秘守护年轻的秘",newPrice:"1400.00",oldPrice:"1400.00",sellNum:"32"},
            ],
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


    .goodsSearchList{
        text-align: left;
    }

    .goodsSearchList .disabledDropdown{

    }

    .goodsSearchList .van-dropdown-menu__item--disabled .van-dropdown-menu__title::after{
        display: none;
    }
    .goodsSearchList .dropdownMenu .van-dropdown-menu__title{
        color: #999999;
    }
    .goodsSearchList .dropdownMenu .van-dropdown-menu__title--active{
        color: #FF8C34;
    }
    .goodsSearchList .dropdownMenu .van-dropdown-item__option--active{
        color: #FF8C34;
    }
    .goodsSearchList .dropdownMenu .van-dropdown-item__option--active .van-dropdown-item__icon{
        color: #FF8C34;
    }

    .goodsSearchList .searchBlock .van-search__content{
        border-radius: 10px;
    }


    .goodsSearchList .goodsList{
        padding: 0px 15px;
        margin-top: 10px;
    }
    .goodsSearchList .goodsItem{
        display: flex;
    }

    .goodsSearchList .goodsLeft{

    }
    .goodsSearchList .goodsRight{
        margin-left: 10px;
    }
    .goodsSearchList .goodsRightTop{
        color: #333333;
        font-size: 14px;
    }
    .goodsSearchList .goodsRightBottom{
        display: flex;
        margin-top: 15px;
        align-items: center;
    }
    .goodsSearchList .goodsRightNew{
        color: #FF3434;
        font-size: 15px;
    }
    .goodsSearchList .goodsRightOld{
        color: #999999;
        font-size: 11px;
        text-decoration: line-through;
        margin-left: 5px;
    }
    .goodsSearchList .goodsRightNum{
        color: #999999;
        font-size: 11px;
        margin-left: auto;
    }

    .goodsSearchList .divider{
        border: 1px solid rgba(0,0,0,0.1);
        margin:10px 0px;
    }
</style>