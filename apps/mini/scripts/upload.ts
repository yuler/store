import fs from 'node:fs/promises'
import path from 'node:path'
import ci from 'miniprogram-ci'
import bytes from 'bytes'
import {ROOT, APP, PACKAGE_JSON, PROJECT_JSON} from './constants'

// Upload miniporgram
const project = new ci.Project({
  appid: PROJECT_JSON.appid,
  type: 'miniProgram',
  projectPath: APP,
  privateKeyPath: path.resolve(ROOT, `./private.key`),
  ignores: ['scripts', 'README.md'],
})
const uploadResult = await ci.upload({
  project,
  version: PACKAGE_JSON.version,
  desc: PACKAGE_JSON.description,
  setting: {
    es7: true,
    minify: true,
    codeProtect: true,
    minifyJS: true,
    minifyWXML: true,
    minifyWXSS: true,
    autoPrefixWXSS: true,
  },
})
const uploadResultFormat = {
  ...uploadResult,
  subPackageInfo: uploadResult.subPackageInfo?.map(subpack => {
    // @ts-ignore
    subpack.size = bytes.format(subpack.size)
    return subpack
  }),
  pluginInfo: uploadResult.pluginInfo?.map(plugin => {
    // @ts-ignore
    plugin.size = bytes.format(plugin.size)
    return plugin
  }),
}
console.log(uploadResultFormat)

await fs.writeFile(
  path.resolve(APP, 'upload-result.json.log'),
  JSON.stringify(uploadResult, null, 2),
)
