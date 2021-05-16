import {pageEnhancer} from '../../utils/index.js';

const $app = getApp<IApp>();

type Data = {
	name: string;
};
type Option = {

};

pageEnhancer<Data, Option>({
	data: {
		name: 'xxx',
		$loading: false
	},

	async onLoad() {
		const products = await $app.$db
			?.collection('products')
			.where({})
			.limit(10)
			.get();
		this.setData({products});
	}
});
