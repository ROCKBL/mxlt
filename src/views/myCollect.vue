<template>
    <div class="myCollect">
        <van-nav-bar title="收藏" left-arrow @click-left="onClickLeft" class="pageNavNative" />
    
        <van-tabs class="tabs" v-model="active" color="#FF8C34" title-active-color="#FF8C34" title-inactive-color="#999999" line-width="32px" @click="onTabsClick">
            <van-tab title="商品"></van-tab>
            <van-tab title="项目"></van-tab>
        </van-tabs>

        <div class="collection" v-if="active===0">
            <van-list class="productListWrap" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="productList">
                    <product class="product" v-for="product in products" :key="product.id" :productInfo="product" @clickProduct="clickProduct">
                        <template #btn>
                            <van-icon class="deleteBtn" name="delete" @click.stop="clickDelete(product)" />
                        </template>
                    </product>
                </div>
            </van-list>

        </div>
        <div v-if="active===1">
            
        </div>

        
    </div>
</template>

<script type="text/javascript">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import product from '@/components/product.vue'

import Vue from 'vue'
import store from '@/store'

// // 手动引入vant单个组件
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';

import Vant from 'vant'
import 'vant/lib/index.css'
import { Dialog } from 'vant';

Vue.use(Vant)

// 阿里图标文件
// import "@/assets/iconfont/iconfont.css";


export default {
  	name: '',
  	store,
  	data(){
		return{
            active:0,

            loading:false,
            finished:false,
            
            products:[
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/23.png"),id:1},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/22.png"),id:2},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/21.png"),id:3},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/18.png"),id:4},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/17.png"),id:5},
                {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/19.png"),id:6},
                
            ],
		}
  	},
  	computed:{

  	},
  	watch:{},
  	components: {
        product
  	},
  	methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        init(){
            // 初始化界面数据
        },
        onTabsClick(){},
        onLoad(){
            // 列表下拉加载
            // console.log("aax")
            // var that=this;
            // setTimeout(function(){
            //     that.products=that.products.concat(that.addproducts)
            //     that.loading=false
            // },5000)
        },
        clickProduct(product){
            // console.log(product)
            // 跳转产品页
            console.log(product)
            this.$router.push({ 
                name: 'productInfo',
                query: { product:JSON.stringify(product), }
            })
        },
        clickDelete(product){
            Dialog.confirm({
                title: '',
                message: '确认删除该商品？',
            }).then(() => {
                // on confirm
            }).catch(() => {
                // on cancel
            });
        }
  	},
  	mounted(){


  	},
  	created(){
        // 初始化数据

    }

}
</script>

<style type="text/css">
    .pageNavNative{
        height: 66px;
        background-color: #FF8C34;
    }
    .myCollect .pageNavNative .van-nav-bar__title{
        color: white;
        font-size: 19px;
        /*font-weight: 500;*/
    }
    .pageNavNative .van-icon{
        color: white;
        font-size:20px;
    }
    
    .pageNavNative .navLeftIcon{
        margin-right: 10px;
    }
    
    .myCollect{
        text-align: left;
    }

    .myCollect .tabs{
        width: 50%;
        margin:0px auto;
        
    }
    .myCollect .tabs .van-tab__text{
        font-size: 16px;
        font-weight: bold;
    }

    .myCollect .collection{
        width: calc(100% - 20px);
        margin:10px auto;
    }

    .myCollect .productList{
        /*width: calc(100% - 20px);*/
        margin: 20px auto;
        display: flex;
        flex-wrap: wrap;

    }
    .myCollect .product{
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin:5px 5px;
        box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
        border-radius:10px;

    }
    .myCollect .deleteBtn{
        margin-left: auto;
    }
</style>