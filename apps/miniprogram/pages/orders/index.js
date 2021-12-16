import { pageEnhancer } from '../../utils/index.js';
const $app = getApp();
pageEnhancer({
    data: {
        orders: []
    },
    async onLoad() {
        var _a, _b;
        // Fetch orders
        const result = await ((_a = $app.$db) === null || _a === void 0 ? void 0 : _a.collection('orders').orderBy('createdAt', 'desc').limit(10).get());
        const orders = ((_b = result === null || result === void 0 ? void 0 : result.data) !== null && _b !== void 0 ? _b : []);
        this.setData({ orders });
    }
});
