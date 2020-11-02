import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

import { uinfo } from "@/api/user.js"

export default new Vuex.Store({
  state: {
  	token:null,//区别用户
  	// token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdXRoMCIsInd4X21lbWJlcl9pZCI6IjEyIiwiX3ltX2NsaWVudF8iOiJtYW5hZ2UifQ.wzzSQFOk1chpvb7KJv_pbxnFmK4UBlv4G7wIPVy0A6E",
  	// token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdXRoMCIsInd4X21lbWJlcl9pZCI6IjUiLCJfeW1fY2xpZW50XyI6Im1hbmFnZSJ9.tOxm5pAlFsOLpZiw5rBg7SnZhZnDuRFbB53qZ37Y-fg",
    // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdXRoMCIsInd4X21lbWJlcl9pZCI6IjEyIiwiX3ltX2NsaWVudF8iOiJtYW5hZ2UifQ.wzzSQFOk1chpvb7KJv_pbxnFmK4UBlv4G7wIPVy0A6E",
    jssdk:{},//调用微信js-sdk签字
    userInfo:{},

    userPromiseFlag:null,
    // redirectUrl:""
  },
  mutations: {
  	setToken(state,token){
  		state.token=token
  	},
  	setJssdk(state,obj){
  		state.jssdk=obj
  	},
    setUserInfo(state,obj){
      state.userInfo=obj
    },

    setUserPromiseFlag(state,obj){
      state.userPromiseFlag=obj
    },

    // setRedirectUrl(state,obj){
    //   state.redirectUrl=obj
    // }
  },
  actions: {
  	getToken({ commit, state },code){
  		// 获取token，设置token

  		// return new Promise(function(resolve,reject){
    //         var url_user=url+"/com/emplyee/queryByUserId";
    //         axios({
    //             method: 'get',
    //             url: url_user,
    //         }).then(function(response) {
    //             var data=response.data
    //             if(data.code==200){

    //                 commit('setUserInfo', data.result)

    //                 resolve("ok")

    //             }else{

    //                 resolve("网络错误")
    //             }
    //         }).catch(function(response){
    //             reject(response)
    //         })
    //     })
  	},
  	getJssdk({ commit, state }){
  		// 获取jssdk，设置jssdk

  		// return new Promise(function(resolve,reject){
    //         var url_user=url+"/com/emplyee/queryByUserId";
    //         axios({
    //             method: 'get',
    //             url: url_user,
    //         }).then(function(response) {
    //             var data=response.data
    //             if(data.code==200){

    //                 commit('setUserInfo', data.result)

    //                 resolve("ok")

    //             }else{

    //                 resolve("网络错误")
    //             }
    //         }).catch(function(response){
    //             reject(response)
    //         })
    //     })
  	},
    getUserInfo({ commit, state }){
      // return new Promise(function(resolve,reject){
      //   var url_user=url+"/user/info";
      //   axios({
      //     method: 'get',
      //     url: url_user,
      //   }).then(function(response){
      //     console.log(response)
      //     // commit('setUserInfo', data.result)
      //     // resolve("ok")

      //   }).catch(function(response){
      //     reject(response)
      //   })

      // })

      var flag=uinfo().then(function(response){
        commit("setUserInfo",response.result)
      })

      commit("setUserPromiseFlag",flag)
      
      return flag
    },
  },
  modules: {
  }
})
