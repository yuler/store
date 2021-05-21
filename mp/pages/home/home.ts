import {Porduct} from '../../../types/models.js';
import {pageEnhancer} from '../../utils/index.js';

type Data = {
	products: Porduct[];
};
type Option = {
	gotoProduct: (event: MP.CustomEvent) => void;
};

const $app = getApp<IApp>();

pageEnhancer<Data, Option>({
	data: {
		products: [],
		$loading: false
	},

	// TODO: fetch products
	async onLoad() {
		const result = await $app.$db
			?.collection('products')
			.limit(10)
			.get();
		const products = (result?.data as Porduct[]) || [];
		this.setData({products});
	},

	gotoProduct(event: MP.CustomEvent) {
		const {id} = event.currentTarget.dataset as {id: string};
		this.$goto(`/pages/product/product?id=${id}`);
	}
});
