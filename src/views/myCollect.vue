<template>
    <div class="myCollect">
        <van-nav-bar title="收藏" left-arrow @click-left="onClickLeft" class="pageNavNative" />
    
        <van-tabs class="tabs" v-model="active" color="#FF8C34" title-active-color="#FF8C34" title-inactive-color="#999999" line-width="32px" @click="onTabsClick">
            <van-tab title="商品"></van-tab>
            <van-tab title="项目"></van-tab>
        </van-tabs>

        <div class="collection" >
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

import { mapState } from 'vuex'
import { pclpage,gclpage,pclcollectionAndCancel,gclcollectionAndCancel } from '@/api/collect'

export default {
  	name: '',
  	store,
  	data(){
		return{
            active:0,

            loading:true,
            finished:false,
            pageNum:1,
            total:0,
            
            products:[
                // {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/23.png"),id:1},
                // {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/22.png"),id:2},
                // {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/21.png"),id:3},
                // {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/18.png"),id:4},
                // {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/17.png"),id:5},
                // {name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:require("../assets/imgs/19.png"),id:6},
                
            ],
		}
  	},
  	computed:{
        ...mapState({
            userInfo(state){ return state.userInfo},
        })
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
        onTabsClick(){
            // 获取数据
            this.getData()
        },
        onLoad(){
            // 列表下拉加载
            // console.log("aax")
            // var that=this;
            // setTimeout(function(){
            //     that.products=that.products.concat(that.addproducts)
            //     that.loading=false
            // },5000)
            var that=this;
            this.pageNum+=1;

            this.getData(this.pageNum).then(function(){
                that.loading=false
                if(that.products.length==that.total){
                    that.finished=true
                    return
                }
            });
        },
        clickProduct(product){
            // console.log(product)
            // 跳转产品页
            console.log(product)
            if(product.goodsDeleteTime){
                // this.Toast("该商品已被删除，无法访问，请及时删除")
                return
            }

            if(this.active==1){
                product.id=product.projectId
                this.$router.push({ 
                    name: 'productInfo',
                    query: { product:JSON.stringify(product), }
                })
            }
            if(this.active==0){
                product.id=product.goodsId
                this.$router.push({ 
                    name: 'goodsInfo',
                    query: { product:JSON.stringify(product), }
                })
            }
            
        },
        clickDelete(product){
            var message="确认删除该商品？"
            if(this.active==1){
                message="确认删除该项目？"
            }
            var that=this;

            Dialog.confirm({
                title: '',
                message: message,
            }).then(() => {
                // on confirm
                if(this.active==1){
                    pclcollectionAndCancel({
                        projectId:product.projectId
                    }).then(function(){
                        that.getData()
                    })
                }
                if(this.active==0){
                    gclcollectionAndCancel({
                        goodsId:product.goodsId
                    }).then(function(){
                        that.getData()
                    })
                }

            }).catch(() => {
                // on cancel
            });
        },
        getData(pageNum){
            if(!pageNum){
                this.total=null
                this.products.length=0
            }
            if(this.active==1){
                return this.getpclData(pageNum)
            }
            if(this.active==0){
                return this.getgclData(pageNum)
            }
        },
        getpclData(pageNum){
            pageNum=pageNum||1
            var that=this;
            return pclpage({
                consumerId:this.userInfo.id,
                limit:20,
                start:pageNum
            }).then(function(response){
                that.total=response.result.total
                // 处理成符合productInfo的数据格式
                var ar=response.result.items.map(function(o){
                    o.firstImage=o.projectImages
                    o.name=o.projectName
                    o.price=o.projectPrice
                    return o
                })

                that.products=that.products.concat(ar)
            })
        },
        getgclData(pageNum){
            pageNum=pageNum||1
            var that=this;
            return gclpage({
                consumerId:this.userInfo.id,
                limit:20,
                start:pageNum
            }).then(function(response){
                that.total=response.result.total
                // 处理成符合productInfo的数据格式
                var ar=response.result.items.map(function(o){
                    o.firstImage=o.goodsImages
                    o.name=o.goodsName
                    o.price=o.goodsPrice
                    return o
                })

                that.products=that.products.concat(ar)
            })
        },


  	},
  	mounted(){


  	},
  	created(){
        var that=this;
        // 初始化数据
        store.state.userPromiseFlag.then(function(){

            that.getData().then(function(){
                that.loading=false
                if(that.products.length==that.total){
                    that.finished=true
                    return
                }
            });

        })

        
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