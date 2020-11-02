<template>
	<div class="openInWeiXin">
		<van-icon name="info" class="openInWeiXinIcon" />
		<div>请在微信客户端打开链接</div>
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

	},
	mounted(){

	},
	created(){

	}

}
</script>

<style type="text/css" >
	.openInWeiXin{
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		/*justify-content: center;*/
		margin-top: 20%;
	}

	.openInWeiXinIcon{
		color: #10AEFF;
		font-size: 100px;
		margin-bottom: 20px;
	}
</style>