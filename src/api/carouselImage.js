import request from '@/utils/request'


	export function clist(data) {
	    return request({
	      	url: '/user/carouselImage/list',
	      	method: 'get',
	      	params:data
	    })
	}

