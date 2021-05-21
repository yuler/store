const crypto = require('crypto');

const cloud = require('wx-server-sdk');
// Const format = require('date-fns/format');

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const logger = cloud.logger();
	if (process.env.DEBUG) {
		logger.log({event, context, wxContext});
	}

	const {OPENID, CLIENTIP, ENV} = wxContext;
	const {products} = event;

	// Generate md5 for order number
	const body = products.length === 1 ?
		products[0].id :
		products.map(p => p.id).join(',').slice(100) + '...';
	const now = Date.now();
	const content = OPENID + CLIENTIP + body + now;
	// Const timestamp = format(now, yyyyMMddsss);
	const md5 = crypto.createHash('md5').update(content).digest('hex');

	// Computed price
	const ids = products.map(p => p.id || p._id);
	const result = await db.collection('products')
		.where({
			_id: db.command.in(ids)
			// TODO: skip off online
		})
		.field({
			price: true
		})
		.get();

	logger.info({name: 'query products:', products: result.data});
	// eslint-disable-next-line unicorn/no-array-reduce
	const price = result.data.reduce((acc, p) => acc + p.price, 0);

	// TODO: try catch?
	// See: https://bit.ly/2SfNwJC
	const response = await cloud.cloudPay.unifiedOrder({
		body,
		totalFee: price,
		// TODO: generate by some rules
		outTradeNo: md5,

		// Some env values
		functionName: 'payment-callback',
		subMchId: process.env.MERCH_ID,
		envId: ENV, // Use current cloud function env
		spbillCreateIp: CLIENTIP
	});

	const data = {
		number: md5,
		price,
		status: 0,
		createIp: CLIENTIP,
		products,

		createdAt: db.serverDate(),
		updatedAt: db.serverDate()
	};
	await db.collection('orders')
		.add({data});

	return response;
};
