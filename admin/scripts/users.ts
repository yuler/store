import {config} from 'dotenv';
import CloudBase from '@cloudbase/manager-node';
import {sleep} from '@yuler/utils';

type User = {
	uuid: string;
	username: string;
	password: string;
};

// Set dotenv
config();
const {TCB_SECRET_ID, TCB_SECRET_KEY, TCB_ENV_ID} = process.env;

const COLLECTION_USERS = 'users';

const manager = CloudBase.init({
	secretId: TCB_SECRET_ID,
	secretKey: TCB_SECRET_KEY,
	envId: TCB_ENV_ID
});

// Enable `USERNAME` platform login
async function enableUsernameLogin() {
	const {ConfigList} = await manager.env.getLoginConfigList();
	const usernameLogin = ConfigList.find(conf => conf.Platform === 'USERNAME');
	if (usernameLogin?.Id) {
		const result = await manager.env.updateLoginConfig(usernameLogin.Id, 'ENABLE');
		console.log('Enable `USERNAME` login', {result});
		return;
	}

	const result = await manager.env.createLoginConfig('USERNAME', 'username');
	console.log('Create `USERANME` login', {result});
}

// Create a administrator user
async function createAdministrator(username: string, password: string) {
	await manager.database.createCollectionIfNotExists(COLLECTION_USERS);

	const {EnvInfo} = await manager.env.getEnvInfo();
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const InstanceId = EnvInfo.Databases![0]?.InstanceId;

	// DB collection query `username`
	const {Data} = await manager.commonService('flexdb').call({
		Action: 'Query',
		Param: {
			Tag: InstanceId,
			TableName: COLLECTION_USERS,
			MgoQuery: JSON.stringify({
				username
			}),
			MgoLimit: 20
		}
	}) as {Data: string[]};
	console.log('DB query exist administrator username:', {Data});

	const user = JSON.parse(Data[0] ?? '{}') as User;
	// Update User
	if (user?.uuid) {
		console.log(`Exist username: ${username}, update user`, {user});
		try {
			await manager.user.modifyEndUser({
				uuid: user.uuid,
				password
			});
		} catch (error: unknown) {
			console.error('Update user error', {error});
		}

		return;
	}

	// Create User
	let uuid;
	try {
		const {User} = await manager.user.createEndUser({
			username,
			password
		});
		uuid = User.UUId;
	} catch (error: unknown) {
		// Handler manager user create fail
		if ((error as Error).message.includes('username exist')) {
			const {Users} = await manager.user.getEndUserList({
				offset: 0,
				limit: 100
			});

			if (Users.length > 0) {
				const existUser = Users.find(user => user.UserName === username);
				if (existUser) {
					uuid = existUser.UUId;
					await manager.user.modifyEndUser({
						uuid,
						password
					});
				}
			}
		}

		throw error;
	}

	console.log('Create/Update user success');

	// Update/Add in collection
	let result;
	if (user) {
		result = await manager.commonService('flexdb').call({
			Action: 'UpdateItem',
			Param: {
				Tag: InstanceId,
				TableName: COLLECTION_USERS,
				MgoUpdate: JSON.stringify({
					uuid,
					username,
					password,
					root: true,
					roles: ['administrator']
				}),
				MgoQuery: JSON.stringify({
					username
				})
			}
		}) as {Data: string[]};
	} else {
		result = await manager.commonService('flexdb').call({
			Action: 'PutItem',
			Param: {
				Tag: InstanceId,
				TableName: COLLECTION_USERS,
				MgoDocs: [JSON.stringify({
					uuid,
					username,
					password,
					root: true,
					roles: ['administrator']
				})]
			}
		}) as {Data: string[]};
	}

	console.log('Update/Add in collection Success', {result});
}

export async function init() {
	await enableUsernameLogin();
	await sleep(5000);
	await createAdministrator('admin', 'admin123456');
}
