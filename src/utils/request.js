import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { Toast } from 'vant';
import store from '@/store'


import baseUrl from '@/utils/url'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: "http://127.0.0.1:12345",
  baseURL: baseUrl,
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})


var toast=null

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.state.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      
      // var token=JSON.parse(getToken())
      // config.headers['_ym_token_'] = token['ym_token_']
      // config.headers['__userid__'] = token['_userid__']
      // config.headers['_ym_client_'] = token['ym_client_']

      config.headers["_ym_token_wx_"]=store.state.token
    }

    if(!toast){
      toast=Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '数据加载中...',
      })
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data

    Toast.clear();
    toast=null;

    if(res.code==1){
      return res
    }else{
      // Message({
      //   message: res.msg ,
      //   type: 'error',
      //   duration: 5 * 1000
      // })


      // console.log(res)
      // console.log(res.code)
      // console.log(res.msg)

      Toast.fail(res.msg);

      // if(res.msg=="未登录"){
      //   // console.log(window.location.href)
      //   store.commit("setRedirectUrl",window.location.href)
      // }
      if(res.msg=="未登录"){
        window.location.href="http://www.meixiangletao.com/user/loginwechat"
      }


      return Promise.reject(new Error(res.msg))
    }

    
  },
  error => {
    // console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    Toast.clear();
    toast=null;

    console.log(error.message)

    Toast.fail(error.message);
    return Promise.reject(error)
  }
)

export default service
