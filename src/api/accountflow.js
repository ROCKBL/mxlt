import request from '@/utils/request'

	export function amyFlow(data) {
	    return request({
	      	url: '/accountFlow/myFlow',
	      	method: 'get',
	      	params:data
	    })
	}