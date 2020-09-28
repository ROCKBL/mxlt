<template>
	<div class="projectSearchList">
		<van-nav-bar :title="pageTitle"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
        <van-search v-model="searchValue" class="searchBlock" placeholder="需要什么项目" @search="onSearch" />

        <van-dropdown-menu class="dropdownMenu">
            <van-dropdown-item  title="全部项目" disabled  />
            <van-dropdown-item v-model="orderBy" :options="option" @change="changeSort" />
        </van-dropdown-menu>

        <van-list class="productListWrap" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="goodsList">
                <div v-for="goods in goodsList">
                    <div  class="goodsItem" @click="seedetail(goods)">
                        <div class="goodsLeft">
                            <van-image width="80" height="80" :src="goods.firstImage" />
                        </div>
                        <div class="goodsRight">
                            <div class="goodsRightTop">{{ goods.name }}</div>
                            <div class="goodsRightMid">
                                <van-icon class="iconfont " class-prefix='icon' name='yiyuan' style="margin-right: 5px;" size="10" />
                                {{ goods.hospitalName }}
                            </div>
                            <div class="goodsRightBottom">
                                <div class="goodsRightNew">￥{{ Number(goods.couponPrice).toFixed(2) }}</div>
                                <div class="goodsRightOld">￥{{ Number(goods.price).toFixed(2) }}</div>
                                <div class="goodsRightNum">已售{{ goods.virtualSales+goods.salesVolume }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="divider" ></div>
                </div>
            </div>
        </van-list>

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
import { ppage } from '@/api/project'

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
                // {pic:"https://img.yzcdn.cn/vant/cat.jpeg",name:"【奥昵玻尿酸0.5ml】守护年轻的秘密守护年轻的秘守护年轻的秘",newPrice:"1400.00",oldPrice:"1400.00",sellNum:"32"},
                // {pic:"https://img.yzcdn.cn/vant/cat.jpeg",name:"【奥昵玻尿酸0.5ml】守护年轻的秘密守护年轻的秘守护年轻的秘",newPrice:"1400.00",oldPrice:"1400.00",sellNum:"32"},
                // {pic:"https://img.yzcdn.cn/vant/cat.jpeg",name:"【奥昵玻尿酸0.5ml】守护年轻的秘密守护年轻的秘守护年轻的秘",newPrice:"1400.00",oldPrice:"1400.00",sellNum:"32"},
            ],
            
            loading:false,
            finished:false,

            pageNum:1,
            total:0,

            pageType:"",//页面类型：vip,specialOffer, diamond
            pageTitle:"项目名称",

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
            this.pageNum=1
            this.finished=false
        },
        onSearch(){
            this.init()
            this.getdata()
        },
        changeSort(value){
            this.init()
            this.getdata()
        },
        seedetail(project){
            this.$router.push({ 
                name: 'productInfo',
                query: { product:JSON.stringify(project), }
            })
        },

        onLoad(){
            var that=this;
            this.pageNum+=1;
            // setTimeout(function(){
            //     that.getdata(that.pageNum).then(function(){
            //         that.loading=false
            //         if(that.goodsList.length==that.total){
            //             that.finished=true
            //             return
            //         }
            //     })
            // },1000)

            that.getdata(that.pageNum).then(function(){
                that.loading=false
                if(that.goodsList.length==that.total){
                    that.finished=true
                    return
                }
            })
            
        },

        getdata(pageNum){
            pageNum=pageNum||1
            if(pageNum===1){
                this.goodsList.length=0
            }

            var data={
                start:pageNum,
                limit:10,
            }

            // 搜索
            if(this.searchValue!==""){
                data.name=this.searchValue
            }

            // 排序
            switch(this.orderBy){
                case 1:
                    data.saleNum=false
                    break;
                case 2:
                    data.hot=false
                    break;
                case 3:
                    data.price=false
                    break;
            }


            // 类型
            switch(this.pageType){
                case "vip":
                    data.type=2
                    break;
                case "specialOffer":
                    data.type=1
                    break;
                case "diamond":
                    data.type=3
                    break;
            }

            var that=this;
            return ppage(data).then(function(response){
                // console.log(response)
                that.total=response.result.total
                that.goodsList=that.goodsList.concat(response.result.items)
            })
        },
	},
	mounted(){

	},
	created(){
        var searchValue=this.$router.currentRoute.query.searchValue;
        this.searchValue=searchValue

        var pageType=this.$router.currentRoute.query.pageType;
        var pageTitle=this.$router.currentRoute.query.pageTitle;
        if(pageType){
            this.pageType=pageType;
            this.pageTitle=pageTitle;
        }

        this.getdata();
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


    .projectSearchList{
        text-align: left;
    }

    .projectSearchList .disabledDropdown{

    }

    .projectSearchList .van-dropdown-menu__item--disabled .van-dropdown-menu__title::after{
        display: none;
    }
    .projectSearchList .dropdownMenu .van-dropdown-menu__title{
        color: #999999;
    }
    .projectSearchList .dropdownMenu .van-dropdown-menu__title--active{
        color: #FF8C34;
    }
    .projectSearchList .dropdownMenu .van-dropdown-item__option--active{
        color: #FF8C34;
    }
    .projectSearchList .dropdownMenu .van-dropdown-item__option--active .van-dropdown-item__icon{
        color: #FF8C34;
    }

    .projectSearchList .searchBlock .van-search__content{
        border-radius: 10px;
    }


    .projectSearchList .goodsList{
        padding: 0px 15px;
        margin-top: 10px;
    }
    .projectSearchList .goodsItem{
        display: flex;
    }

    .projectSearchList .goodsLeft{

    }
    .projectSearchList .goodsRight{
        margin-left: 10px;
        flex-grow: 1
    }
    .projectSearchList .goodsRightTop{
        color: #333333;
        font-size: 14px;
    }
    .projectSearchList .goodsRightMid{
        font-size: 11px;
        color: #666666;
        display: flex;
        align-items: center;
    }
    .projectSearchList .goodsRightBottom{
        display: flex;
        margin-top: 15px;
        align-items: center;
    }
    .projectSearchList .goodsRightNew{
        color: #FF3434;
        font-size: 15px;
    }
    .projectSearchList .goodsRightOld{
        color: #999999;
        font-size: 11px;
        text-decoration: line-through;
        margin-left: 5px;
    }
    .projectSearchList .goodsRightNum{
        color: #999999;
        font-size: 11px;
        margin-left: auto;
    }

    .projectSearchList .divider{
        border: 1px solid rgba(0,0,0,0.1);
        margin:10px 0px;
    }
</style>