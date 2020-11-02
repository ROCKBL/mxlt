import request from '@/utils/request'
	
// 商品接口
	// todo
	export function gdetail(data) {
	    return request({
	      	url: '/user/good/detail',
	      	method: 'get',
	      	params:data
	    })
	}

	export function gpage(data) {
		data.sale=true
	    return request({
	      	url: '/user/good/page',
	      	method: 'get',
	      	params:data
	    })
	}

// 商品分类接口
	export function glist(data) {
	    return request({
	      	url: '/user/goodCategory/list',
	      	method: 'get',
	      	params:data
	    })
	}


// 商品订单接口
	export function goconfirmOrder(data) {
	    return request({
	      	url: '/user/goodsOrder/confirmOrder',
	      	method: 'post',
	      	data:data
	    })
	}
	export function gocreateOrder(data) {
	    return request({
	      	url: '/user/goodsOrder/createOrder',
	      	method: 'post',
	      	data:data
	    })
	}

	export function godelete(data) {
	    return request({
	      	url: '/user/goodsOrder/delete',
	      	method: 'delete',
	      	params:data
	    })
	}

	export function godetail(data) {
	    return request({
	      	url: '/user/goodsOrder/detail',
	      	method: 'get',
	      	params:data
	    })
	}

	export function gomyPage(data) {
	    return request({
	      	url: '/user/goodsOrder/myPage',
	      	method: 'get',
	      	params:data
	    })
	}
	export function goorderStateConfirm(data) {
	    return request({
	      	url: '/user/goodsOrder/orderStateConfirm',
	      	method: 'post',
	      	params:data
	    })
	}
	export function gosendPay(data) {
	    return request({
	      	url: '/user/goodsOrder/sendPay',
	      	method: 'post',
	      	params:data
	    })
	}