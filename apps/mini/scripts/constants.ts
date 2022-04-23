import fs from 'node:fs/promises'
import path from 'node:path'
import {config} from 'dotenv'
import {ROOT} from 'shared'

export {ROOT}

config({path: path.resolve(ROOT, '.env')})

export const IDE_CLI = process.env.IDE_CLI

export const APP = path.resolve(ROOT, 'apps/mini')
export const DIST = path.resolve(APP, 'dist')

export const GLOB_TS = 'src/**/*.ts'
export const GLOB_WINDICSS = ['src/**/*wxss', '!src/windi.wxss']
export const GLOB_COPY_FILES = 'src/**/*.{wxml,wxss,json,png}'

export const PACKAGE_JSON: Record<string, any> = JSON.parse(
  await fs.readFile(path.resolve(APP, 'package.json'), 'utf-8'),
)
export const PROJECT_JSON: Record<string, any> = JSON.parse(
  await fs.readFile(path.resolve(APP, 'project.config.json'), 'utf-8'),
)
