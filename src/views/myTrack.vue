<template>
    <div class="myTrack">
        <van-nav-bar title="足迹" left-arrow @click-left="onClickLeft" class="pageNavNative" />
    
        <van-tabs class="tabs" v-model="active" color="#FF8C34" title-active-color="#FF8C34" title-inactive-color="#999999" line-width="32px" @click="onTabsClick">
            <van-tab title="商品"></van-tab>
            <van-tab title="项目"></van-tab>
        </van-tabs>

        <div class="tracks" v-if="active===0">
            <van-list class="productListWrap" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="productList">
                    <product class="product" v-for="product in products" :key="product.id" :productInfo="product" @clickProduct="clickProduct">
                        <template #btn>
                            <van-icon class="deleteBtn" name="ellipsis" @click.stop="clickDelete(product)" />
                        </template>
                    </product>
                </div>
            </van-list>

        </div>
        <div v-if="active===1">
            
        </div>

        <van-popup v-model="actionShowFlag" position="bottom"  round>
            <div class="van-hairline--bottom popupItem" :class="item=='删除'?'removeRed':''" v-for="item in actionList" @click="actionConfirm(item)">{{ item }}</div>
        </van-popup>
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

            actionShowFlag:false,
            actionList:["请选择","收藏","删除","取消"],
            productClicked:null,// 被点击弹出选择框的日记
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
            this.actionShowFlag=true
            this.productClicked=product
        },
        actionConfirm(item){
            if(item=="请选择"){
                return
            }
            if(item=="收藏"){
                this.actionShowFlag=false
                // 跳转
                // this.$router.replace({
                //     name:"diaryRecord",
                //     query:{
                //         diaryId:"1"
                //     }
                // })
                return
            }
            if(item=="删除"){
                this.actionShowFlag=false
                // 删除
                return
            }
            if(item=="取消"){
                this.actionShowFlag=false
            }
            
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
    .myTrack .pageNavNative .van-nav-bar__title{
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
    
    .myTrack{
        text-align: left;
    }

    .myTrack .tabs{
        width: 50%;
        margin:0px auto;
        
    }
    .myTrack .tabs .van-tab__text{
        font-size: 16px;
        font-weight: bold;
    }

    .myTrack .tracks{
        width: calc(100% - 20px);
        margin:10px auto;
    }

    .myTrack .productList{
        /*width: calc(100% - 20px);*/
        margin: 20px auto;
        display: flex;
        flex-wrap: wrap;

    }
    .myTrack .product{
        width: calc(50% - 10px);
        box-sizing: border-box;
        margin:5px 5px;
        box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
        border-radius:10px;

    }
    .myTrack .deleteBtn{
        margin-left: auto;
    }

    .myTrack .removeRed{
        color: red;
    }
    .myTrack .popupItem{
        padding: 10px 0px;
        text-align: center;
    }
</style>