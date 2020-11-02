<template>
	<div class="">
		<van-nav-bar title="收货地址"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		
		<div v-for="item in addressList" class="addressItem">
			<div class="addressInfo ">
				<div class="addressInfoAddress">{{ item.province }}-{{ item.city }}-{{ item.area }}{{ item.address }}</div>
				<div class="addressInfoItemWrap">
					<div class="addressInfoName">{{ item.name }}</div>
					<div class="addressInfoPhone">{{ item.phone }}</div>
				</div>
			</div>

			<div class="addressBtns">
				<div class="addressChecked" v-if="item.defaultIs"><van-icon name="checked" class="setDafultAddressIcon" />默认地址</div>
				<div class="addressUnChecked" v-else @click="setDafultAddress(item)"><van-icon name="circle" class="setDafultAddressIcon" />设为默认地址</div>
				<div class="addressBtnsEdite" @click="editeAddress(item)"><van-icon name="edit" />编辑</div>
				<div class="addressBtnsRemove" @click="deleteAddress(item)"><van-icon name="delete" />删除</div>
			</div>
		</div>

		
		<van-button class="addNewBtn"  @click="addNew">新增地址</van-button>
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

// import Vant from 'vant';
// import 'vant/lib/index.css';
import { Dialog } from 'vant';

// Vue.use(Vant);
Vue.use(Dialog);

import { asetDefault,amyPage,adelete } from '@/api/address'

import { mapState } from 'vuex'

export default {
	name: '',
	store,
	data(){
		return{
			addressList:[
				// {name:"陈某某",defaultFlag:"1",address:"浙江省-温州市-龙湾区浙南云谷X幢",phone:"13858718329",},
				// {name:"陈某某",defaultFlag:"0",address:"浙江省-温州市-龙湾区浙南云谷X幢",phone:"13858718329",}
			]
			
		}
	},
	computed:{
		...mapState({
            userInfo(state){ return state.userInfo},
        })
	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
	    addNew(){
	    	this.$router.push('/addAddress')
	    },
	    deleteAddress(o){
	    	var that=this

	    	Dialog.confirm({
			  title: '',
			  message: '确认删除地址?',
			})
			  .then(() => {
			    // on confirm
			    // console.log(1)
			    adelete({
			    	id:o.id
			    }).then(function(response){
			    	that.getData()
			    })
			  })
			  .catch(() => {
			    // on cancel
			    console.log(2)
			  });
	    },
	    editeAddress(o){
	    	this.$router.push({
                name:"editeAddress",
                query: {
                    o:JSON.stringify(o)
                    // o:o
                }
            })
	    },
	    setDafultAddress(o){
	    	// 设置默认地址
	    	console.log(o)

	    	var that=this;
	    	asetDefault({
	    		id:o.id
	    	}).then(function(response){
	    		that.getData()
	    	})

	    },
	    getData(){
	    	var that=this;
	    	amyPage({
	    		start:1,
	    		limit:9999,
	    		consumerId:this.userInfo.id
	    	}).then(function(response){
	    		// console.log(response)
	    		that.addressList=response.result.items

	    	})
	    }
	},
	mounted(){

	},
	created(){
		var that=this;

		store.state.userPromiseFlag.then(function(){
			that.getData()

		})
		
	}

}
</script>

<style type="text/css" >
	.pageNavNative{
		height: 66px;
		background-color: #FF8C34;
	}
	.pageNavNative .van-nav-bar__title{
        color: white;
        font-size: 18px;
        /*font-weight: 500;*/
    }
    .pageNavNative .van-icon{
        color: white;
        font-size:20px;
    }

	.addNewBtn{
		margin:20px 0px;
		border-radius: 10px;
		width: 70%;
		background:rgba(255,140,52,1);
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		color: white;
	}

	.addressItem{
		width: calc(100% - 20px);
		margin:15px auto;
		border-radius:10px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		padding: 10px;
		box-sizing: border-box;
	}

	.addressBtns{
		display: flex;
		padding: 5px;
		align-items: center;
		font-size: 12px;
		color:rgba(153,153,153,1);
	}
	.addressBtnsEdite{
		margin-left: auto;
		display: flex;
		align-items: center;
	}
	.addressBtnsRemove{
		display: flex;
		align-items: center;
		margin-left: 10px;
	}

	.addressChecked{
		display: flex;
		align-items: center;
	}
	.addressUnChecked{
		display: flex;
		align-items: center;
	}
	.setDafultAddressIcon{
		margin-right: 5px;
		font-size: 16px;
	}

	.addressChecked .setDafultAddressIcon{
		color: #FF8C34
	}
	

	.addressInfo{
		text-align: left;
		border-bottom: 1px solid rgba(0,0,0,0.11);
		margin-bottom: 10px;
	}
	.addressInfoAddress{
		font-weight:400;
		font-size: 14px;
		margin-bottom: 10px;
	}
	.addressInfoItemWrap{
		display: flex;
		color:rgba(102,102,102,1);
		font-size:14px;
		margin-bottom: 10px;
	}
	.addressInfoPhone{
		margin-left: auto;

	}
</style>