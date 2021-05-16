App<IApp>({
	globalData: {
		// TODO: dynamic open
		debug: true
	},

	$db: undefined,

	onLaunch() {
		// TODO: try catch
		wx.cloud.init({
			// TODO: use dynamic value for diffrence env.
			env: 'test-7grt94kx72509f46',
			traceUser: true
		});
		this.$db = wx.cloud.database();
	}
});
