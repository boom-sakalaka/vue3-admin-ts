/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/*
 * @Author: GZH
 * @Date: 2021-12-29 11:32:49
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 11:34:38
 * @FilePath: \qrcode-proj\src\plugins\element.ts
 * @Description:
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

export default (app: any): void => {
  app.use(ElementPlus, { locale })
}
