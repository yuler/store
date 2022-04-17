import chokidar from 'chokidar'
import {GLOB_COPY_FILES, GLOB_TS, GLOB_WINDICSS} from './constants'
import {buildCopy, buildTS, buildWxss} from './build'

// Wacth `.ts`
chokidar.watch(GLOB_TS).on('change', path => {
  buildTS([path])
})

// Watch `.wxss`
chokidar.watch(GLOB_WINDICSS).on('change', _ => {
  buildWxss()
})

// Watch copy files
chokidar.watch(GLOB_COPY_FILES).on('change', path => {
  buildCopy([path])
})
