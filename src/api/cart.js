import request from '@/utils/request'

	export function gcartdelete(data) {
	    return request({
	      	url: '/user/goodsCart/delete',
	      	method: 'delete',
	      	// data:data
	      	params:data
	    })
	}
	export function gcartpage(data) {
	    return request({
	      	url: '/user/goodsCart/page',
	      	method: 'get',
	      	params:data
	    })
	}
	export function gcartpublish(data) {
	    return request({
	      	url: '/user/goodsCart/publish',
	      	method: 'post',
	      	params:data
	    })
	}

	export function gcartpublishCoverage(data) {
	    return request({
	      	url: '/user/goodsCart/publishCoverage',
	      	method: 'post',
	      	params:data
	    })
	}