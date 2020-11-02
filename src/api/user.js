import request from '@/utils/request'

	export function uinfo(data) {
	    return request({
	      	url: '/user/info',
	      	method: 'get',
	      	params:data
	    })
	}

	
	export function umodifyInfo(data) {
	    return request({
	      	url: '/user/modifyInfo',
	      	method: 'get',
	      	params:data
	    })
	}

	export function ugetConsumerList(data) {
	    return request({
	      	url: '/user/getConsumerList',
	      	method: 'get',
	      	params:data
	    })
	}

	export function ugetTeam(data) {
	    return request({
	      	url: '/user/getTeam',
	      	method: 'get',
	      	params:data
	    })
	}


	export function sysgetContract(data) {
	    return request({
	      	url: '/user/sysConfiguration/getContract',
	      	method: 'get',
	      	params:data
	    })
	}