import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {Project, upload} from 'miniprogram-ci';

import {version as _version, description} from '../package.json';
import {appid as appId} from '../project.config.json';
(async () => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const project = new Project({
		appid: appId,
		type: 'miniProgram',
		projectPath: path.join(__dirname, '../'),
		privateKeyPath: './private.key',
		ignores: [
			'.github',
			'scripts',
			'README.md',
			'yarn.lock',
			'node_modules/**/*'
		]
	});
	const uploadResult = await upload({
		project,
		version: _version,
		desc: description,
		setting: {
			es7: true,
			minify: true,
			codeProtect: true,
			minifyJS: true,
			minifyWXML: true,
			minifyWXSS: true,
			autoPrefixWXSS: true
		},
		onProgressUpdate: console.log
	});

	console.log(uploadResult);
})();
