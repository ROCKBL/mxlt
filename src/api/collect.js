import request from '@/utils/request'

	// 项目收藏
	export function pclcollectionAndCancel(data) {
	    return request({
	      	url: '/user/productCollect/collectionAndCancel',
	      	method: 'post',
	      	params:data
	    })
	}
	export function pclpage(data) {
	    return request({
	      	url: '/user/productCollect/page',
	      	method: 'post',
	      	params:data
	    })
	}

	// 商品收藏
	export function gclcollectionAndCancel(data) {
	    return request({
	      	url: '/user/goodCollect/collectionAndCancel',
	      	method: 'get',
	      	params:data
	    })
	}
	export function gclpage(data) {
	    return request({
	      	url: '/user/goodCollect/page',
	      	method: 'get',
	      	params:data
	    })
	}