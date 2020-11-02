<template>
	<div class="payRtn">
		<van-nav-bar title="支付结果"  left-arrow class="pageNavNative" @click-left="onClickLeft" />
		<div class="successPay">
			<van-icon name="checked" class="successPayIcon" />
			<div>支付成功</div>
		</div>
	</div>
</template>

<script type="text/javascript">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import Vue from 'vue';
import store from '@/store';



export default {
	name: '',
	store,
	data(){
		return{

		}
	},
	computed:{

	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
	},
	mounted(){

	},
	created(){

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

	.payRtn .successPay{
		height: calc(80vh - 60px);
		display: flex;
		flex-direction: column;
		align-items: center;
		/*justify-content: center;*/
		margin-top: 20%;
	}

	.payRtn .successPayIcon{
		color: #10AEFF;
		font-size: 100px;
		margin-bottom: 20px;
	}
</style>