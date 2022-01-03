/*
 * @Author: GZH
 * @Date: 2022-01-03 20:54:51
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 20:56:55
 * @FilePath: \vue3-admin-ts\src\components\Screenfull\Screenfull .d.ts
 * @Description:
 */
import 'screenfull'

declare module 'screenfull' {
  interface Screenfull {
    toggle: () => void
    isFullscreen: boolean
  }
}
