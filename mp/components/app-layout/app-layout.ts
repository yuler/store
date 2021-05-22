import {debug} from '../../utils/index.js';

const $app = getApp<IApp>();

const titleBarHeight = 44;

Component({
	properties: {
		title: String
	},

	data: {
		mainHeightStyle: ''
	},

	options: {
		multipleSlots: true,
		styleIsolation: 'apply-shared'
	},

	lifetimes: {
		attached() {
			if ($app.$system) {
				this.setMainHeight($app.$system.statusBarHeight + titleBarHeight);
			} else {
				wx.getSystemInfo()
					.then(system => {
						$app.$system = system;
						this.setMainHeight(system.statusBarHeight + titleBarHeight);
					})
					.catch((error: MP.GeneralCallbackResult) => {
						debug(this.is, {error});
					});
			}
		}
	},

	methods: {
		setMainHeight(paddingTop: number) {
			this.setData({
				mainHeightStyle: `height: calc(100vh - ${paddingTop}px);`
			});
		}
	}
});
