import request from '@/utils/request'

// 项目分类接口
	export function plist(data) {
	    return request({
	      	url: '/user/projectCategory/list',
	      	method: 'get',
	      	params:data
	    })
	}

// 项目接口
	export function pdetail(data) {
	    return request({
	      	url: '/user/project/detail',
	      	method: 'get',
	      	params:data
	    })
	}

	export function ppage(data) {
	    return request({
	      	url: '/user/project/page',
	      	method: 'get',
	      	params:data
	    })
	}


// 项目预约订单
	export function pcreateOrder(data) {
	    return request({
	      	url: '/user/projectOrder/createOrder',
	      	method: 'post',
	      	data:data
	    })
	}




	export function pdelete(data) {
	    return request({
	      	url: '/user/projectOrder/delete',
	      	method: 'delete',
	      	params:data
	    })
	}
	export function pdetails(data) {
	    return request({
	      	url: '/user/projectOrder/details',
	      	method: 'get',
	      	params:data
	    })
	}
	export function pmodifyConfirm(data) {
	    return request({
	      	url: '/user/projectOrder/modifyConfirm',
	      	method: 'post',
	      	params:data
	    })
	}

	export function pcomsunerModifyConfirm(data) {
	    return request({
	      	url: '/user/projectOrder/comsunerModifyConfirm',
	      	method: 'get',
	      	params:data
	    })
	}

	export function pmyPage(data) {
	    return request({
	      	url: '/user/projectOrder/myPage',
	      	method: 'get',
	      	params:data
	    })
	}
	export function psendPay(data) {
	    return request({
	      	url: '/user/projectOrder/sendPay',
	      	method: 'post',
	      	params:data
	    })
	}

	export function papply(data) {
	    return request({
	      	url: '/user/projectOrder/apply',
	      	method: 'post',
	      	params:data
	    })
	}
	