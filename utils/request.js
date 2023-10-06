const baseURL = 'https://tea.qingnian8.com';
// const baseURL = 'https://www.fastmock.site/mock/13998300dc7574018c16109b0ef56a56/xzs'
export function request(params) {
	let dataObj = params.data || {};
	let headeObj = {
		'content-type': 'application/json'
	}
	return new Promise((resolve, reject) => {
		wx.request({
			url: baseURL + params.url,
			method: params.method || 'GET',
			data: dataObj,
			header: headeObj,
			success: res => {
				if (res.data.errCode != 0) {
					reject(res.data);
					wx.showToast({
						title: res.data.errMsg,
						mask: true,
						icon: "error"
					})
					return
				}
				resolve(res.data)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}