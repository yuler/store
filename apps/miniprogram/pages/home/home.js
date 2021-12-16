import { pageEnhancer } from '../../utils/index.js';
const $app = getApp();
pageEnhancer({
    data: {
        products: [],
        $loading: false
    },
    // TODO: fetch products
    async onLoad() {
        var _a;
        const result = await ((_a = $app.$db) === null || _a === void 0 ? void 0 : _a.collection('products').limit(10).get());
        const products = (result === null || result === void 0 ? void 0 : result.data) || [];
        this.setData({ products });
    },
    gotoProduct(event) {
        const { id } = event.currentTarget.dataset;
        this.$goto(`/pages/product/product?id=${id}`);
    }
});
