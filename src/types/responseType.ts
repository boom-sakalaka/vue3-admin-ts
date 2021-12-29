/*
 * @Author: GZH
 * @Date: 2021-12-29 14:56:18
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 16:15:40
 * @FilePath: \qrcode-proj\src\types\responseType.ts
 * @Description:
 */
export interface IResponseType<T> {
  code: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: T
  message: string
  success: boolean
}
