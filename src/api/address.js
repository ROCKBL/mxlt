import request from '@/utils/request'

	export function adelete(data) {
	    return request({
	      	url: '/user/address/delete',
	      	method: 'delete',
	      	params:data
	    })
	}

	export function agetDefalut(data) {
	    return request({
	      	url: '/user/address/getDefalut',
	      	method: 'post',
	      	params:data
	    })
	}

	export function amodify(data) {
	    return request({
	      	url: '/user/address/modify',
	      	method: 'post',
	      	params:data
	    })
	}

	export function amyPage(data) {
	    return request({
	      	url: '/user/address/myPage',
	      	method: 'get',
	      	params:data
	    })
	}

	export function apublish(data) {
	    return request({
	      	url: '/user/address/publish',
	      	method: 'post',
	      	params:data
	    })
	}

	export function asetDefault(data) {
	    return request({
	      	url: '/user/address/setDefault',
	      	method: 'post',
	      	params:data
	    })
	}