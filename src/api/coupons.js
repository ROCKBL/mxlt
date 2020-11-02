import request from '@/utils/request'

	export function cgetCoupon(data) {
	    return request({
	      	url: '/user/coupon/getCoupon',
	      	method: 'post',
	      	params:data
	    })
	}

	export function cmyPage(data) {
	    return request({
	      	url: '/user/coupon/myPage',
	      	method: 'get',
	      	params:data
	    })
	}

	export function cpage(data) {
	    return request({
	      	url: '/user/coupon/page',
	      	method: 'get',
	      	params:data
	    })
	}