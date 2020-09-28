import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
  state: {
  	// token:null,//区别用户
  	token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdXRoMCIsInd4X21lbWJlcl9pZCI6IjMiLCJfeW1fY2xpZW50XyI6Im1hbmFnZSJ9.7nzTvAY6s7GTrC6whgEOCYHjw1qNflKN-KN0ezdvziM",
  	jssdk:{},//调用微信js-sdk签字
  },
  mutations: {
  	setToken(state,token){
  		state.token=token
  	},
  	setJssdk(state,obj){
  		state.jssdk=obj
  	}
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
  	}
  },
  modules: {
  }
})
