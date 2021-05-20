const crypto = require('crypto');

const cloud = require('wx-server-sdk');
// Const format = require('date-fns/format');

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
	if (process.env.DEBUG) {
		console.log({event, context});
	}

	const {body, totalFee = 1} = event;

	const now = Date.now();
	// Const timestamp = format(now, yyyyMMddsss);
	const data = body + now;
	const md5 = crypto.createHash('md5').update(data).digest('hex');

	// TODO: computed `totalFee` query by DB
	const contextEnv = JSON.parse(context.environment);

	// See: https://bit.ly/2SfNwJC
	const response = await cloud.cloudPay.unifiedOrder({
		body,
		totalFee,
		// TODO: generate by some rules
		outTradeNo: md5,

		// Some env values
		functionName: 'payment-callback',
		subMchId: process.env.MERCH_ID,
		envId: contextEnv.SCF_NAMESPACE, // Use current cloud function env
		spbillCreateIp: contextEnv.WX_CLIENTIP
	});

	// TODO: Insert DB

	return response;
};
