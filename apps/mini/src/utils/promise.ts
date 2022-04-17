import {Promisable} from 'type-fest'

/**
 * Promisify a UniApp callback style function.
 *
 * @param api UniApp.Uni api
 * @returns A promise function
 * @example
 *
 * ```ts
 * const getLoactionPromise = promisify<typeof uni.getLocation>(uni.getLocation)
 * const result = await getLoactionPromise({type: 'wgs84'})
 * console.log(result.longitude)
 * ```
 *
 * @todo 分析下是否需要通过 uniapp 拦截全局的方法
 * @url https://uniapp.dcloud.io/api/README?id=api-promise-%e5%8c%96
 */
// FIXME: the type
export function promisify<T extends UniApp.Uni[keyof UniApp.Uni]>(api: any) {
  return (options?: Parameters<T>[0]) =>
    new Promise<Parameters<Parameters<T>[0]['success']>[0]>(
      (resolve, reject) => {
        return api({
          success: resolve,
          fail: reject,
          ...options,
        })
      },
    )
}

/**
 * Sleep for the specified number of milliseconds.
 *
 * @param ms Milliseconds to sleep
 * @param callback
 * @returns
 */
export async function sleep(
  ms: number,
  callback?: Promisable<any>,
): Promise<void> {
  return new Promise<void>(resolve =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await callback?.()
      resolve()
    }, ms),
  )
}
