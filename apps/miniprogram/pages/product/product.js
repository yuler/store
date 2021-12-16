import { debug, pageEnhancer } from '../../utils/index.js';
const $app = getApp();
pageEnhancer({
    async onLoad() {
        var _a;
        try {
            const { id } = this.options;
            const result = await ((_a = $app.$db) === null || _a === void 0 ? void 0 : _a.collection('products').doc(id).get());
            const product = result === null || result === void 0 ? void 0 : result.data;
            this.setData({ product });
        }
        catch (error) {
            debug('onLoad', { error });
        }
    },
    async submit() {
        var _a;
        const { product } = this.data;
        try {
            this.$showLoading();
            // TODO: wrap callFunction
            const response = await ((_a = $app.$cloud) === null || _a === void 0 ? void 0 : _a.callFunction({
                name: 'create-order',
                data: {
                    products: [{
                            _id: product._id,
                            amount: 1
                        }]
                }
            }));
            // TODO: handler error
            // ErrMsg, requestID, result: { errCode, errMsg, returnCode, returnMsg }
            console.log(response);
            // If (!response.result || typeof response.result === 'string') {
            // 	throw new Error('Cloud function error');
            // }
            // @eslint-disabled-next-line @typescript-eslint/no-unsafe-assignment
            const payment = (response === null || response === void 0 ? void 0 : response.result).payment;
            await wx.requestPayment(payment);
        }
        catch (error) {
            debug('submit', { error });
        }
        finally {
            this.$hideLoading();
        }
    }
});
