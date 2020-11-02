import request from '@/utils/request'

	export function ulist(data) {
	    return request({
	      	url: '/user/level/list',
	      	method: 'get',
	      	params:data
	    })
	}
	export function ucreateOrder(data) {
	    return request({
	      	url: '/user/agencyGoodOrder/createOrder',
	      	method: 'post',
	      	params:data
	    })
	}