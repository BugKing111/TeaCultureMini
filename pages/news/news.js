// pages/news/news.js
import {
	formatNum,
	formatTime
} from '../../utils/common'
import {
	listNews
} from "../../api/apis"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		newsList: [],
		loading: false,
		loadingData: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getNewsList()
	},

	// 资讯页面获取数据
	getNewsList(size = 0) {
		this.setData({
			loading: true
		})
		listNews({
			limit: 8,
			// 过滤掉的新闻条数（也就是翻页）
			// size: 0
			// 把size定义成变量，当触底的时候翻页，显示剩下的数据
			size
		}).then(res => {
			console.log(res);
			res.data.forEach(item => {
				item.view_count = formatNum(item.view_count)
				item.publish_date = formatTime(item.publish_date, 5)
			})
			// 拼接数组
			let oldData = this.data.newsList
			let newData = oldData.concat(res.data)
			// es6语法
			// let newData = [ ...oldData,...res.data]
			this.setData({
				// newsList: res.data
				newsList: newData,
				loading: false
			})
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		// 如果显示没有更多数据的时候不再发送触底请求
		if (this.data.loadingData) return
		// 触底重新发送请求、显示剩余的数据
		this.getNewsList(this.data.newsList.length);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})