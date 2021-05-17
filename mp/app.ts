import {debug} from './utils/index.js';

App<IApp>({
	globalData: {
		// TODO: dynamic open
		debug: true
	},

	$system: undefined,

	$db: undefined,

	onLaunch() {
		// Cache system info
		wx.getSystemInfo()
			.then(result => {
				this.$system = result;
			})
			.catch((error: MP.GeneralCallbackResult) => {
				debug('App', {error});
			});

		// TODO: try catch
		wx.cloud.init({
			// TODO: use dynamic value for diffrence env.
			env: 'test-7grt94kx72509f46',
			traceUser: true
		});
		this.$db = wx.cloud.database();
	}
});
