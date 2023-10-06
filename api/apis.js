import {
	request
} from '../utils/request'
// 获取首页横向导航
export function listNav() {
	return request({
		url: '/nav/get',
		method: 'POST'
	})
}

// 获取首页新闻资讯
export function listNews(data) {
	return request({
		url: '/news/get',
		method: 'POST',
		data
	})
}
// 获取新闻详情
export function newsDetail(data) {
	return request({
		url: "/news/detail",
		method: "POST",
		data
	})
}

// 获取分类里面的产品列表
export function listProduct(data) {
	return request({
		url: '/product/getlist',
		method: 'POST',
		data
	})
}
// 获取产品详情
export function productDetail(data) {
	return request({
		url: "/product/detail",
		method: "POST",
		data
	})
}