<template>
	<div class="addAddress">
		<van-nav-bar title="添加收货地址"  left-arrow class="pageNavNative" @click-left="onClickLeft" />


		<div class="addressForm">

			<van-field v-model="form.name" label="收货人" placeholder="请输入收货人姓名" />
			<van-field v-model="form.phone" label="联系电话" placeholder="请输入手机号码" />
			
			<van-field v-model="areaStr" label="所在区域" placeholder="请选择区域" readonly @click="pickArea">
				<template #right-icon>
				    <van-icon name="arrow" />
				</template>
			</van-field>
			
			<van-field v-model="form.address" label="详细地址" placeholder="请输入详细地址" />

			<van-field label="设为默认地址" placeholder="" readonly >
				<template #button>
					<van-switch class="hookSwitch" v-model="form.defaultIs" size="18px" active-color="rgba(255,140,52,1)" />
				</template>
			</van-field>

		</div>
		
		<van-popup v-model="areaShowFlag" position="bottom"  round>
			<van-area title="" :area-list="areaList" @confirm="areaConfirm" @cancel="areaCancle" />
		</van-popup>

		<van-button class="addNewBtnSubmit" v-if="type=='add'"  @click="addNewBtnSubmit">确认添加</van-button>
		<van-button class="addNewBtnSubmit" v-else  @click="addNewBtnSubmit">确认修改</van-button>
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

import { Area } from 'vant';
import areaList from '@/area/area.js';

// Vue.use(Vant);

Vue.use(Area);

import { apublish,amodify } from '@/api/address'



export default {
	name: '',
	store,
	data(){
		return{
			form:{
				name:"",
				phone:"",
				address:"",
				defaultIs:true,
				province:"",
				cityNo:"",//省份编码
				area:"",
				city:""

			},

			// 地区选择
		    // areaStr:null,
		    areaShowFlag:false,
		    areaList:areaList,

		    type:"add",//add:新建，edite：编辑
		}
	},
	computed:{
		areaStr(){
			return this.form.province+this.form.city+this.form.area
		}
	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        testPhone(phone){
        	if(!(/^1[3456789]\d{9}$/.test(phone))){
        		this.Toast("请输入正确的手机号码")
		        return false; 
		    } 
		    return true
        },
        addNewBtnSubmit(){
        	var that=this;
        	if(!this.testPhone(this.form.phone)){
        		return
        	}
        	

        	if(this.form.name==""){
    			this.Toast("请输入姓名")
    			return
    		}
    		if(this.form.phone==""){
    			this.Toast("请输入手机号码")
    			return
    		}
    		if(this.form.address==""){
    			this.Toast("请输入详细地址")
    			return
    		}
    		if(this.form.province==""){
    			this.Toast("请选择省市区")
    			return
    		}
        	if(this.type=="add"){
        		apublish(this.form).then(function(response){
        			// console.log(response)
        			that.$router.go(-1)
        		})
        	}
        	if(this.type=="edite"){
        		amodify(this.form).then(function(response){
        			// console.log(response)
        			that.$router.go(-1)
        		})
        	}

        },

        pickArea(){
        	this.areaShowFlag=true
        },
        areaConfirm(val){
        	this.areaShowFlag=false
	    	console.log(val)
	    	// this.areaStr=""
	    	// for(var o of val){
	    	// 	this.areaStr+=o.name
	    	// 	console.log(o)
	    	// }
	    	this.form.province=val[0].name
	    	this.form.cityNo=val[0].code
	    	this.form.city=val[1].name
	    	this.form.area=val[2].name
        },
        areaCancle(){
        	this.areaShowFlag=false
        }

	},
	mounted(){

	},
	created(){
		
		if(this.$router.currentRoute.query.o){
			var o=JSON.parse(this.$router.currentRoute.query.o);
			this.type="edite"
			this.form=o
		}
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
	
	.addAddress .addNewBtnSubmit{
		margin:20px 0px;
		border-radius: 10px;
		width: 70%;
		background:rgba(255,140,52,1);
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		color: white;
	}
    
    .addAddress .addressForm{
		width: calc(100% - 20px);
		margin:auto;
		border-radius: 15px;
		box-shadow:0px 3px 6px rgba(0,0,0,0.16);
		padding:10px;
		margin-top: 20px;
		box-sizing: border-box;
	}

	.addAddress .hookSwitch{
		display: flex;
		align-items: center;
	}
</style>