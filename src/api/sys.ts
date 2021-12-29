/*
 * @Author: GZH
 * @Date: 2021-12-29 14:51:36
 * @LastEditors: GZH
 * @LastEditTime: 2021-12-29 16:20:25
 * @FilePath: \qrcode-proj\src\api\sys.ts
 * @Description:
 */
import request from '@/utils/request'

import { IResponseType } from '@/types/responseType'

/** 登录请求 */
export const login = <T>(data: any): Promise<T> => {
  return request({
    url: 'sys/login',
    method: 'POST',
    data
  }) as unknown as Promise<T>
}

/* 获取用户信息 */
export const getUserInfo = <T>(): Promise<T> => {
  return request({
    url: 'sys/profile',
    method: 'GET'
  }) as unknown as Promise<T>
}
