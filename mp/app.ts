App({
	globalData: {},
	onLaunch() {
		// TODO: try catch
		wx.cloud.init({
			// TODO: use dynamic value for diffrence env.
			env: 'test',
			traceUser: true
		});
		wx.cloud.database();
	}
});
