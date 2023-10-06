// pages/list/list.js
import {
	listNav,
	listProduct
} from '../../api/apis'
let navid = '63b9600be1a35c358c18483b'
// let navid = this.data.navArr[0]._id
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navActive: 0,
		navArr: [],
		productList: [],
		loading: false,
		isData: false,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let {
			idx
		} = options
		console.log(idx);
		this.getNavList()
		if (idx) {
			this.navChange(idx)
			// navid = idx
			// this.getProductList()
		} else {
			// navid = this.data.navArr[0]._id
			console.log(navid);
			this.getProductList()
		}
	},

	// 获取横向的导航
	getNavList() {
		listNav().then(res => {
			// console.log(res);
			this.setData({
				navArr: res.data
			})
		})
	},

	// 获取产品列表
	getProductList(s = 0) {
		// 一调用这个方法显示 加载中...
		this.setData({
			loading: true
		})
		listProduct({
			"navid": navid, //分类ID
			"limit": 3, //获取多少条
			"size": s, //分页从多少页开始(比如每次获取三条数据就算一页)
			// "keyword": "红" //搜索关键词			
		}).then(res => {
			console.log(res.data);
			// console.log(res.total);
			// 触底加载数据
			let oldArr = this.data.productList
			let newArr = oldArr.concat(res.data)
			console.log(res);
			this.setData({
				productList: newArr,
				loading: false
			})
			if (res.total == this.data.productList.length) {
				this.setData({
					isData: true
				})
			}
		})
	},

	// 点击导航条切换事件
	navChange(e) {
		// console.log(e);
		// 拿到索引值(可选链操作符，因为还要看从首页传过来的索引值)
		let index = e?.detail?.index ?? e
		// let index = e.detail.index
		// console.log(index);
		// 根据索引值拿到当前分类的id
		navid = this.data.navArr[index]._id
		console.log(navid);
		//  点击对于的类型后先清空
		this.setData({
			productList: [],
			loading: false,
			isData: false
		})
		// 根据_id重新渲染产品列表
		this.getProductList()
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
		this.getProductList(this.data.productList.length)
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})