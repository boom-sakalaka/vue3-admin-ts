/*
 * @Author: GZH
 * @Date: 2022-01-03 14:27:28
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 14:27:28
 * @FilePath: \vue3-admin-ts\src\router\router.d.ts
 * @Description:
 */
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    title?: string
    icon?: string
  }
}
