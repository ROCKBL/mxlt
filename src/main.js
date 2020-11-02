import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Toast } from 'vant';
Vue.use(Toast);
Vue.prototype.Toast=Toast
import { Dialog } from 'vant';


Vue.config.productionTip = false


import url from "@/utils/url.js"
Vue.prototype.baseUrl=url

// 图片服务器地址
Vue.prototype.picBaseUrl="http://ty-oss-001.oss-cn-hangzhou.aliyuncs.com"

// Vue.prototype.baseUrl="http://172.16.17.133:8080"

Date.prototype.Format = function(fmt) {
    //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


// 阿里图标
import "@/assets/iconfont/iconfont.css";


import { wxSign,createOrder } from '@/api/wxsign'

new Vue({
  router,
  store,
  render: h => h(App),


  methods:{
    getToken(){
      //获取token
      var ar=window.location.search.substr(1).split("&")
      for(var i=0;i<ar.length;i++){
        var xx=ar[i].split("=")
        if(xx[0]=="_ym_token_wx_"){
          store.commit('setToken',xx[1]) 
        }
      }

    },
    getUserInfo(){
      var that=this;
      store.dispatch("getUserInfo").then(function(){
        // console.log(store)
        

      })
    },



    test(rtn){
      WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
             "appId":rtn.appId,     //公众号名称，由商户传入     
             "timeStamp":rtn.timeStamp,         //时间戳，自1970年以来的秒数     
             "nonceStr":rtn.nonceStr, //随机串     
             "package":rtn.package,     
             "signType":rtn.signType,         //微信签名方式：     
             "paySign":rtn.paySign //微信签名 
          },
          function(res){
            console.log(res)
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
            // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            } 
       }); 
    },
    initJsSdk(after){
      // console.log(window.location.href.split("#")[0])
      // alert(window.location.href.split("#")[0])
      // console.log(encodeURIComponent(window.location.href.split("#")[0]))
      // 后台获取微信签名
      var url=window.location.href.split("#")[0]
      wxSign({
        url:url
      }).then(function(res){
        var rtn=res.result;
        wx.ready(function(){
          // console.log("授权成功！")
          if(after){
            after()
          }
        })

        wx.error(function(res){
            console.log(res)
        });

        // console.log(rtn)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: rtn.appId, // 必填，公众号的唯一标识
          timestamp: rtn.timestamp, // 必填，生成签名的时间戳
          nonceStr: rtn.noncestr, // 必填，生成签名的随机串
          signature: rtn.signature,// 必填，签名
          jsApiList: ["chooseWXPay","openLocation","updateAppMessageShareData","updateTimelineShareData"] // 必填，需要使用的JS接口列表
          // jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
          // jsApiList: ["openLocation"] // 必填，需要使用的JS接口列表
          // jsApiList:[]
        });
      })

      

    },

    jssdk(){
      var that=this;

      wxSign().then(function(res){
        console.log(res)
        var rtn=res.result
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: rtn.appId, // 必填，公众号的唯一标识
          timestamp: rtn.timestamp, // 必填，生成签名的时间戳
          nonceStr: rtn.noncestr, // 必填，生成签名的随机串
          signature: rtn.signature,// 必填，签名
          jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
        });

        wx.ready(function(){
          console.log("成功注册config了")

          createOrder({
            "projectId":1,
            "appointmentTime":"2019-10-10 03:02:02",
            "industry": "高危行业程序员",
            "experience": true
            ,"history":true
            ,"phone":15985859998
            ,"sex":0
            ,"name":"提莫"
            ,"nickname":"GGGGG"
            ,"area":"12321321"
            ,"budgetMoney":123
            ,"other":"DD又大了一圈"

        }).then(function(res){
          console.log(res)
          var rtn=res.result

          wx.chooseWXPay({
            timestamp: rtn.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: rtn.nonceStr, // 支付签名随机串，不长于 32 位
            package: rtn.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: rtn.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: rtn.paySign, // 支付签名
            success: function (res) {
              console.log(res)
              // 支付成功后的回调函数
            }
          });

          that.test(rtn)


        })

          

        })

        wx.error(function(res){
          console.log(res)
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });        

      })

    },

    isWeixin () {
      let wx = navigator.userAgent.toLowerCase()
      if (wx.match(/MicroMessenger/i) === 'micromessenger') {
        return true
      } else {
        return false
      }
    }

  },

  created(){


    // console.log(store)
    // axios({
    //   method: 'get',
    //   url: url+'/user/projectCategory/list',
    //   headers:{
    //     "_ym_token_wx_":store.state.token

    //   }
    // }).then(function(response){
    //   console.log(response)
    // })

    var weixinflag=this.isWeixin()
    if(!weixinflag){
      // 跳转到提示不是微信打开

      // this.$router.replace("/openInWeiXin")
    }

    this.getToken()

    // 获取用户信息存储到store
    this.getUserInfo()

    this.initJsSdk()

  }
}).$mount('#app')
