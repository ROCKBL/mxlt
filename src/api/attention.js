import request from '@/utils/request'

	export function aAttentionAndCancel(data) {
	    return request({
	      	url: '/user/attention/AttentionAndCancel',
	      	method: 'get',
	      	params:data
	    })
	}


	export function myPage(data) {
	    return request({
	      	url: '/user/attention/myPage',
	      	method: 'get',
	      	params:data
	    })
	}