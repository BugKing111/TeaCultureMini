// pages/newsDetail/detail.js
import {
	formatTime,
	formatNum
} from "../../utils/common"
import {
	newsDetail
} from '../../api/apis'
let id
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		detail: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	// options可以接收到上一个页面传到这个页面的参数
	onLoad(options) {
		console.log(options);
		id = options.id
		this.getDetail()
	},
	// 调用获取新闻详情的接口
	getDetail() {
		newsDetail({
			id
		}).then(res => {
			console.log(res.data);
			// 格式化时间和阅读量
			res.data.publish_date = formatTime(res.data.publish_date, 6)
			res.data.view_count = formatNum(res.data.view_count)
			// 导航栏上面标题
			wx.setNavigationBarTitle({
				title: res.data.title
			})
			this.setData({
				detail: res.data
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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage(e) {
		return {
			title: this.data.detail.title,
			path: "/pages/newsDetail/detail?id=" + this.data.detail._id
		}
	},
	// 分享到朋友圈
	onShareTimeline() {
		return {
			title: this.data.detail.title,
			path: "/pages/newsDetail/detail?id=" + this.data.detail._id
		}
	}
})