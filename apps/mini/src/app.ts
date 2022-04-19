import mitt from 'mitt'

import {TABS} from './constants'
import config from './config'

const emitter = mitt()

export interface IApp {
  $system?: MP.SystemInfo

  $log: typeof $log
  $request: typeof $request
  $goto: typeof $goto

  $events: typeof emitter.all
  $on: typeof emitter.on
  $emit: typeof emitter.emit

  debug: boolean
  gloablData: any
}

App<IApp>({
  // Store System info
  $system: undefined,

  // Helper functions
  $log,
  $request,
  $goto,

  // Events
  $events: emitter.all,
  $on: emitter.on,
  $emit: emitter.emit,

  // Global state & data
  debug: false,
  gloablData: {},

  onLaunch() {
    /**
     * Save system info to `$system`
     * @url https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemInfo.html
     */
    wx.getSystemInfo()
      .then(data => {
        this.$system = data
      })
      .catch(_ => {})

    // TODO: login
    wx.login()
      .then(res => {
        const {code} = res
        $request('/login', {
          method: 'GET',
          data: {
            code,
          },
        })
      })
      .catch(_ => {})

    $request('/profile', {method: 'GET'}).then(res => {
      console.log(res)
    })
  },
})

/**
 * Wrap `console.log` with debug mode
 */
function $log(this: IApp, namespace: string, ...args: unknown[]) {
  getApp<IApp>().debug ?? console.log(`[${namespace}]: `, ...args)
}

/**
 * Wrap function for `wx.request`
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
 */
function $request<T = any>(
  url: string,
  options: Omit<MP.RequestOption, 'url'>,
  requestTask?: MP.RequestTask,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const _requestTask = wx.request<T>({
      url: `${config.apiRoot}${url}`,
      timeout: 2000,
      header: {
        // TODO: replace to package.version
        version: '0.0.0',
      },
      success(result) {
        // Success
        if (result.statusCode >= 200 && result.statusCode < 300) {
          resolve(result.data)
        }
        reject(result)
      },
      fail: reject,
      ...options,
    })
    if (requestTask) requestTask = _requestTask
  })
}

/**
 * Wrap for `wx.navigateTo`
 * @param url The page path
 */
function $goto(url: string) {
  if (TABS.includes(url)) {
    wx.switchTab({url})
    return
  }
  wx.navigateTo({url})
}
