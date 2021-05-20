import {debug, pageEnhancer} from '../../utils/index.js';

const $app = getApp<IApp>();

type PaymentResult = {
	payment: MP.RequestPaymentOption;
};

pageEnhancer({
	onLoad() {
		console.log('onLoad');
	},

	async submit() {
		if (!$app.$cloud) {
			return;
		}

		console.log('submit');

		try {
			// TODO: wrap callFunction
			const response = await $app.$cloud.callFunction({
				name: 'create-order',
				data: {
					body: '测试商品仅1分钱'
				}
			});

			// ErrMsg, requestID, result: { errCode, errMsg, returnCode, returnMsg }
			console.log(response);

			// If (!response.result || typeof response.result === 'string') {
			// 	throw new Error('Cloud function error');
			// }
			// @eslint-disabled-next-line @typescript-eslint/no-unsafe-assignment
			const payment = (response.result as PaymentResult).payment;
			await wx.requestPayment(payment);
		} catch (error: unknown) {
			debug('submit', {error});
		}
	}
});
