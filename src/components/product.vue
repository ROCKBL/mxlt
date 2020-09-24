<template>
  <div class="product" @click="onClick">
      <van-image class="productPic" width="100%"  :src="productInfo.pic" />
      <div class="productName">{{ productInfo.name }}</div>
      <div class="productCompanyWrap" v-if="productInfo.company">
        <van-image class="productCompanyPic" :src="require('../assets/imgs/196.png')" />
        <div class="productCompany">{{ productInfo.company }}</div>
      </div>
      <div class="productOldPrice" v-if=" hasKey('oldPrice') ">￥{{ productInfo.oldPrice }}</div>
      <div class="productPriceWrap">
        <div class="productPrice">￥{{ productInfo.price }}</div>
        <div class="productSellNum" v-if=" hasKey('sellNum') " >已售{{ productInfo.sellNum }}</div>

        <slot name="btn"></slot>
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

  	}
  },
  props: ['productInfo'],
  computed:{},
  watch:{},
  components: {
    // HelloWorld
  },
  methods:{
    onClick(){
      // console.log(this.productInfo)
      this.$emit('clickProduct', this.productInfo)
    },
    hasKey(s){
      return s in this.productInfo
    }
  },
  mounted(){

  },
  created(){}

}
</script>

<style type="text/css" scoped>
  .product{
    text-align: left;
    padding: 5px 5px;
    padding-bottom: 10px;
  }
  .productName{
    font-size: 14px;
    margin:10px 0px;
  }
  .productCompanyWrap{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .productCompany{
    color: #FFCE6D;
    font-size: 12px;
    line-height: 11px;

  }
  .productOldPrice{
    color:rgba(153, 153, 153, 1);
    text-decoration: line-through;
    font-size: 14px;

  }
	.productPriceWrap{
    display: flex;
    align-items: center;
  }
  .productPrice{
    font-size: 16px;
    color: #FF3434;
    font-weight: bold;
  }
  .productSellNum{
    margin-left: auto;
    color: #999999;
    font-size: 11px;
    margin-right: 5px;
  }


</style>