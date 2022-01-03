/*
 * @Author: GZH
 * @Date: 2021-12-29 11:42:40
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-01 19:59:15
 * @FilePath: \vue3-admin-ts\src\views\Login\rules.ts
 * @Description:
 */
import i18n from '@/i18n'
export type callBcak = (err?: Error) => void

export const validatePassword = () => {
  return (rule: object, value: string, callback: callBcak): void => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
export const validateUsername = () => {
  return (rule: object, value: string, callback: callBcak): void => {
    if (value.length === 0) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
