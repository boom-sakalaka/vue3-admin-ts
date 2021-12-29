/*
 * @Author: GZH
 * @Date: 2021-11-14 15:19:52
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 13:42:47
 * @FilePath: \qrcode-proj\src\utils\validate.ts
 * @Description:
 */

/* 判断是否为外部资源 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}
