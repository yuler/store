const cloud = require('wx-server-sdk');

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// See: https://bit.ly/3bDdIo8
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext();
	const logger = cloud.logger();

	if (process.env.DEBUG) {
		logger.log({event, context, wxContext});
	}

	const {outTradeNo: number} = event;

	await db.collection('orders')
		.where({
			number
		})
		.update({
			data: {
				status: 1,
				paidAt: db.serverDate(),
				updatedAt: db.serverDate()
			}
		});

	// TODO:
	// 1. Update order state in DB
	// 2. Add condition for fail response

	return {
		errcode: 0,
		errmsg: 'SUCCESS'
	};
};
