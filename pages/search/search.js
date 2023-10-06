// pages/search/search.js
import {
	listProduct
} from '../../api/apis'
let navid = '63b9600be1a35c358c18483b'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		historyList: [],
		productList: [],
		total: 0,
		keyword: "",

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		// 读取缓存里面的数据（因为进行刷新的时候会把数据刷没）
		let searchListArr = wx.getStorageSync('searchListArr') || null
		if (searchListArr) {
			// 如果缓存里面有数据就进行显示
			this.setData({
				historyList: searchListArr
			})
		}
	},

	//输入框事件
	onChange(e) {
		// console.log(e);
		this.setData({
			keyword: e.detail
		})
	},

	//点击回车和搜索
	onSearch() {
		console.log(this.data.keyword);
		// 显示历史搜索
		let history = this.data.historyList || []
		// 向前追加
		history.unshift(this.data.keyword)
		// 数组截取（只显示从第一条到第十条）
		history.slice(0, 10)
		// 搜索重复的不显示
		history = [...new Set(history)]
		this.setData({
			historyList: history,
			keyword: ""
		})
		//将最新的数据存到缓存里面
		wx.setStorageSync('searchListArr', history)
		this.getSearchList()
	},

	// 根据关键字搜索显示对应的产品列表
	getSearchList() {
		listProduct({
			// 接口问题一定要传id
			"navid": navid,
			keyword: this.data.keyword,
			limit: 10
		}).then(res => {
			console.log(res);
			this.setData({
				productList: res.data,
				total: res.total
			})
		})
	},

	// 点击搜索过的词进行再次搜索

	tapHisItem() {
		this.getSearchList()
	},

	// 清空历史 
	removeHistory() {
		this.setData({
			historyList: [],
			productList: [],
			keyword: '',
			total: ''
		})
		// 缓存里面的也清除
		wx.removeStorageSync("searchListArr")
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
	onShareAppMessage() {

	}
})