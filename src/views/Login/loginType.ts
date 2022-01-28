/*
 * @Author: GZH
 * @Date: 2022-01-28 17:02:36
 * @LastEditors: GZH
 * @LastEditTime: 2022-01-28 17:02:37
 * @FilePath: \vue3-admin-ts\src\views\Login\loginType.ts
 * @Description:
 */
import { callBcak } from './rules'
// 类型定义
export interface IloginForm {
  username: string
  password: string
}

export interface IValidator {
  (rule: object, value: string, callback: callBcak): void
}

export interface IloginRules {
  username: {
    required: boolean
    trigger: string
    validator: IValidator
  }[]
  password: {
    required: boolean
    trigger: string
    validator: IValidator
  }[]
}
