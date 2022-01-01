/*
 * @Author: GZH
 * @Date: 2021-12-29 11:42:40
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-01 19:59:15
 * @FilePath: \vue3-admin-ts\src\views\Login\rules.ts
 * @Description:
 */

export type callBcak = (err?: Error) => void

export const validatePassword = () => {
  return (rule: object, value: string, callback: callBcak): void => {
    if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback()
    }
  }
}
export const validateUsername = () => {
  return (rule: object, value: string, callback: callBcak): void => {
    if (value.length === 0) {
      callback(new Error('用户名为必填项'))
    } else {
      callback()
    }
  }
}
