import request from '@/utils/request'
	
	export function bdelete(data) {
	    return request({
	      	url: '/user/bank/delete',
	      	method: 'delete',
	      	params:data
	    })
	}

	export function bgetDefalut(data) {
	    return request({
	      	url: '/user/bank/getDefalut',
	      	method: 'post',
	      	params:data
	    })
	}

	export function bmodfiy(data) {
	    return request({
	      	url: '/user/bank/modfiy',
	      	method: 'post',
	      	params:data
	    })
	}

	export function bpage(data) {
	    return request({
	      	url: '/user/bank/page',
	      	method: 'get',
	      	params:data
	    })
	}

	export function bpublish(data) {
	    return request({
	      	url: '/user/bank/publish',
	      	method: 'post',
	      	params:data
	    })
	}

	export function bsetDefault(data) {
	    return request({
	      	url: '/user/bank/setDefault',
	      	method: 'post',
	      	params:data
	    })
	}

	export function bwithdraw(data) {
	    return request({
	      	url: '/user/bank/withdraw',
	      	method: 'get',
	      	params:data
	    })
	}


	export function swithdraw(data) {
	    return request({
	      	url: '/user/sysConfiguration/withdraw',
	      	method: 'get',
	      	params:data
	    })
	}