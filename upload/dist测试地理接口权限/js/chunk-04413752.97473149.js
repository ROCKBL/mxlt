(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04413752"],{"1f93":function(t,i,c){t.exports=c.p+"img/23.8abb1b7d.png"},2238:function(t,i,c){t.exports=c.p+"img/17.0f483bf9.png"},"3fe5":function(t,i,c){t.exports=c.p+"img/18.953467fe.png"},4515:function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABHNCSVQICAgIfAhkiAAAAO1JREFUGFdtkdttwkAURM9ACnAHoQNiUkBCBZQQCrAl6CB0YAn/x3RAB7gBMCVQQgqIMtGuH3Ee+7W6mseduWL03GTPWG/ADFMxmW6VFu89RP3HTb7GBOCYfkV3y54QwT+A9k6P5asv2RU0B25omgaCOuvTIDeA8xp4auduHXzJbqB77F2cT6iVlnV0+/QM6QFYYbbyJXfAaLEf9v8n9CmIBeUK9AIOtiAdlO4rn7MCMQfNYjvyUm42Cf6ouzBEhRhwtHM369qIhJA+7H5EKoAjkIAPWpTraPrd8y+HWELr8ucoA+mcb8BJ38o47Bdjnns1b4ecEQAAAABJRU5ErkJggg=="},"50b4":function(t,i,c){"use strict";var n=c("a16d"),o=c.n(n);o.a},"893b":function(t,i,c){t.exports=c.p+"img/22.246113c2.png"},a16d:function(t,i,c){},a594:function(t,i,c){"use strict";var n=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"product",on:{click:t.onClick}},[n("van-image",{staticClass:"productPic",attrs:{width:"100%",src:t.productInfo.firstImage}}),n("div",{staticClass:"productName"},[t._v(t._s(t.productInfo.name))]),t.productInfo.hospitalName?n("div",{staticClass:"productCompanyWrap"},[n("van-image",{staticClass:"productCompanyPic",attrs:{src:c("4515")}}),n("div",{staticClass:"productCompany"},[t._v(t._s(t.productInfo.hospitalName))])],1):t._e(),t.hasKey("oldPrice")?n("div",{staticClass:"productOldPrice"},[t._v("￥"+t._s(t.productInfo.oldPrice))]):t._e(),n("div",{staticClass:"productPriceWrap"},[n("div",{staticClass:"productPrice"},[t._v("￥"+t._s(t.productInfo.price))]),t.hasKey("sellNum")?n("div",{staticClass:"productSellNum"},[t._v("已售"+t._s(t.productInfo.sellNum))]):t._e(),t._t("btn")],2)],1)},o=[],a=c("4360"),e={name:"",store:a["a"],data:function(){return{}},props:["productInfo"],computed:{},watch:{},components:{},methods:{onClick:function(){this.$emit("clickProduct",this.productInfo)},hasKey:function(t){return t in this.productInfo}},mounted:function(){},created:function(){}},s=e,r=(c("50b4"),c("2877")),l=Object(r["a"])(s,n,o,!1,null,"e675d06e",null);i["a"]=l.exports},ae98:function(t,i,c){t.exports=c.p+"img/21.cf39cfd9.png"},c49a:function(t,i,c){"use strict";c.r(i);var n=function(){var t=this,i=t.$createElement,c=t._self._c||i;return c("div",{staticClass:"myTrack"},[c("van-nav-bar",{staticClass:"pageNavNative",attrs:{title:"足迹","left-arrow":""},on:{"click-left":t.onClickLeft}}),c("van-tabs",{staticClass:"tabs",attrs:{color:"#FF8C34","title-active-color":"#FF8C34","title-inactive-color":"#999999","line-width":"32px"},on:{click:t.onTabsClick},model:{value:t.active,callback:function(i){t.active=i},expression:"active"}},[c("van-tab",{attrs:{title:"商品"}}),c("van-tab",{attrs:{title:"项目"}})],1),0===t.active?c("div",{staticClass:"tracks"},[c("van-list",{staticClass:"productListWrap",attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(i){t.loading=i},expression:"loading"}},[c("div",{staticClass:"productList"},t._l(t.products,(function(i){return c("product",{key:i.id,staticClass:"product",attrs:{productInfo:i},on:{clickProduct:t.clickProduct},scopedSlots:t._u([{key:"btn",fn:function(){return[c("van-icon",{staticClass:"deleteBtn",attrs:{name:"ellipsis"},on:{click:function(c){return c.stopPropagation(),t.clickDelete(i)}}})]},proxy:!0}],null,!0)})})),1)])],1):t._e(),1===t.active?c("div"):t._e(),c("van-popup",{attrs:{position:"bottom",round:""},model:{value:t.actionShowFlag,callback:function(i){t.actionShowFlag=i},expression:"actionShowFlag"}},t._l(t.actionList,(function(i){return c("div",{staticClass:"van-hairline--bottom popupItem",class:"删除"==i?"removeRed":"",on:{click:function(c){return t.actionConfirm(i)}}},[t._v(t._s(i))])})),0)],1)},o=[],a=c("a594"),e=c("2b0e"),s=c("4360"),r=c("b970");c("157a");e["a"].use(r["a"]);var l={name:"",store:s["a"],data:function(){return{active:0,loading:!1,finished:!1,products:[{name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:c("1f93"),id:1},{name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:c("893b"),id:2},{name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:c("ae98"),id:3},{name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:c("3fe5"),id:4},{name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:c("2238"),id:5},{name:"【奥昵玻尿酸0.5ml】守护 年轻的秘密",price:"1400.00",pic:c("f8bd"),id:6}],actionShowFlag:!1,actionList:["请选择","收藏","删除","取消"],productClicked:null}},computed:{},watch:{},components:{product:a["a"]},methods:{onClickLeft:function(){this.$router.go(-1)},init:function(){},onTabsClick:function(){},onLoad:function(){},clickProduct:function(t){console.log(t),this.$router.push({name:"productInfo",query:{product:JSON.stringify(t)}})},clickDelete:function(t){this.actionShowFlag=!0,this.productClicked=t},actionConfirm:function(t){"请选择"!=t&&("收藏"!=t&&"删除"!=t?"取消"==t&&(this.actionShowFlag=!1):this.actionShowFlag=!1)}},mounted:function(){},created:function(){}},u=l,d=(c("cc54"),c("2877")),p=Object(d["a"])(u,n,o,!1,null,null,null);i["default"]=p.exports},cc54:function(t,i,c){"use strict";var n=c("fe97"),o=c.n(n);o.a},f8bd:function(t,i,c){t.exports=c.p+"img/19.2aafcad1.png"},fe97:function(t,i,c){}}]);
//# sourceMappingURL=chunk-04413752.97473149.js.map