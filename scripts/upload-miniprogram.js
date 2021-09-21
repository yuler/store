import fs from 'node:fs/promises'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import CI from 'miniprogram-ci'

const __dirname = dirname(fileURLToPath(import.meta.url))

const {Project, upload} = CI
const {appid} = JSON.parse(
	await fs.readFile(resolve(__dirname, '../project.config.json')),
)
const {version, description} = JSON.parse(
	await fs.readFile(resolve(__dirname, '../package.json')),
)

const project = new Project({
	appid,
	type: 'miniProgram',
	projectPath: resolve(__dirname, '../mp'),
	privateKeyPath: './private.key',
	ignores: ['scripts', 'README.md'],
})

const result = await upload({
	project,
	version,
	desc: description,
	setting: {
		es7: true,
		minify: true,
		codeProtect: true,
		minifyJS: true,
		minifyWXML: true,
		minifyWXSS: true,
		autoPrefixWXSS: true,
	},
	// onProgressUpdate: console.log,
})

fs.writeFile(
	resolve(__dirname, '../upload-result.json'),
	JSON.stringify(result, null, 2),
)

console.log(result)
