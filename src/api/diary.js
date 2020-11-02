import request from '@/utils/request'
	
// 日志分类
	export function dclist(data) {
	    return request({
	      	url: '/user/diaryCategory/list',
	      	method: 'get',
	      	params:data
	    })
	}
	
// 日志
	export function ddelete(data) {
	    return request({
	      	url: '/user/diary/delete',
	      	method: 'delete',
	      	params:data
	    })
	}

	export function dpage(data) {
	    return request({
	      	url: '/user/diary/page',
	      	method: 'get',
	      	params:data
	    })
	}

	export function dpublish(data) {
	    return request({
	      	url: '/user/diary/publish',
	      	method: 'post',
	      	params:data
	    })
	}

	export function dupload(data) {
	    return request({
	      	url: '/user/diary/upload',
	      	method: 'post',
	      	data:data
	    })
	}



	export function ddetail(data) {
	    return request({
	      	url: '/user/diary/detail',
	      	method: 'get',
	      	params:data
	    })
	}
	export function disLike(data) {
	    return request({
	      	url: '/user/diary/isLike',
	      	method: 'post',
	      	params:data
	    })
	}
	
	export function dmodfiy(data) {
	    return request({
	      	url: '/user/diary/modfiy',
	      	method: 'post',
	      	params:data
	    })
	}
	

	export var uploadUrl="/user/diary/upload"

	export function dindex(data) {
	    return request({
	      	url: '/user/diary/index',
	      	method: 'get',
	      	params:data
	    })
	}