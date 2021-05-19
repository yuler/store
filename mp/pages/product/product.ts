import {debug, pageEnhancer} from '../../utils/index.js'

const $app = getApp<IApp>()

pageEnhancer({
	onLoad() {
		console.log('onLoad');
	},

	async submit() {
		if (!$app.$cloud) return

		console.log('submit');

		try {
			const response = await $app.$cloud.callFunction({
				name: 'create-order',
				data: {

				}
			})
			
			const payment = (response.result as AnyObject)['payment']

			await wx.requestPayment(payment)
		} catch (error) {
			debug('submit', { error })
		}
	}
});
