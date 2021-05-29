// Refs: https://docs.cloudbase.net/authentication/custom-login.html

const tcb = require('@cloudbase/node-sdk');

const app = tcb.init({
	env: tcb.SYMBOL_CURRENT_ENV,
	// 传入自定义登录私钥
	credentials: require('./key.json')
});

const auth = app.auth();

// TODO:
const customUserId = 'xxxx-xxxx-abcd';

exports.main = async (event, context) => {
	const logger = app.logger();
	if (process.env.DEBUG) {
		logger.log({event, context});
	}

	const ticket = auth.createTicket(customUserId, {
		refresh: 30 * 24 * 3600 * 1000 // A month
	});

	return ticket;
};
