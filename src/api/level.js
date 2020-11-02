import request from '@/utils/request'

	// todo
	export function llist(data) {
	    return request({
	      	url: '/user/level/list',
	      	method: 'get',
	      	params:data
	    })
	}