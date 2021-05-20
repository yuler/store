const cloud = require('wx-server-sdk');

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
});

// See: https://bit.ly/3bDdIo8
exports.main = async (event, context) => {
	if (process.env.DEBUG) {
		console.log({event, context});
	}

	// Example:
	// "event": {
	//   "appid": "wxd2d16a504f24665e",
	//   "bankType": "OTHERS",
	//   "cashFee": 1,
	//   "feeType": "CNY",
	//   "isSubscribe": "N",
	//   "mchId": "1800008281",
	//   "nonceStr": "0cdd8280e65d33f7",
	//   "openid": "oPoo442ImlBUWpV9X58zKWHeU_w0",
	//   "outTradeNo": "testTradeNo001",
	//   "resultCode": "SUCCESS",
	//   "returnCode": "SUCCESS",
	//   "subAppid": "wx43d4fbc340a982bd",
	//   "subIsSubscribe": "N",
	//   "subMchId": "1609673695",
	//   "subOpenid": "o9qkx5IuB5qx0edOJjT03FWLVqHw",
	//   "timeEnd": "20210520211626",
	//   "totalFee": 1,
	//   "tradeType": "JSAPI",
	//   "transactionId": "4200001019202105203238662946",
	//   "userInfo": {
	//     "appId": "wx43d4fbc340a982bd",
	//     "openId": "o9qkx5IuB5qx0edOJjT03FWLVqHw"
	//   }
	// }

	// TODO:
	// 1. Update order state in DB
	// 2. Add condition for fail response

	return {
		errcode: 0,
		errmsg: 'SUCCESS'
	};
};
