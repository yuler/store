import {Order} from '../../../types/models.js';
import {pageEnhancer} from '../../utils/index.js';

type Data = {
	orders: Order[];
};
type Option = {

};

const $app = getApp<IApp>();

pageEnhancer<Data, Option>({
	data: {
		orders: []
	},

	async onLoad() {
		// Fetch orders
		// TOOD: Relation product
		const result = await $app.$db?.collection('orders')
			.orderBy('createdAt', 'desc')
			.limit(10)
			.get();
		const orders = (result?.data ?? []) as Order[];
		this.setData({orders});
	}
});
