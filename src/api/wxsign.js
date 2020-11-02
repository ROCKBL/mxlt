import request from '@/utils/request'

	export function wxSign(data) {
	    return request({
	      	url: '/user/wxSign',
	      	method: 'get',
	      	params:data
	    })
	}

	export function createOrder(data) {
	    return request({
	      	url: '/user/projectOrder/createOrder',
	      	method: 'post',
	      	data:data
	    })
	}