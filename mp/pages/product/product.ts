import {debug, pageEnhancer} from '../../utils/index.js';
import {Porduct} from '../../../types/models.js';

type Data = {
	product: Porduct;
};
type Option = {
	submit: () => void;
};

type PaymentResult = {
	payment: MP.RequestPaymentOption;
};
type Options = {
	id: string;
};

const $app = getApp<IApp>();

pageEnhancer<Data, Option>({
	async onLoad() {
		try {
			const {id} = this.options as Options;
			const result = await $app.$db?.collection('products')
				.doc(id)
				.get();
			const product = result?.data as Porduct;
			this.setData({product});
		} catch (error: unknown) {
			debug('onLoad', {error});
		}
	},

	async submit() {
		const {product} = this.data;
		try {
			this.$showLoading();
			// TODO: wrap callFunction
			const response = await $app.$cloud?.callFunction({
				name: 'create-order',
				data: {
					products: [{
						_id: product._id,
						amount: 1
					}]
				}
			});

			// TODO: handler error
			// ErrMsg, requestID, result: { errCode, errMsg, returnCode, returnMsg }
			console.log(response);

			// If (!response.result || typeof response.result === 'string') {
			// 	throw new Error('Cloud function error');
			// }
			// @eslint-disabled-next-line @typescript-eslint/no-unsafe-assignment
			const payment = (response?.result as PaymentResult).payment;
			await wx.requestPayment(payment);
		} catch (error: unknown) {
			debug('submit', {error});
		} finally {
			this.$hideLoading();
		}
	}
});
