import {pageEnhancer} from '../../utils/index.js';

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

	onLoad() {
		this.setData({});
	}
});
