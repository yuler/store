export * from './is'
export * from './string'
export * from './object'
export * from './function'
export * from './promise'

// Some uniapp API wrapper, start with `$`
export function $goto(url: string) {
  wx.navigateTo({url})
}
