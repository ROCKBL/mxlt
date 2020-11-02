import request from '@/utils/request'

	export function bpage(data) {
	    return request({
	      	url: '/user/bill/page',
	      	method: 'get',
	      	params:data
	    })
	}