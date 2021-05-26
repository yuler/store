import {dirname} from "path";
import {fileURLToPath} from "url";



const __dirname = dirname(fileURLToPath(import.meta.url));


import { config } from 'dotenv';
import CloudBase from '@cloudbase/manager-node';
import { sleep } from '@yuler/utils'

// Set dotenv
config();
const { TCB_SECRET_ID, TCB_SECRET_KEY, TCB_ENV_ID } = process.env

const COLLECTION_USERS = 'users'

const manager = CloudBase.init({
	secretId: TCB_SECRET_ID,
	secretKey: TCB_SECRET_KEY,
	envId: TCB_ENV_ID
});

// Enable `USERNAME` platform login
async function enableUsernameLogin() {
	const { ConfigList } = await manager.env.getLoginConfigList()
	const usernameLogin = ConfigList.find(conf => conf.Platform === 'USERNAME')
	if (usernameLogin?.Id) {
        const result = await manager.env.updateLoginConfig(usernameLogin.Id, 'ENABLE')
        console.log('Enable `USERNAME` login', {result})
        return
    }
    const result = await manager.env.createLoginConfig('USERNAME', 'username')
    console.log('Create `USERANME` login', {result})
}

// Create a administrator user
async function createAdministrator() {
    await manager.database.createCollectionIfNotExists(COLLECTION_USERS)

    const collection = manager.database.import(
        COLLECTION_USERS,
        {
            FilePath: path.resolve(import.meta.url, ),
        },
        {
            ObjectKeyPrefix: 'db/migrate/imports/',
            StopOnError: true,
            ConflictMode: 'upsert'
        }
    )
}


;(async function main() {
    await enableUsernameLogin()
    await sleep(5000)

})()

