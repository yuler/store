import {debug} from '../../utils/index.js'
const $app = getApp()
const titleBarHeight = 44
Component({
	properties: {
		title: String,
	},
	data: {
		mainHeightStyle: '',
	},
	options: {
		multipleSlots: true,
		styleIsolation: 'apply-shared',
	},
	lifetimes: {
		attached() {
			if ($app.$system) {
				this.setMainHeight(
					$app.$system.statusBarHeight + titleBarHeight,
				)
			} else {
				wx.getSystemInfo()
					.then(system => {
						$app.$system = system
						this.setMainHeight(
							system.statusBarHeight + titleBarHeight,
						)
					})
					.catch(error => {
						debug(this.is, {error})
					})
			}
		},
	},
	methods: {
		setMainHeight(paddingTop) {
			this.setData({
				mainHeightStyle: `height: calc(100vh - ${paddingTop}px);`,
			})
		},
	},
})
