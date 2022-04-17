// import path from 'node:path'
// // import fs from 'node:fs/promises'

// //
// import glob from 'fast-glob'
// import esbuild from 'esbuild'
// import {execa} from 'execa'

// import {dirname} from './_utils'

// // Paths
// const __dirname = dirname(import.meta)
// const root = path.resolve(__dirname, '..')

import fs from 'node:fs/promises'
import path from 'node:path'
import {execa} from 'execa'
import ci from 'miniprogram-ci'
import esbuild from 'esbuild'
import glob from 'fast-glob'
import {ensureDir} from 'shared'
import {APP, DIST, GLOB_TS, GLOB_COPY_FILES, PROJECT_JSON} from './constants'

export async function main() {
  await buildNpm()
  buildTS(glob.sync(GLOB_TS))
  buildWxss()
  await buildCopy(glob.sync(GLOB_COPY_FILES))
}

main().catch(error => {
  console.error(error)
})

// buildNpm
export async function buildNpm() {
  const {
    packageJsonPath,
    miniprogramNpmDistDir,
  }: {
    packageJsonPath: string
    miniprogramNpmDistDir: string
  } = PROJECT_JSON['setting']['packNpmRelationList'][0]
  const buildNpmResult = await ci.packNpmManually({
    packageJsonPath,
    miniprogramNpmDistDir,
  })
  console.log(buildNpmResult)
}

// ESBuild
export function buildTS(paths: string[]) {
  esbuild.build({
    entryPoints: paths,
    outdir: 'dist',
  })
}

// WindiCSS
export function buildWxss() {
  return execa('windicss', [
    'src/**/*.wxml',
    '--output',
    'dist/windi.wxss',
    '--config',
    'windi.config.cjs',
  ]).stdout?.pipe(process.stdout)
}

// Copy files
export async function buildCopy(paths: string[]) {
  for (const file of paths) {
    const src = path.resolve(APP, file)
    const dest = path.resolve(DIST, file.replace(/^src\//, ''))
    await ensureDir(dest)
    await fs.copyFile(src, dest)
  }
}
