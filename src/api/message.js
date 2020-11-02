import request from '@/utils/request'

	export function mdelete(data) {
	    return request({
	      	url: '/user/message/delete',
	      	method: 'delete',
	      	params:data
	    })
	}
	export function mpage(data) {
	    return request({
	      	url: '/user/message/page',
	      	method: 'get',
	      	params:data
	    })
	}
	export function mreadNo(data) {
	    return request({
	      	url: '/user/message/readNo',
	      	method: 'post',
	      	params:data
	    })
	}