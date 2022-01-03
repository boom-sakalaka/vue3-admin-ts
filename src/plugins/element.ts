/*
 * @Author: GZH
 * @Date: 2021-12-29 11:32:49
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-03 13:52:38
 * @FilePath: \vue3-admin-ts\src\plugins\element.ts
 * @Description:
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export default (app: any): void => {
  app.use(ElementPlus, { locale })
}
