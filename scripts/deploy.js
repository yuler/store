const path = require('path')
const ci = require('miniprogram-ci')

const pkg = require('../package.json')
const appId = require('../project.config.json').appid

;(async () => {
  const project = new ci.Project({
    appid: appId,
    type: 'miniProgram',
    projectPath: path.join(__dirname, '../'),
    privateKeyPath: `./private.key`,
    ignores: [
      '.github',
      'scripts',
      'README.md',
      'yarn.lock',
      'node_modules/**/*',
    ],
  })
  const uploadResult = await ci.upload({
    project,
    version: pkg.version,
    desc: pkg.description,
    setting: {
      es7: true,
      minify: true,
      codeProtect: true,
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true,
      autoPrefixWXSS: true,
    },
    onProgressUpdate: console.log,
  })
})()