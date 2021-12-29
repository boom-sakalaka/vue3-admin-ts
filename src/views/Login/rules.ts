/*
 * @Author: GZH
 * @Date: 2021-12-29 11:42:40
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 11:55:05
 * @FilePath: \qrcode-proj\src\views\Login\rules.ts
 * @Description:
 */

export type callBcak = (err?: Error) => void

export const validatePassword = () => {
  return (rule: unknown, value: string, callback: callBcak): void => {
    if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback()
    }
  }
}
export const validateUsername = () => {
  return (rule: unknown, value: string, callback: callBcak): void => {
    if (value.length === 0) {
      callback(new Error('用户名为必填项'))
    } else {
      callback()
    }
  }
}
