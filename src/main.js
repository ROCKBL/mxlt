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



Vue.config.productionTip = false


import url from "@/utils/url.js"
Vue.prototype.baseUrl=url

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






new Vue({
  router,
  store,
  render: h => h(App),
  methods:{
    getToken(){
      //获取code

    },
  },

  created(){
    // axios.get("http://n3au8y.natappfree.cc:8080/user/loginwechat").then(function(response){
    //   console.log(response)
    // })

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

  }
}).$mount('#app')
