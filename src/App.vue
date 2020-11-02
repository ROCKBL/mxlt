<template>
  <div id="app1">
   <!--  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>

    <van-dialog v-model="showDialog" :showConfirmButton="false" >
      <template>
        <div style="padding: 20px;">
          <div class="title">用户须知</div>
          <!-- <div style="font-size: 12px;color: black;text-align: left;margin:20px 0px;">
            <div style="margin-bottom: 10px;">1.这里是用户须知和用户协议</div>
            <div style="margin-bottom: 10px;">1.这里是用户须知和用户协议</div>
            <div style="margin-bottom: 10px;">1.这里是用户须知和用户协议</div>
            <div style="margin-bottom: 10px;">1.这里是用户须知和用户协议</div>
            <div style="margin-bottom: 10px;">1.这里是用户须知和用户协议</div>
          </div> -->
          <div style="font-size: 12px;color: black;text-align: left;margin:20px 0px;" v-html="agreeContent">
            
          </div>
          <van-checkbox v-model="agree" shape="square" style="font-size: 12px;margin-bottom: 10px;" icon-size="12px" class="agreeCheckBox">我已认真阅读并同意以上协议</van-checkbox>
          <van-button :disabled="!agree" type="info" @click="agreeit" style="width: 60%;height: 36px;">确认</van-button>
        </div>
      </template>
    </van-dialog>
  </div>
</template>


<script type="text/javascript">
  import store from '@/store';
  import { mapState } from 'vuex'
  import { umodifyInfo,sysgetContract } from '@/api/user'

  export default {
    name: '',
    store,
    data(){
      return{
        // showDialog:false,
        agree:false,
        agreeContent:null,
      }
    },
    computed:{
        ...mapState({
            userInfo(state){ return state.userInfo},
        }),
        showDialog(){
          if(!this.userInfo.hasOwnProperty('contractIs')){
            return false
          }

          return !this.userInfo.contractIs
        }
    },
    watch:{},
    components: {

    },
    methods:{
      agreeit(){
        // 同意协议
        umodifyInfo({
            contractIs:true,
          }).then(function(res){
            // console.log(res)
            store.dispatch("getUserInfo").then(function(){
              // console.log(store)
          })
        })
      },
      agreeDetail(){
        var that=this;
        sysgetContract().then(function(res){
          // console.log(res)
          that.agreeContent=res.result.contract
        })
      }

    },
    mounted(){

    },
    created(){
      var that=this;
        // 初始化数据
      store.state.userPromiseFlag.then(function(){
          if(!store.state.userInfo.contractIs){
            that.showDialog=true
          }

      })

      this.agreeDetail()
    }
  }

</script>


<style lang="less">
  #app1 {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  
</style>
