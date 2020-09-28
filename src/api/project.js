import request from '@/utils/request'

// 项目分类接口
	export function plist(data) {
	    return request({
	      	url: '/user/projectCategory/list',
	      	method: 'get',
	      	params:data
	    })
	}

// 项目接口
	export function pdetail(data) {
	    return request({
	      	url: '/user/project/detail',
	      	method: 'get',
	      	params:data
	    })
	}

	export function ppage(data) {
	    return request({
	      	url: '/user/project/page',
	      	method: 'get',
	      	params:data
	    })
	}

